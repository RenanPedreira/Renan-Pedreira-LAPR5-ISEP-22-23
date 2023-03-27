/* eslint-disable prettier/prettier */
import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPlanoPersistence } from '../dataschema/IPlanoPersistence';

import IPlanoDTO from "../dto/IPlanoDTO";
import { Plano } from "../domain/plano/plano";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { PlanoMatricula } from "../domain/plano/planoMatricula";
import { PlanoData } from "../domain/plano/planoData";
import { PlanoArmazem } from "../domain/plano/planoArmazem";
import { PlanoEntrega } from "../domain/plano/planoEntrega";

export class PlanoMap extends Mapper<Plano> {
  
  public static toDTO( plano: Plano): IPlanoDTO {
    // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
    return {
      id: plano.id.toString(),
      matricula: plano.matricula.value,
      date: plano.data.value,
      armazem: plano.armazem.value,
      entrega: plano.entrega.value,
    } as IPlanoDTO;
  }

  public static toDomain (raw: any | Model<IPlanoPersistence & Document>): Plano {

    const planoOrError = Plano.create({
      matricula: PlanoMatricula.create(raw.matricula).getValue(), 
      date: PlanoData.create(raw.date).getValue(), 
      armazem: PlanoArmazem.create(raw.armazens).getValue(), 
      entrega: PlanoEntrega.create(raw.entregas).getValue()
    }, new UniqueEntityID(raw.domainId));

    planoOrError.isFailure ? console.log(planoOrError.error) : '';

    return planoOrError.isSuccess ? planoOrError.getValue() : null;
  }

  public static toPersistence (plano: Plano): IPlanoPersistence {
    const a = {
      domainId: plano.id.toString(),
      matricula: plano.matricula.value,
      date: plano.data.value,
      armazens: plano.armazem.value,
      entregas: plano.entrega.value
    }
    return a;
  }
}