/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IPlanoPersistence } from '../dataschema/IPlanoPersistence';

import IPlanoRepo from "../services/IRepos/IPlanoRepo";
import { Plano } from "../domain/plano/plano";
import { PlanoID } from "../domain/plano/planoID";

import { PlanoMap } from "../mappers/PlanoMap";

@Service()
export default class PlanoRepo implements IPlanoRepo {
  private models: any;

  constructor(
    @Inject('planoSchema') private planoSchema : Model<IPlanoPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (plano: Plano): Promise<boolean> {

    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    const idX = plano.id instanceof PlanoID ? (<PlanoID>plano.id).toValue() : plano.id;

    const query = { domainId: idX}; 
    const planoDocument = await this.planoSchema.findOne( query as FilterQuery<IPlanoPersistence & Document>);

    return !!planoDocument === true;
  }

  public async save (plano: Plano): Promise<Plano> {
    const query = { domainId: plano.id.toString() }; 

    const planoDocument = await this.planoSchema.findOne( query );

    try {
      if (planoDocument === null ) {
        const rawPlano: IPlanoPersistence = PlanoMap.toPersistence(plano);

        const planoCreated = await this.planoSchema.create(rawPlano);
        planoCreated.date= plano.data.value;
        await planoCreated.save();

        return PlanoMap.toDomain(planoCreated);

      } else {
        planoDocument.matricula = plano.matricula.value;
        planoDocument.date = plano.data.value;
        planoDocument.armazens = plano.armazem.value;
        planoDocument.entregas = plano.entrega.value;

        await planoDocument.save();

        return plano;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (domainId: PlanoID | string): Promise<Plano> {
    const query = { domainId: PlanoID};
    const planoRecord = await this.planoSchema.findOne( query as FilterQuery<IPlanoPersistence & Document> );

    if( planoRecord != null) {
      return PlanoMap.toDomain(planoRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Plano[]> {
    const planoRecord = await this.planoSchema.find();

    if(planoRecord != null){
      return (planoRecord.map((postRecord) => PlanoMap.toDomain(postRecord)));
    }
    else
      return null;
  }
}