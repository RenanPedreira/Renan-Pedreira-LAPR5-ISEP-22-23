/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IEmpacotamentoPersistence } from '../dataschema/IEmpacotamentoPersistence';

import IEmpacotamentoRepo from "../services/IRepos/IEmpacotamentoRepo";
import { Empacotamento } from "../domain/empacotamento/empacotamento";
import { EmpacotamentoID } from "../domain/empacotamento/empacotamentoID";

import { EmpacotamentoMap } from "../mappers/EmpacotamentoMap";

@Service()
export default class EmpacotamentoRepo implements IEmpacotamentoRepo {
  private models: any;

  constructor(
    @Inject('empacotamentoSchema') private empacotamentoSchema : Model<IEmpacotamentoPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists (empacotamento: Empacotamento): Promise<boolean> {

    const idX = empacotamento.id instanceof EmpacotamentoID ? (<EmpacotamentoID>empacotamento.id).toValue() : empacotamento.id;

    const query = { domainId: idX}; 
    const empacotamentoDocument = await this.empacotamentoSchema.findOne( query as FilterQuery<IEmpacotamentoPersistence & Document>);

    return !!empacotamentoDocument === true;
  }

  public async save (empacotamento: Empacotamento): Promise<Empacotamento> {
    const query = { domainId: empacotamento.id.toString() }; 

    const empacotamentoDocument = await this.empacotamentoSchema.findOne( query );

    try {
      if (empacotamentoDocument === null ) {
        const rawEmpacotamento: any = EmpacotamentoMap.toPersistence(empacotamento);

        const empacotamentoCreated = await this.empacotamentoSchema.create(rawEmpacotamento);

        return EmpacotamentoMap.toDomain(empacotamentoCreated);
      } else {
        empacotamentoDocument.camiao = empacotamento.camiao.value;
        empacotamentoDocument.posicaoX = empacotamento.posicaoX.value;
        empacotamentoDocument.posicaoY = empacotamento.posicaoY.value;
        empacotamentoDocument.posicaoZ = empacotamento.posicaoZ.value;
        
        await empacotamentoDocument.save();

        return empacotamento;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (empacotamentoId: EmpacotamentoID | string): Promise<Empacotamento> {
    const query = { domainId: empacotamentoId};
    const empacotamentoRecord = await this.empacotamentoSchema.findOne( query as FilterQuery<IEmpacotamentoPersistence & Document> );

    if( empacotamentoRecord != null) {
      return EmpacotamentoMap.toDomain(empacotamentoRecord);
    }
    else
      return null;
  }

  public async findAll(): Promise<Empacotamento[]> {
    const empacotamentoRecord = await this.empacotamentoSchema.find();

    if(empacotamentoRecord != null){
      return (empacotamentoRecord.map((postRecord) => EmpacotamentoMap.toDomain(postRecord)));
    }
    else
      return null;
  }
}