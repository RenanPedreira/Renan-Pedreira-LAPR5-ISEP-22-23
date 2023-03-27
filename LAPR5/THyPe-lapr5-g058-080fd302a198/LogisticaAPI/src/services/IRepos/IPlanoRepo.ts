/* eslint-disable prettier/prettier */
import { Repo } from "../../core/infra/Repo";
import { Plano } from "../../domain/plano/plano";
import { PlanoID } from "../../domain/plano/planoID";

export default interface IPlanoRepo extends Repo<Plano> {
  save(plano: Plano): Promise<Plano>;
  findByDomainId (planoId: PlanoID | string): Promise<Plano>;
  findAll(): Promise<Plano[]>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}