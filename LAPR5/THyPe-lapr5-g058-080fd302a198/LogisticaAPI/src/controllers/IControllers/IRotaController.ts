import { Request, Response, NextFunction } from 'express';

export default interface IRotaController  {
  createRota(req: Request, res: Response, next: NextFunction);
  updateRota(req: Request, res: Response, next: NextFunction);
  listRota(req: Request, res: Response, next: NextFunction);
}