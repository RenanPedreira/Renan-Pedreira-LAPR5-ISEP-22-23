/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IEmpacotamentoController from "./IControllers/IEmpacotamentoController";
import IEmpacotamentoService from '../services/IServices/IEmpacotamentoService';
import IEmpacotamentoDTO from '../dto/IEmpacotamentoDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class EmpacotamentoController implements IEmpacotamentoController {
  constructor(
      @Inject(config.services.empacotamento.name) private empacotamentoServiceInstance : IEmpacotamentoService
  ) {}

  public async createEmpacotamento(req: Request, res: Response, next: NextFunction) {
    try {
      const empacotamentoOrError = await this.empacotamentoServiceInstance.createEmpacotamento(req.body as IEmpacotamentoDTO) as Result<IEmpacotamentoDTO>;

      if (empacotamentoOrError.isFailure) {
        return res.status(402).send();
      }

      const empacotamentoDTO = empacotamentoOrError.getValue();
      return res.json( empacotamentoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateEmpacotamento(req: Request, res: Response, next: NextFunction) {
    try {
      const empacotamentoOrError = await this.empacotamentoServiceInstance.updateEmpacotamento(req.body as IEmpacotamentoDTO) as Result<IEmpacotamentoDTO>;

      if (empacotamentoOrError.isFailure) {
        return res.status(404).send();
      }

      const empacotamentoDTO = empacotamentoOrError.getValue();
      return res.status(201).json( empacotamentoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async listEmpacotamento(req: Request, res: Response, next: NextFunction) {
    try {
      const listOrError = await this.empacotamentoServiceInstance.listEmpacotamento(req.body as IEmpacotamentoDTO) as Result<IEmpacotamentoDTO[]>;

      if (listOrError.isFailure) {
        return res.status(404).send();
      }

      const listEmpacotamentoDTO = listOrError.getValue();
      return res.status(201).json( listEmpacotamentoDTO );
    }
    catch (e) {
      return next(e);
    }
  };

}