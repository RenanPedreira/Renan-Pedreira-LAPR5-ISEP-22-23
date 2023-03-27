/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPlanoController from "./IControllers/IPlanoController";
import IPlanoService from '../services/IServices/IPlanoService';
import IPlanogeneticoDTO from '../dto/IPlanoGeneticoDTO';
import IPlanoDTO from '../dto/IPlanoDTO';

import { Result } from "../core/logic/Result";
import IPlanoRequestDTO from '../dto/IPlanoRequestDTO';

@Service()
export default class PlanoController implements IPlanoController {
  constructor(
      @Inject(config.services.plano.name) private planoServiceInstance : IPlanoService
  ) {}

  public async createPlano(req: Request, res: Response, next: NextFunction) {

    try {
      const planoOrError = await this.planoServiceInstance.createPlanoDia(req.body as IPlanoRequestDTO) as Result<IPlanoDTO[]>;

      if (planoOrError.isFailure) {
        return res.status(402).send();
      }

      const planoDTO = planoOrError.getValue();
      return res.json( planoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async createPlanoGen(req: Request, res: Response, next: NextFunction) {

    try {
      const planoOrError = await this.planoServiceInstance.createPlanoDiaGen(req.body as IPlanogeneticoDTO) as Result<IPlanoDTO[]>;

      if (planoOrError.isFailure) {
        return res.status(402).send();
      }

      const planoDTO = planoOrError.getValue();
      return res.json( planoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async listPlano(req: Request, res: Response, next: NextFunction) {
    try {
      const listOrError = await this.planoServiceInstance.listPlano(req.body as IPlanoDTO) as Result<IPlanoDTO[]>;

      if (listOrError.isFailure) {
        return res.status(404).send();
      }

      const listPlanoDTO = listOrError.getValue();
      return res.status(201).json( listPlanoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

}