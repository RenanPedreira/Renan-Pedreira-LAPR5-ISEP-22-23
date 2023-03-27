/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';

import IRotaRepo from "../services/IRepos/IRotaRepo";
import { Rota } from "../domain/rota/rota";
import { RotaId } from "../domain/rota/rotaID";
import { RotaMap } from "../mappers/RotaMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';
import { RotaArmazem } from '../domain/rota/rotaArmazem';

@Service()
export default class RotaRepo implements IRotaRepo {
  private models: any;

  constructor(
    @Inject('rotaSchema') private rotaSchema : Model<IRotaPersistence & Document>,
    @Inject('logger') private logger
    ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(rota: Rota): Promise<boolean> {
    
    const idX = rota.id instanceof RotaId ? (<RotaId>rota.id).toValue() : rota.id;

    const query = { domainId: idX}; 
    const rotaDocument = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document>);
    //const rotaDocument = await this.rotaSchema.findOne( query );

    return !!rotaDocument === true;
  }

  public async save (rota: Rota): Promise<Rota> {
    //const query = { domainId: rota.id.toValue()}; 
    const query = { domainId: rota.id.toString()}; 

    const rotaDocument = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );
    //const rotaDocument = await this.rotaSchema.findOne( query );


    try {
      if (rotaDocument === null ) {
        const rawRota: any = RotaMap.toPersistence(rota);

        const rotaCreated = await this.rotaSchema.create(rawRota);

        return RotaMap.toDomain(rotaCreated);
      } else {
        //rotaDocument.id = rota.rotaID;
        rotaDocument.distancia = rota.rotaDistancia.value;
        rotaDocument.armazemOrigem = rota.rotaArmazemOrigem.value;
        rotaDocument.armazemDestino = rota.rotaArmazemDestino.value;
        rotaDocument.tempoPercorrer = rota.rotaTempoPercorrer.value;
        rotaDocument.tempoCarregamento = rota.rotaTempoCarregamento.value;
        rotaDocument.tempoCarregamentoExtra = rota.rotaTempoCarregamentoExtra.value;

        await rotaDocument.save();

        return rota;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (rotaId: RotaId | string): Promise<Rota> {
    const query = { domainId: rotaId};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    }
    else
      return null;
  }
  
  public async findAll(): Promise<Rota[]> {
    const rotaRecord = await this.rotaSchema.find();

    if(rotaRecord != null){
      return (rotaRecord.map((postRecord) => RotaMap.toDomain(postRecord)));
    }
    else
      return null;
  }

  public async findByArmazemOrigemDestino (origem: RotaArmazem | number, destino: RotaArmazem | number): Promise<Rota> {
    const query = { armazemOrigem: origem, armazemDestino: destino};
    const rotaRecord = await this.rotaSchema.findOne( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return RotaMap.toDomain(rotaRecord);
    } else return null;
  }

  public async findByArmazemOrigem (origem: RotaArmazem | number): Promise<Rota[]> {
    const query = { armazemOrigem: origem};
    const rotaRecord = await this.rotaSchema.find( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return (rotaRecord.map((postRecord) => RotaMap.toDomain(postRecord)));
    } else return null;
  }

  public async findByArmazemDestino (destino: RotaArmazem | number): Promise<Rota[]> {
    const query = { armazemDestino: destino};
    const rotaRecord = await this.rotaSchema.find( query as FilterQuery<IRotaPersistence & Document> );

    if( rotaRecord != null) {
      return (rotaRecord.map((postRecord) => RotaMap.toDomain(postRecord)));
    } else return null;
  }
}