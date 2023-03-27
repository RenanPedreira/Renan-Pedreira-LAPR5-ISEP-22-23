/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction } from 'express';

export default interface IPlanoController  {
  createPlano(req: Request, res: Response, next: NextFunction);
  createPlanoGen(req: Request, res: Response, next: NextFunction);
  listPlano(req: Request, res: Response, next: NextFunction);
}