/* eslint-disable prettier/prettier */
import { Repo } from "../../core/infra/Repo";
import { Empacotamento } from "../../domain/empacotamento/empacotamento";
import { EmpacotamentoID } from "../../domain/empacotamento/empacotamentoID";

export default interface IEmpacotamentoRepo extends Repo<Empacotamento> {
  save(empacotamento: Empacotamento): Promise<Empacotamento>;
  findByDomainId (empacotamentoId: EmpacotamentoID | string): Promise<Empacotamento>;
  findAll(): Promise<Empacotamento[]>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}