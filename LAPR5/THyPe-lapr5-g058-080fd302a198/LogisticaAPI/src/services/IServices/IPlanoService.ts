/* eslint-disable prettier/prettier */
import { Result } from "../../core/logic/Result";
import IPlanoDTO from "../../dto/IPlanoDTO";
import IPlanoRequestDTO from '../../dto/IPlanoRequestDTO';
import IPlanoGeneticoDTO from '../../dto/IPlanoGeneticoDTO';

export default interface IPlanoService {
  //createPlano(planoDTO: IPlanoRequestDTO): Promise<Result<IPlanoDTO>>;
  createPlano(id:string, matricula:string, date:number, heuristica:number):Promise<Result<IPlanoDTO>>;
  createPlanoDia(planoDTO: IPlanoRequestDTO): Promise<Result<IPlanoDTO[]>>;
  getPlano (planoId: string): Promise<Result<IPlanoDTO>>;
  createPlanoDiaGen(planoDTO: IPlanoGeneticoDTO): Promise<Result<IPlanoDTO[]>>;
  listPlano(planoDTO: IPlanoDTO) : Promise<Result<IPlanoDTO[]>>;
}