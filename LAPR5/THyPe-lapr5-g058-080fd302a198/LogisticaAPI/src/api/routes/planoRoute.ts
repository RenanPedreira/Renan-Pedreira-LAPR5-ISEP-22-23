/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPlanoController from '../../controllers/IControllers/IPlanoController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/plano', route);

  const ctrl = Container.get(config.controllers.plano.name) as IPlanoController;

  //Create
  route.post('',
    celebrate({
      body: Joi.object({ 
        id: Joi.string(),
        matricula: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/),
        date: Joi.number().required(),
        heuristica: Joi.number().min(1).max(6),
      })
    }),
    (req, res, next) => ctrl.createPlano(req, res, next) );

    //Create com Genetico
    route.post('/gen',
    celebrate({
      body: Joi.object({ 
        date: Joi.number().required(),
        limite: Joi.number(),
        tempo: Joi.number(),
        geracoes: Joi.number(),
        populacao: Joi.number(),
        probCruzamento: Joi.number(),
        probMutacao: Joi.number()
      })
    }),
    (req, res, next) => ctrl.createPlanoGen(req, res, next) );

  //List
  route.get('',
    celebrate({
      body: Joi.object({
        matricula: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/),
        date: Joi.number()
      }),
    }),
    (req, res, next) => ctrl.listPlano(req, res, next) );
    
};  