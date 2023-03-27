/* eslint-disable @typescript-eslint/no-object-literal-type-assertion */
/* eslint-disable prettier/prettier */
import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

import ICamiaoDTO from "../dto/ICamiaoDTO";
import { Camiao } from "../domain/camiao/camiao";
import { CamiaoTara } from "../domain/camiao/camiaoTara";
import { CamiaoCargaKg } from "../domain/camiao/camiaoCargaKg";
import { CamiaoCargaKWh } from "../domain/camiao/camiaoCargaKWh";
import { CamiaoAutonomia } from "../domain/camiao/camiaoAutonomia";
import { CamiaoTempoCarregamentoRapido } from "../domain/camiao/camiaoTempoCarregamentoRapido";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { CamiaoAtivado } from "../domain/camiao/camiaoAtivado";

export class CamiaoMap extends Mapper<Camiao> {
  
  public static toDTO( camiao: Camiao): ICamiaoDTO {
    return {
      id: camiao.id.toString(),
      tara: camiao.tara.value,
      cargaKg: camiao.cargaKg.value,
      cargaKWh: camiao.cargaKWh.value,
      autonomia : camiao.autonomia.value,
      tempoCarregamentoRapido : camiao.tempoCarregamentoRapido.value,
      ativado: camiao.ativado.value
    } as ICamiaoDTO;
  }

  public static toDomain (raw: any | Model<ICamiaoPersistence & Document>): Camiao {

    const camiaoOrError = Camiao.create({
      tara: CamiaoTara.create(raw.tara).getValue(), 
      cargaKg: CamiaoCargaKg.create(raw.cargaKg).getValue(), 
      cargaKWh: CamiaoCargaKWh.create(raw.cargaKWh).getValue(), 
      autonomia: CamiaoAutonomia.create(raw.autonomia).getValue(), 
      tempoCarregamentoRapido: CamiaoTempoCarregamentoRapido.create(raw.tempoCarregamentoRapido).getValue(),
      ativado: CamiaoAtivado.create(raw.ativado).getValue()
    }, new UniqueEntityID(raw.domainId));

    camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';

    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
  }

  public static toPersistence (camiao: Camiao): any {
    const a = {
      domainId: camiao.id.toString(),
      tara: camiao.tara.value,
      cargaKg: camiao.cargaKg.value,
      cargaKWh: camiao.cargaKWh.value,
      autonomia : camiao.autonomia.value,
      tempoCarregamentoRapido : camiao.tempoCarregamentoRapido.value,
      ativado: camiao.ativado.value
    }
    return a;
  }
}