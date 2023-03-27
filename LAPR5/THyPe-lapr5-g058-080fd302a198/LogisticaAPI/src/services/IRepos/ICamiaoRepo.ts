/* eslint-disable prettier/prettier */
import { Repo } from "../../core/infra/Repo";
import { Camiao } from "../../domain/camiao/camiao";
import { CamiaoAtivado } from "../../domain/camiao/camiaoAtivado";
import { CamiaoID } from "../../domain/camiao/camiaoID";

export default interface ICamiaoRepo extends Repo<Camiao> {
  save(camiao: Camiao): Promise<Camiao>;
  findByDomainId (camiaoId: CamiaoID | string): Promise<Camiao>;
  findAll(): Promise<Camiao[]>;
  findAtivados(): Promise<Camiao[]>;
  findDesativados(): Promise<Camiao[]>;
    
  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}