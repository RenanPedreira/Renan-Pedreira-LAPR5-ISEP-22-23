/* eslint-disable prettier/prettier */
import { Result } from "../../core/logic/Result";
import ICamiaoDTO from "../../dto/ICamiaoDTO";

export default interface ICamiaoService  {
  createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
  updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;

  getCamiao (camiaoId: string): Promise<Result<ICamiaoDTO>>;
  listCamiao(camiaoDTO: ICamiaoDTO) : Promise<Result<ICamiaoDTO[]>>;
}