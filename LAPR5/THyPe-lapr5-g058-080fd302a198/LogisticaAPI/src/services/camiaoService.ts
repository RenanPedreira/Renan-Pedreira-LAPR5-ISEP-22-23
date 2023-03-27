/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";
import ICamiaoDTO from '../dto/ICamiaoDTO';
import { Camiao } from "../domain/camiao/camiao";
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import ICamiaoService from './IServices/ICamiaoService';
import { Result } from "../core/logic/Result";
import { CamiaoMap } from "../mappers/CamiaoMap";

import { CamiaoTara } from "../domain/camiao/camiaoTara";
import { CamiaoCargaKg } from "../domain/camiao/camiaoCargaKg";
import { CamiaoCargaKWh } from "../domain/camiao/camiaoCargaKWh";
import { CamiaoAutonomia } from "../domain/camiao/camiaoAutonomia";
import { CamiaoTempoCarregamentoRapido } from "../domain/camiao/camiaoTempoCarregamentoRapido";
import { CamiaoAtivado } from '../domain/camiao/camiaoAtivado';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import https = require('https');
import fetch = require('node-fetch');


@Service()
export default class CamiaoService implements ICamiaoService {
  constructor(
      @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
  ) {}

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  public async getCamiao( camiaoId: string): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.findByDomainId(camiaoId);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("Camiao not found");
      }
      else {
        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {
      const camiaoOrError = await Camiao.create({
        tara: await CamiaoTara.create(camiaoDTO.tara).getValue(), 
        cargaKg: await CamiaoCargaKg.create(camiaoDTO.cargaKg).getValue(), 
        cargaKWh: await CamiaoCargaKWh.create(camiaoDTO.cargaKWh).getValue(), 
        autonomia: await CamiaoAutonomia.create(camiaoDTO.autonomia).getValue(), 
        tempoCarregamentoRapido: await CamiaoTempoCarregamentoRapido.create(camiaoDTO.tempoCarregamentoRapido).getValue(),
        ativado: await CamiaoAtivado.create(camiaoDTO.ativado).getValue()
      },new UniqueEntityID(camiaoDTO.id));

      if (camiaoOrError.isFailure) {
        return Result.fail<ICamiaoDTO>(camiaoOrError.errorValue());
      }

      const camiaoResult = camiaoOrError.getValue();

      await this.camiaoRepo.save(camiaoResult);
      await this.camiaoConhecimento(camiaoDTO);

      const camiaoDTOResult = CamiaoMap.toDTO( camiaoResult ) as ICamiaoDTO;
      return Result.ok<ICamiaoDTO>( camiaoDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
    try {
      const camiao = await this.camiaoRepo.findByDomainId(camiaoDTO.id);

      if (camiao === null) {
        return Result.fail<ICamiaoDTO>("Camiao not found");
      }
      else {
        if(camiaoDTO.tara != null){
          camiao.updateTara(await CamiaoTara.create(camiaoDTO.tara).getValue());
        }

        if(camiaoDTO.cargaKg != null){
          camiao.updateCargaKg(await CamiaoCargaKg.create(camiaoDTO.cargaKg).getValue());
        }
        
        if(camiaoDTO.cargaKWh != null){
          camiao.updateCargaKWh(await CamiaoCargaKWh.create(camiaoDTO.cargaKWh).getValue());
        }
        
        if(camiaoDTO.autonomia != null){
          camiao.updateAutonomia(await CamiaoAutonomia.create(camiaoDTO.autonomia).getValue());
        }
        
        if(camiaoDTO.tempoCarregamentoRapido != null){
          camiao.updateTempoCarregamentoRapido(await CamiaoTempoCarregamentoRapido.create(camiaoDTO.tempoCarregamentoRapido).getValue());
        }

        if(camiaoDTO.ativado != null){
          camiao.updateInibicao(await CamiaoAtivado.create(camiaoDTO.ativado).getValue());
        }

        await this.camiaoRepo.save(camiao);
        await this.camiaoConhecimento(camiaoDTO);

        const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
        return Result.ok<ICamiaoDTO>( camiaoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO[]>> {
    try {

      var listCamiao: Camiao[] = [];

      if(camiaoDTO.id != null && camiaoDTO.ativado==null){
        listCamiao.push(await this.camiaoRepo.findByDomainId(camiaoDTO.id));
      }

      else if(camiaoDTO.ativado==true){
        listCamiao = await this.camiaoRepo.findAtivados();
      }

      else if(camiaoDTO.ativado==false){
        listCamiao = await this.camiaoRepo.findDesativados();
      }

      else{
        listCamiao = await this.camiaoRepo.findAll();
      }

      if (listCamiao === null) {
        return Result.fail<ICamiaoDTO[]>("Não foram encontrados camiões");
      }
      else {
        const listCamiaoDTOResult = listCamiao.map((listCamiaoDTOResult) => CamiaoMap.toDTO(listCamiaoDTOResult)) as ICamiaoDTO[];
        return Result.ok<ICamiaoDTO[]>(listCamiaoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }


  private async camiaoConhecimento(camiaoDTO: ICamiaoDTO): Promise<boolean> {
    var path = "https://vs-gate.dei.isep.ipp.pt:30272/criarCamiao?"
    var fullpath = path.concat("matricula="+camiaoDTO.id+
                               "&tara="+camiaoDTO.tara+
                               "&cargaKg="+camiaoDTO.cargaKg+
                               "&cargaKWh="+camiaoDTO.cargaKWh+
                               "&autonomia="+camiaoDTO.autonomia+
                               "&carregamento="+camiaoDTO.tempoCarregamentoRapido);

    if(camiaoDTO.ativado==true){
      fullpath.concat("&ativo=0");
    }
    if(camiaoDTO.ativado==false){
      fullpath.concat("&ativo=1");
    }

    //https://vs-gate.dei.isep.ipp.pt:30272/criarCamiao?matricula=CL-44-RA&tara=7000&&cargaKg=4000&cargaKWh=100&autonomia=100&carregamento=60&ativo=0
    //https://vs-gate.dei.isep.ipp.pt:30272/criarEmpacotamento?entrega=9999&matricula=BL-00-DD&posx=10&posy=10&posz=10



    const response = await fetch(fullpath, {
      method: 'POST',
      agent: this.httpsAgent,
    });

    let data = await response.json();

    if(data[0]==201){
      return true;
    }
    return false;
  }

}