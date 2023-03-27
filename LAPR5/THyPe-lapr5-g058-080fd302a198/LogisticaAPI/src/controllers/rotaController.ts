/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IRotaController from "./IControllers/IRotaController";
import IRotaService from '../services/IServices/IRotaService';
import IRotaDTO from '../dto/IRotaDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class RotaController implements IRotaController {
  constructor(
      @Inject(config.services.rota.name) private rotaServiceInstance : IRotaService
  ) {}

  public async createRota(req: Request, res: Response, next: NextFunction) {
    try {
      const rotaOrError = await this.rotaServiceInstance.createRota(req.body as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(402).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.json( rotaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateRota(req: Request, res: Response, next: NextFunction) {
    try {
      const rotaOrError = await this.rotaServiceInstance.updateRota(req.body as IRotaDTO) as Result<IRotaDTO>;

      if (rotaOrError.isFailure) {
        return res.status(404).send();
      }

      const rotaDTO = rotaOrError.getValue();
      return res.status(201).json( rotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listRota(req: Request, res: Response, next: NextFunction) {
    try {
      const listOrError = await this.rotaServiceInstance.listRota(req.body as IRotaDTO) as Result<IRotaDTO[]>;

      if (listOrError.isFailure) {
        return res.status(404).send();
      }

      const listRotaDTO = listOrError.getValue();
      return res.status(201).json( listRotaDTO );
    }
    catch (e) {
      return next(e);
    }
  };
}