/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable prettier/prettier */
import { Service, Inject } from 'typedi';
import config from "../../config";
import IPlanoDTO from '../dto/IPlanoDTO';
import { Plano } from "../domain/plano/plano";
import IPlanoRepo from '../services/IRepos/IPlanoRepo';
import IPlanoService from './IServices/IPlanoService';
import { Result } from "../core/logic/Result";
import { PlanoMap } from "../mappers/PlanoMap";

import { PlanoMatricula } from "../domain/plano/planoMatricula";
import { PlanoData } from "../domain/plano/planoData";
import { PlanoArmazem } from "../domain/plano/planoArmazem";
import { PlanoEntrega } from "../domain/plano/planoEntrega";
import { UniqueEntityID } from '../core/domain/UniqueEntityID';

import https = require('https');
import fetch = require('node-fetch');


import console = require("console");
import IPlanoRequestDTO from '../dto/IPlanoRequestDTO';
import ICamiaoRepo from './IRepos/ICamiaoRepo';
import { Camiao } from '../domain/camiao/camiao';
import IPlanoGeneticoDTO from '../dto/IPlanoGeneticoDTO';

@Service()
export default class PlanoService implements IPlanoService {
  constructor(
      @Inject(config.repos.plano.name) private planoRepo : IPlanoRepo,
      @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
  ) {}

  httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });

  public async getPlano( planoId: string): Promise<Result<IPlanoDTO>> {
    try {
      const plano = await this.planoRepo.findByDomainId(planoId);

      if (plano === null) {
        return Result.fail<IPlanoDTO>("Plano not found");
      }
      else {
        const planoDTOResult = PlanoMap.toDTO( plano ) as IPlanoDTO;
        return Result.ok<IPlanoDTO>( planoDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }

  //public async createPlano(planoDTO: IPlanoRequestDTO): Promise<Result<IPlanoDTO>> {
  public async createPlano(id:string, matricula:string, date:number, heuristica:number): Promise<Result<IPlanoDTO>> {

    if(heuristica!=5){
      var path = "https://vs-gate.dei.isep.ipp.pt:30272/calculaRota?"
      var fullpath = path.concat("camiao="+matricula+"&data="+date+"&heuristica="+heuristica);
    }

    if(heuristica==5){
      var path = "https://vs-gate.dei.isep.ipp.pt:30272/battleRoyale?"
      var fullpath = path.concat("camiao="+matricula+
                               "&data="+date+
                               "&limite=0"+
                               "&tempo=10000"+
                               "&geracoes=50"+
                               "&populacao=10"+
                               "&probCruzamento=0.5"+
                               "&probMutacao=0.25");
    }
    

    const response = await fetch(fullpath, {
      method: 'POST',
      agent: this.httpsAgent,
    });

    let data = await response.json();
    
    if(data[0].length!=0 && data[1].length!=0){
    try {
      const planoOrError = await Plano.create({
        matricula: await PlanoMatricula.create(matricula).getValue(), 
        date: await PlanoData.create(date).getValue(), 
        armazem: await PlanoArmazem.create(data[0]).getValue(), 
        entrega: await PlanoEntrega.create(data[1]).getValue(),
      },new UniqueEntityID(id));

      if (planoOrError.isFailure) {
        return Result.fail<IPlanoDTO>(planoOrError.errorValue());
      }

      const planoResult = planoOrError.getValue();

      await this.planoRepo.save(planoResult);

      const planoDTOResult = PlanoMap.toDTO( planoResult ) as IPlanoDTO;
      return Result.ok<IPlanoDTO>( planoDTOResult )
    } catch (e) {
      throw e;
    }
    }
  }


  public async createPlanoGen(req: IPlanoGeneticoDTO): Promise<Result<IPlanoDTO>> {

    var path = "https://vs-gate.dei.isep.ipp.pt:30272/battleRoyale?"
    var fullpath = path.concat("camiao="+req.matricula+
                               "&data="+req.date+
                               "&limite="+req.limite+
                               "&tempo="+req.tempo+
                               "&geracoes="+req.geracoes+
                               "&populacao="+req.populacao+
                               "&probCruzamento="+req.probCruzamento+
                               "&probMutacao="+req.probMutacao);

    //https://vs-gate.dei.isep.ipp.pt:30272/battleRoyale?camiao=BL-00-DD&data=20231211&limite=0&tempo=20000&geracoes=100&populacao=10&probCruzamento=0.50&probMutacao=0.25

    const response = await fetch(fullpath, {
      method: 'POST',
      agent: this.httpsAgent,
    });

    let data = await response.json();
    
    if(data[0].length!=0){
    try {
      const planoOrError = await Plano.create({
        matricula: await PlanoMatricula.create(req.matricula).getValue(), 
        date: await PlanoData.create(req.date).getValue(), 
        armazem: await PlanoArmazem.create(data[0]).getValue(), 
        entrega: await PlanoEntrega.create(data[1]).getValue(),
      },new UniqueEntityID(req.id));

      if (planoOrError.isFailure) {
        return Result.fail<IPlanoDTO>(planoOrError.errorValue());
      }

      const planoResult = planoOrError.getValue();

      await this.planoRepo.save(planoResult);

      const planoDTOResult = PlanoMap.toDTO( planoResult ) as IPlanoDTO;
      return Result.ok<IPlanoDTO>( planoDTOResult )
    } catch (e) {
      throw e;
    }
    }
  }


  public async distribuiEntregas(dia: number){
    //urls para comunicação com o módulo de logística
    var path = "https://vs-gate.dei.isep.ipp.pt:30272/distribuiEntregas?"
    var fullpath = path.concat("data="+dia);

    //Distribui as entregas do dia para a frota
    await fetch(fullpath, {
      method: 'POST',
      agent: this.httpsAgent,
    });
  }

  public async createPlanoDia(planoDTO: IPlanoRequestDTO): Promise<Result<IPlanoDTO[]>>{

    //Obtém lista de camiões
    var listCamiao: Camiao[];
    listCamiao = await this.camiaoRepo.findAtivados();

    //Algoritimo artificial
    if(planoDTO.heuristica==6){
      return await this.algoritimoArtificial(planoDTO.date, listCamiao);
    }
    
    else{
      await this.distribuiEntregas(planoDTO.date);

      //Para cada camião calcula uma viagem para o dia com suas entregas
      for(let i=0; i<listCamiao.length; i++){
        planoDTO.id=listCamiao[i].id.toString()+"-"+planoDTO.date.toString();
        planoDTO.matricula = listCamiao[i].id.toString();
        await this.createPlano(planoDTO.id, planoDTO.matricula, planoDTO.date, planoDTO.heuristica);
      }

      var listPlano: Plano[] = [];
      await this.planoRepo.findAll();
      const listPlanoDTOResult = listPlano.map((listPlanoDTOResult) => PlanoMap.toDTO(listPlanoDTOResult)) as IPlanoDTO[];
      return Result.ok<IPlanoDTO[]>(listPlanoDTOResult);
    }
  }


  public async createPlanoDiaGen(planoDTO: IPlanoGeneticoDTO): Promise<Result<IPlanoDTO[]>>{
    
    //Obtém lista de camiões
    var listCamiao: Camiao[];
    listCamiao = await this.camiaoRepo.findAtivados();

    await this.distribuiEntregas(planoDTO.date);

    //Para cada camião calcula uma viagem para o dia com suas entregas
    for(let i=0; i<listCamiao.length; i++){
      planoDTO.id=listCamiao[i].id.toString()+"-"+planoDTO.date.toString();
      planoDTO.matricula = listCamiao[i].id.toString();
      await this.createPlanoGen(planoDTO);
    }

    var listPlano: Plano[] = [];
    await this.planoRepo.findAll();
    const listPlanoDTOResult = listPlano.map((listPlanoDTOResult) => PlanoMap.toDTO(listPlanoDTOResult)) as IPlanoDTO[];
    return Result.ok<IPlanoDTO[]>(listPlanoDTOResult);
  }


  public async listPlano(planoDTO: IPlanoDTO): Promise<Result<IPlanoDTO[]>> {
    try {

      var listPlano: Plano[] = [];

      if(planoDTO.id == null){
       listPlano = await this.planoRepo.findAll();
      }

      else{
        listPlano.push(await this.planoRepo.findByDomainId(planoDTO.id));
      }

      if (listPlano === null) {
        return Result.fail<IPlanoDTO[]>("Não foram encontrados planos");
      }
      else {
        const listPlanoDTOResult = listPlano.map((listPlanoDTOResult) => PlanoMap.toDTO(listPlanoDTOResult)) as IPlanoDTO[];
        return Result.ok<IPlanoDTO[]>(listPlanoDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async algoritimoArtificial(dia: number, listCamiao: Camiao[]): Promise<Result<IPlanoDTO[]>>{
    
    var path = "https://gestorarmazem.azurewebsites.net/api/Entregas";
    const response = await fetch(path, {
      method: 'GET',
      agent: this.httpsAgent,
    });

    let entregas: string[] = [];
    let armazens: string[] = [];
    let pesosEntregas: number[] = [];

    let data = await response.json();
    for(let i=0; i<data.length; i++){

      let rdata = data[i].dataEntrega;
      rdata = rdata.split('/').join('');
      let entregaDia=Number(rdata);

      if(entregaDia==dia){

        rdata = JSON.stringify(data[i].armazem_Id).split(':');
        rdata = rdata[1].split('}');
        //console.log("Armazem: "+rdata[0]);
        armazens.push(rdata[0]);

        //console.log("Entrega: "+data[i].id);
        entregas.push(data[i].id);
        pesosEntregas.push(Number(data[i].massaEntrega));

      }
    }

    let flag = 0;

    let currentCamiao: string[] =[];
    let camiaoArmazem: string[][] = [];

    let currentCamiao2: string[] =[];
    let camiaoEntrega: string[][] = [];
    let camiaoEntregaF: string[][][] = [];

    let cargaKg = listCamiao[flag].cargaKg.value;
    


    for(let i=0; i<entregas.length; i++){

      if(cargaKg - pesosEntregas[i] > 0){    
        currentCamiao.push(armazens[i].split('"').join(''));
        currentCamiao2.push(entregas[i].split('"').join(''));
        cargaKg -= pesosEntregas[i];
      }

      else{
        camiaoArmazem.push(currentCamiao);
        camiaoEntrega.push(currentCamiao2);
        flag++;
        currentCamiao=[];
        currentCamiao2=[];
        cargaKg=listCamiao[flag].cargaKg.value;
        i--;
      }
    }

    camiaoArmazem.push(currentCamiao);
    camiaoEntrega.push(currentCamiao);

    for(let j=0; j<camiaoArmazem.length; j++){

      let entregasTemp: string[][] = [];
      for(let k=0; k<camiaoEntrega[j].length; k++){
        entregasTemp.push([camiaoEntrega[j][k]]);
      }

      camiaoEntregaF.push(entregasTemp);

      let matricula = listCamiao[j].id.toString();
      let planoID = matricula;
      planoID =planoID.concat("-");
      planoID =planoID.concat(String(dia));

      try {
        const planoOrError = await Plano.create({
          matricula: await PlanoMatricula.create(matricula).getValue(), 
          date: await PlanoData.create(dia).getValue(), 
          armazem: await PlanoArmazem.create(camiaoArmazem[j]).getValue(), 
          entrega: await PlanoEntrega.create(camiaoEntregaF[j]).getValue(),
        },new UniqueEntityID(planoID));

        if (planoOrError.isFailure) {
          return Result.fail<IPlanoDTO[]>(planoOrError.errorValue());
        }

        const planoResult = planoOrError.getValue();
  
        await this.planoRepo.save(planoResult);
  
        const planoDTOResult = PlanoMap.toDTO( planoResult ) as IPlanoDTO;

        if(j==camiaoArmazem.length-1){
          return Result.ok<IPlanoDTO[]>( [planoDTOResult] );
        }
      } catch (e) {
        throw e;
      }
    }
  }

}