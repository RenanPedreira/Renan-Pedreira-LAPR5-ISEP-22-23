/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IRotaController from '../../controllers/IControllers/IRotaController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/rota', route);

  const ctrl = Container.get(config.controllers.rota.name) as IRotaController;

  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        distancia: Joi.number().min(0).required(),
        armazemOrigem: Joi.number().required(),
        armazemDestino: Joi.number().required(),
        tempoPercorrer: Joi.number().min(0).required(),
        tempoCarregamento: Joi.number().min(0).required(),
        tempoCarregamentoExtra: Joi.number().min(0).required(),
      })
    }),
    (req, res, next) => ctrl.createRota(req, res, next) );

  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        distancia: Joi.number().min(0),
        armazemOrigem: Joi.number().required(),
        armazemDestino: Joi.number().required(),
        tempoPercorrer: Joi.number().min(0),
        tempoCarregamento: Joi.number().min(0),
        tempoCarregamentoExtra: Joi.number().min(0),
      }),
    }),
    (req, res, next) => ctrl.updateRota(req, res, next) );
    
    route.get('',
    celebrate({
      body: Joi.object({
        armazemOrigem: Joi.number(),
        armazemDestino: Joi.number(),
      }),
    }),
    (req, res, next) => ctrl.listRota(req, res, next) );
};  