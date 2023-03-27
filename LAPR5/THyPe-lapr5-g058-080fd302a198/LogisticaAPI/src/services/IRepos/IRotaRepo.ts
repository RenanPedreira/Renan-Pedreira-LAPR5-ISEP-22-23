import { Repo } from "../../core/infra/Repo";
import { Rota } from "../../domain/rota/rota";
import { RotaArmazem } from "../../domain/rota/rotaArmazem";
import { RotaId } from "../../domain/rota/rotaID";

export default interface IRotaRepo extends Repo<Rota> {
  save(rota: Rota): Promise<Rota>;
  findByDomainId (rotaId: RotaId | string): Promise<Rota>;
  findAll(): Promise<Rota[]>;
  findByArmazemOrigemDestino(origem: RotaArmazem | number, destino: RotaArmazem | number): Promise<Rota>;
  findByArmazemOrigem(origem: RotaArmazem | number): Promise<Rota[]>;
  findByArmazemDestino(destino: RotaArmazem | number): Promise<Rota[]>;

  //findByIds (rolesIds: RoleId[]): Promise<Role[]>;
  //saveCollection (roles: Role[]): Promise<Role[]>;
  //removeByRoleIds (roles: RoleId[]): Promise<any>
}