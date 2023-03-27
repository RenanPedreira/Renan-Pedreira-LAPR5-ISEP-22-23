import { Result } from "../../core/logic/Result";
import IRotaDTO from "../../dto/IRotaDTO";

export default interface IRotaService  {
  createRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  updateRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO>>;
  listRota(rotaDTO: IRotaDTO): Promise<Result<IRotaDTO[]>>;
  getRota (rotaId: string): Promise<Result<IRotaDTO>>;
}