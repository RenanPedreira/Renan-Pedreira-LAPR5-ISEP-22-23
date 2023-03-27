/* eslint-disable prettier/prettier */
import { Result } from "../../core/logic/Result";
import IEmpacotamentoDTO from "../../dto/IEmpacotamentoDTO";

export default interface IEmpacotamentoService  {
  createEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;
  updateEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO): Promise<Result<IEmpacotamentoDTO>>;

  getEmpacotamento (empacotamentoId: string): Promise<Result<IEmpacotamentoDTO>>;
  listEmpacotamento(empacotamentoDTO: IEmpacotamentoDTO) : Promise<Result<IEmpacotamentoDTO[]>>;
}