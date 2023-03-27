/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";
import IEmpacotamentoDTO from '../dto/IEmpacotamentoDTO';
import { Empacotamento } from "../domain/empacotamento/empacotamento";
import IEmpacotamentoRepo from '../services/IRepos/IEmpacotamentoRepo';
import IEmpacotamentoService from './IServices/IEmpacotamentoService';
import { Result } from "../core/logic/Result";
import { EmpacotamentoMap } from "../mappers/EmpacotamentoMap";

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { EmpacotamentoPosicaoX } from '../domain/empacotamento/empacotamentoPosicaoX';
import { EmpacotamentoCamiao } from '../domain/empacotamento/empacotamentoCamiao';
import { EmpacotamentoPosicaoZ } from '../domain/empacotamento/empacotamentoPosicaoZ';
import { EmpacotamentoPosicaoY } from '../domain/empacotamento/empacotamentoPosicaoY';

import https = require('https');
import fetch = require('node-fetch');

@Service()
export default class EmpacotamentoService implements IEmpacotamentoService {
  constructor(
      @Inject(config.repos.empacotamento.name) private empacotamentoRepo : IEmpacotamentoRepo
  ) {}

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  public async getEmpacotamento( empacotamentoId: string): Promise<Result<IEmpacotamentoDTO>> {
    try {
      const empacotamento = await this.empacotamentoRepo.findByDomainId(empacotamentoId);

      if (empacotamento === null) {
        return Result.fail<IEmpacotamentoDTO>("Empacotamento not found");
      }
      else {
        const empacotamentoDTOResult = EmpacotamentoMap.toDTO( empacotamento ) as IEmpacotamentoDTO;
        return Result.ok<IEmpacotamentoDTO>( empacotamentoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>> {
    try {
      const empacotamentoOrError = await Empacotamento.create({
        camiao: await EmpacotamentoCamiao.create(empacotamentoDTO.camiao).getValue(),
        posicaoX: await EmpacotamentoPosicaoX.create(empacotamentoDTO.posicaoX).getValue(),
        posicaoY: await EmpacotamentoPosicaoY.create(empacotamentoDTO.posicaoY).getValue(),
        posicaoZ: await EmpacotamentoPosicaoZ.create(empacotamentoDTO.posicaoZ).getValue(),        
      },new UniqueEntityID(empacotamentoDTO.id));

      if (empacotamentoOrError.isFailure) {
        return Result.fail<IEmpacotamentoDTO>(empacotamentoOrError.errorValue());
      }

      const empacotamentoResult = empacotamentoOrError.getValue();

      await this.empacotamentoRepo.save(empacotamentoResult);
      await this.empacotamentoConhecimento(empacotamentoDTO);

      const empacotamentoDTOResult = EmpacotamentoMap.toDTO( empacotamentoResult ) as IEmpacotamentoDTO;
      return Result.ok<IEmpacotamentoDTO>( empacotamentoDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>> {
    try {
      const empacotamento = await this.empacotamentoRepo.findByDomainId(empacotamentoDTO.id);

      if (empacotamento === null) {
        return Result.fail<IEmpacotamentoDTO>("Empacotamento not found");
      }
      else {
        if(empacotamento.camiao != null){
            empacotamento.updateCamiao(await EmpacotamentoCamiao.create(empacotamentoDTO.camiao).getValue());
        }

        if(empacotamento.posicaoX != null){
            empacotamento.updatePosicaoX(await EmpacotamentoPosicaoX.create(empacotamentoDTO.posicaoX).getValue());
        }

        if(empacotamento.posicaoY != null){
            empacotamento.updatePosicaoY(await EmpacotamentoPosicaoY.create(empacotamentoDTO.posicaoY).getValue());
        }

        if(empacotamento.posicaoZ != null){
            empacotamento.updatePosicaoZ(await EmpacotamentoPosicaoZ.create(empacotamentoDTO.posicaoZ).getValue());
        }
       
        await this.empacotamentoRepo.save(empacotamento);
        await this.empacotamentoConhecimento(empacotamentoDTO);

        const empacotamentoDTOResult = EmpacotamentoMap.toDTO( empacotamento ) as IEmpacotamentoDTO;
        return Result.ok<IEmpacotamentoDTO>( empacotamentoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  public async listEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO[]>> {
    try {

      var listEmpacotamento: Empacotamento[] = [];

      if(empacotamentoDTO.id == null){
       listEmpacotamento = await this.empacotamentoRepo.findAll();
      }

      else{
        listEmpacotamento.push(await this.empacotamentoRepo.findByDomainId(empacotamentoDTO.id));
      }

      if (listEmpacotamento === null) {
        return Result.fail<IEmpacotamentoDTO[]>("Não foram encontrados camiões");
      }
      else {
        const listEmpacotamentoDTOResult = listEmpacotamento.map((listEmpacotamentoDTOResult) => EmpacotamentoMap.toDTO(listEmpacotamentoDTOResult)) as IEmpacotamentoDTO[];
        return Result.ok<IEmpacotamentoDTO[]>(listEmpacotamentoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  private async empacotamentoConhecimento(empacotamentoDTO: IEmpacotamentoDTO): Promise<boolean> {
    var path = "https://vs-gate.dei.isep.ipp.pt:30272/criarEmpacotamento?"
    var fullpath = path.concat("entrega="+empacotamentoDTO.id+
                               "&matricula="+empacotamentoDTO.camiao+
                               "&posx="+empacotamentoDTO.posicaoX+
                               "&posy="+empacotamentoDTO.posicaoY+
                               "&posz="+empacotamentoDTO.posicaoZ);

    const response = await fetch(fullpath);

    if(response[0]==201){
      return true;
    }
    return false;
  }

}