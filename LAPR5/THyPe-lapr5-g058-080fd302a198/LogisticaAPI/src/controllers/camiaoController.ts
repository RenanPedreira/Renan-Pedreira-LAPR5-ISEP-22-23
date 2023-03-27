/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ICamiaoController from "./IControllers/ICamiaoController";
import ICamiaoService from '../services/IServices/ICamiaoService';
import ICamiaoDTO from '../dto/ICamiaoDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class CamiaoController implements ICamiaoController {
  constructor(
      @Inject(config.services.camiao.name) private camiaoServiceInstance : ICamiaoService
  ) {}

  public async createCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const camiaoOrError = await this.camiaoServiceInstance.createCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

      if (camiaoOrError.isFailure) {
        return res.status(402).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.json( camiaoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const camiaoOrError = await this.camiaoServiceInstance.updateCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

      if (camiaoOrError.isFailure) {
        return res.status(404).send();
      }

      const camiaoDTO = camiaoOrError.getValue();
      return res.status(201).json( camiaoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listCamiao(req: Request, res: Response, next: NextFunction) {
    try {
      const listOrError = await this.camiaoServiceInstance.listCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO[]>;

      if (listOrError.isFailure) {
        return res.status(404).send();
      }

      const listCamiaoDTO = listOrError.getValue();
      return res.status(201).json( listCamiaoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

}