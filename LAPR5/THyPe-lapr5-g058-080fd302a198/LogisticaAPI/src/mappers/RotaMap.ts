/* eslint-disable prettier/prettier */
import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';

import IRotaDTO from "../dto/IRotaDTO";
import { Rota } from "../domain/rota/rota";

import { RotaDistancia } from "../domain/rota/rotaDistancia";
import { RotaArmazem } from "../domain/rota/rotaArmazem";
import { RotaTempoPercorrer } from "../domain/rota/rotaTempoPercorrer";
import { RotaTempoCarregamento } from "../domain/rota/rotaTempoCarregamento";
import { RotaTempoCarregamentoExtra } from "../domain/rota/rotaTempoCarregamentoExtra";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class RotaMap extends Mapper<Rota> {
  
  public static toDTO( rota: Rota): IRotaDTO {
    return {
        id: rota.id.toValue(),
        distancia: rota.rotaDistancia.value,
        armazemOrigem: rota.rotaArmazemOrigem.value,
        armazemDestino: rota.rotaArmazemDestino.value,
        tempoPercorrer: rota.rotaTempoPercorrer.value,
        tempoCarregamento: rota.rotaTempoCarregamento.value,
        tempoCarregamentoExtra: rota.rotaTempoCarregamentoExtra.value,
    } as IRotaDTO;
  }

  public static toDomain (raw: any| Model<IRotaPersistence & Document>): Rota {

    const rotaOrError = Rota.create({
        distancia: RotaDistancia.create(raw.distancia).getValue(),
        armazemOrigem:  RotaArmazem.create(raw.armazemOrigem).getValue(),
        armazemDestino:   RotaArmazem.create(raw.armazemDestino).getValue(),
        tempoPercorrer: RotaTempoPercorrer.create(raw.tempoPercorrer).getValue(),
        tempoCarregamento: RotaTempoCarregamento.create(raw.tempoCarregamento).getValue(),
        tempoCarregamentoExtra: RotaTempoCarregamentoExtra.create(raw.tempoCarregamentoExtra).getValue(),
    }, new UniqueEntityID(raw.domainId));

    rotaOrError.isFailure ? console.log(rotaOrError.error) : '';

    return rotaOrError.isSuccess ? rotaOrError.getValue() : null;
  }

  public static toPersistence (rota: Rota): any {
    const a = {
        domainId : rota.id.toValue(),
        distancia: rota.rotaDistancia.value,
        armazemOrigem:  rota.rotaArmazemOrigem.value,
        armazemDestino:  rota.rotaArmazemDestino.value,
        tempoPercorrer: rota.rotaTempoPercorrer.value,
        tempoCarregamento: rota.rotaTempoCarregamento.value,
        tempoCarregamentoExtra: rota.rotaTempoCarregamentoExtra.value,
    }
    return a;
  }
}