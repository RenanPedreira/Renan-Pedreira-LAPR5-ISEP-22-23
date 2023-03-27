/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";
import IRotaDTO from '../dto/IRotaDTO';
import { Rota } from "../domain/rota/rota";
import IRotaRepo from '../services/IRepos/IRotaRepo';
import IRotaService from './IServices/IRotaService';
import { Result } from "../core/logic/Result";
import { RotaMap } from "../mappers/RotaMap"; 

import { RotaArmazem } from "../domain/rota/rotaArmazem";
import { RotaDistancia } from "../domain/rota/rotaDistancia";
import { RotaTempoCarregamento } from "../domain/rota/rotaTempoCarregamento";
import { RotaTempoCarregamentoExtra } from "../domain/rota/rotaTempoCarregamentoExtra";
import { RotaTempoPercorrer } from "../domain/rota/rotaTempoPercorrer";
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import https = require('https');
import fetch = require('node-fetch');

@Service()
export default class RotaService implements IRotaService {
  constructor(
      @Inject(config.repos.rota.name) private rotaRepo : IRotaRepo
  ) {}

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
  
  public async getRota( rotaId: string): Promise<Result<IRotaDTO>> {
    try {
      const rota = await this.rotaRepo.findByDomainId(rotaId);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
  try {
      const rotaOrError = await Rota.create({
        distancia: await RotaDistancia.create(rotaDTO.distancia).getValue(),
        armazemOrigem: await RotaArmazem.create(rotaDTO.armazemOrigem).getValue(),
        armazemDestino: await RotaArmazem.create(rotaDTO.armazemDestino).getValue(),
        tempoPercorrer: await RotaTempoPercorrer.create(rotaDTO.tempoPercorrer).getValue(),
        tempoCarregamento: await RotaTempoCarregamento.create(rotaDTO.tempoCarregamento).getValue(),
        tempoCarregamentoExtra: await RotaTempoCarregamentoExtra.create(rotaDTO.tempoCarregamentoExtra).getValue(),
      }, new UniqueEntityID(rotaDTO.id));

      // if(!this.getArmazemConnection(rotaDTO.armazemOrigem))
      //   return Result.fail<IRotaDTO>(rotaOrError.errorValue());

      // if(!this.getArmazemConnection(rotaDTO.armazemDestino))
      //   return Result.fail<IRotaDTO>(rotaOrError.errorValue());

      if (rotaOrError.isFailure) {
        return Result.fail<IRotaDTO>(rotaOrError.errorValue());
      }

      const rotaResult = rotaOrError.getValue();

      await this.rotaRepo.save(rotaResult);
      await this.rotaConhecimento(rotaDTO);

      const rotaDTOResult = RotaMap.toDTO( rotaResult ) as IRotaDTO;
      return Result.ok<IRotaDTO>( rotaDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>> {
    try {
      const rota = await this.rotaRepo.findByArmazemOrigemDestino(rotaDTO.armazemOrigem, rotaDTO.armazemDestino);

      if (rota === null) {
        return Result.fail<IRotaDTO>("Rota not found");
      }
      else {
        if(rotaDTO.distancia != null){
          rota.updateDistancia(await RotaDistancia.create(rotaDTO.distancia).getValue());
        }
        
        if(rotaDTO.tempoPercorrer != null){
          rota.updateTempoPercorrer(await RotaTempoPercorrer.create(rotaDTO.tempoPercorrer).getValue());

        }

        if(rotaDTO.tempoCarregamento != null){
          rota.updateTempoCarregamento(await RotaTempoCarregamento.create(rotaDTO.tempoCarregamento).getValue());
        }
        
        if(rotaDTO.tempoCarregamentoExtra != null) {
          rota.updateTempoCarregamentoExtra(await RotaTempoCarregamentoExtra.create(rotaDTO.tempoCarregamentoExtra).getValue());
        }
        
        await this.rotaRepo.save(rota);
        await this.rotaConhecimento(rotaDTO);

        const rotaDTOResult = RotaMap.toDTO( rota ) as IRotaDTO;
        return Result.ok<IRotaDTO>( rotaDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO[]>> {
    try {
      var listRota: Rota[] = [];

      if(rotaDTO.armazemOrigem == null && rotaDTO.armazemDestino == null) {
        listRota = await this.rotaRepo.findAll();
      } else if(rotaDTO.armazemOrigem != null && rotaDTO.armazemDestino == null) {
        listRota = await this.rotaRepo.findByArmazemOrigem(rotaDTO.armazemOrigem);
      } else if(rotaDTO.armazemOrigem == null && rotaDTO.armazemDestino != null){
        listRota = await this.rotaRepo.findByArmazemDestino(rotaDTO.armazemDestino);
      } else {
        listRota.push(await this.rotaRepo.findByArmazemOrigemDestino(rotaDTO.armazemOrigem, rotaDTO.armazemDestino));
      }

      if (listRota === null) {
        return Result.fail<IRotaDTO[]>("Não foram encontradas rotas");
      }
      else {
        const listRotaDTOResult = listRota.map((listRotaDTOResult) => RotaMap.toDTO(listRotaDTOResult)) as IRotaDTO[];
        return Result.ok<IRotaDTO[]>(listRotaDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getArmazemConnection(armazemId: number): Promise<boolean> {
      
    const response = await fetch("https://localhost:5001/api/Armazens".concat(armazemId.toString()), {
      method: 'GET',
      agent: this.httpsAgent,
    });

    if(response.json[0].id == null)
      return false;

     return true;
  }

  private async rotaConhecimento(rotaDTO: IRotaDTO): Promise<boolean> {
    var path = "https://vs-gate.dei.isep.ipp.pt:30272/criarRota?"
    var fullpath = path.concat("distancia="+rotaDTO.distancia+
                               "&armazem1="+rotaDTO.armazemOrigem+
                               "&armazem2="+rotaDTO.armazemDestino+
                               "&tempoPercorrer="+rotaDTO.tempoPercorrer+
                               "&carregamento="+rotaDTO.tempoCarregamento+
                               "&carregamentoExtra="+rotaDTO.tempoCarregamentoExtra);

    const response = await fetch(fullpath);

    if(response[0]==201){
      return true;
    }
    return false;
  }
}