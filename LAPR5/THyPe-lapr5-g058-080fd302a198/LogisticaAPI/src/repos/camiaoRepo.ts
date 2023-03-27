/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

import ICamiaoRepo from "../services/IRepos/ICamiaoRepo";
import { Camiao } from "../domain/camiao/camiao";
import { CamiaoID } from "../domain/camiao/camiaoID";

import { CamiaoMap } from "../mappers/CamiaoMap";

@Service()
export default class CamiaoRepo implements ICamiaoRepo {
  private models: any;

  constructor(
    @Inject('camiaoSchema') private camiaoSchema : Model<ICamiaoPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (camiao: Camiao): Promise<boolean> {

    const idX = camiao.id instanceof CamiaoID ? (<CamiaoID>camiao.id).toValue() : camiao.id;

    const query = { domainId: idX}; 
    const camiaoDocument = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document>);

    return !!camiaoDocument === true;
  }

  public async save (camiao: Camiao): Promise<Camiao> {
    const query = { domainId: camiao.id.toString() }; 

    const camiaoDocument = await this.camiaoSchema.findOne( query );

    try {
      if (camiaoDocument === null ) {
        const rawCamiao: any = CamiaoMap.toPersistence(camiao);

        const camiaoCreated = await this.camiaoSchema.create(rawCamiao);

        return CamiaoMap.toDomain(camiaoCreated);
      } else {
        //camiaoDocument._id = camiao.camiaoID;
        camiaoDocument.tara = camiao.tara.value;
        camiaoDocument.cargaKg = camiao.cargaKg.value;
        camiaoDocument.cargaKWh = camiao.cargaKWh.value;
        camiaoDocument.autonomia = camiao.autonomia.value;
        camiaoDocument.tempoCarregamentoRapido = camiao.tempoCarregamentoRapido.value;
        camiaoDocument.ativado = camiao.ativado.value;
        
        await camiaoDocument.save();

        return camiao;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (camiaoId: CamiaoID | string): Promise<Camiao> {
    const query = { domainId: camiaoId};
    const camiaoRecord = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document> );

    if( camiaoRecord != null) {
      return CamiaoMap.toDomain(camiaoRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Camiao[]> {
    const camiaoRecord = await this.camiaoSchema.find();

    if(camiaoRecord != null){
      return (camiaoRecord.map((postRecord) => CamiaoMap.toDomain(postRecord)));
    }
    else
      return null;
  }

  public async findAtivados (): Promise<Camiao[]> {
    const query = { ativado: true};
    const camiaoRecord = await this.camiaoSchema.find( query as FilterQuery<ICamiaoPersistence & Document> );

    if(camiaoRecord != null){
      return (camiaoRecord.map((postRecord) => CamiaoMap.toDomain(postRecord)));
    }
    else
      return null;
  }

  public async findDesativados (): Promise<Camiao[]> {
    const query = { ativado: false};
    const camiaoRecord = await this.camiaoSchema.find( query as FilterQuery<ICamiaoPersistence & Document> );

    if(camiaoRecord != null){
      return (camiaoRecord.map((postRecord) => CamiaoMap.toDomain(postRecord)));
    }
    else
      return null;
  }
}