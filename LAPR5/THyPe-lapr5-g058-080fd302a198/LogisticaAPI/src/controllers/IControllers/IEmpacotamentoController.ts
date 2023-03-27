/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';

export default interface IEmpacotamentoController  {
  createEmpacotamento(req: Request, res: Response, next: NextFunction);
  updateEmpacotamento(req: Request, res: Response, next: NextFunction);
  listEmpacotamento(req: Request, res: Response, next: NextFunction);
}