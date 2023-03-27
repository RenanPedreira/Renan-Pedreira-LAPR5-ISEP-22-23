/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController  {
  createCamiao(req: Request, res: Response, next: NextFunction);
  updateCamiao(req: Request, res: Response, next: NextFunction);
  listCamiao(req: Request, res: Response, next: NextFunction);
}