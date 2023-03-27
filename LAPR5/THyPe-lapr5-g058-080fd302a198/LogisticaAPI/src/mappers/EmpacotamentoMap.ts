/* eslint-disable prettier/prettier */
import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IEmpacotamentoPersistence } from '../dataschema/IEmpacotamentoPersistence';

import IEmpacotamentoDTO from "../dto/IEmpacotamentoDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Empacotamento } from "../domain/empacotamento/empacotamento";
import { EmpacotamentoPosicaoX } from "../domain/empacotamento/empacotamentoPosicaoX";
import { EmpacotamentoCamiao } from "../domain/empacotamento/empacotamentoCamiao";
import { EmpacotamentoPosicaoY } from "../domain/empacotamento/empacotamentoPosicaoY";
import { EmpacotamentoPosicaoZ } from "../domain/empacotamento/empacotamentoPosicaoZ";

export class EmpacotamentoMap extends Mapper<Empacotamento> {
  
  public static toDTO( empacotamento: Empacotamento): IEmpacotamentoDTO {
    return {
      id: empacotamento.id.toString(),
      camiao:empacotamento.camiao.value,
      posicaoX:empacotamento.posicaoX.value,
      posicaoY:empacotamento.posicaoY.value,
      posicaoZ:empacotamento.posicaoZ.value
    } as IEmpacotamentoDTO;
  }

  public static toDomain (raw: any | Model<IEmpacotamentoPersistence & Document>): Empacotamento {

    const empacotamentoOrError = Empacotamento.create({
        camiao:EmpacotamentoCamiao.create(raw.camiao).getValue(), 
        posicaoX:EmpacotamentoPosicaoX.create(raw.posicaoX).getValue(), 
        posicaoY:EmpacotamentoPosicaoY.create(raw.posicaoY).getValue(), 
        posicaoZ:EmpacotamentoPosicaoZ.create(raw.posicaoZ).getValue()
    }, new UniqueEntityID(raw.domainId));

    empacotamentoOrError.isFailure ? console.log(empacotamentoOrError.error) : '';

    return empacotamentoOrError.isSuccess ? empacotamentoOrError.getValue() : null;
  }

  public static toPersistence (empacotamento: Empacotamento): any {
    const a = {
      domainId: empacotamento.id.toString(),
      camiao:empacotamento.camiao.value,
      posicaoX:empacotamento.posicaoX.value,
      posicaoY:empacotamento.posicaoY.value,
      posicaoZ:empacotamento.posicaoZ.value
    }
    return a;
  }
}