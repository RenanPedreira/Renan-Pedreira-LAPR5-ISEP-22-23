/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ICamiaoController from '../../controllers/IControllers/ICamiaoController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/camiao', route);

  const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

  //Create
  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/).required(),
        tara: Joi.number().min(1).required(),
        cargaKg: Joi.number().min(1).required(),
        cargaKWh: Joi.number().min(1).required(),
        autonomia: Joi.number().min(1).required(),
        tempoCarregamentoRapido: Joi.number().integer().min(1).required(),
        ativado: Joi.boolean()
      })
    }),
    (req, res, next) => ctrl.createCamiao(req, res, next) );

  //Update
  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/).required(),
        tara: Joi.number().min(1),
        cargaKg: Joi.number().min(1),
        cargaKWh: Joi.number().min(1),
        autonomia: Joi.number().min(1),
        tempoCarregamentoRapido: Joi.number().integer().min(1),
        ativado: Joi.boolean()
      }),
    }),
    (req, res, next) => ctrl.updateCamiao(req, res, next) );


  //List
  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/),
        ativado: Joi.boolean()
      }),
    }),
    (req, res, next) => ctrl.listCamiao(req, res, next) );

  //Patch
  route.patch('',
    celebrate({
      body: Joi.object({
        id: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/).required(),
        tara: Joi.number().min(1),
        cargaKg: Joi.number().min(1),
        cargaKWh: Joi.number().min(1),
        autonomia: Joi.number().min(1),
        tempoCarregamentoRapido: Joi.number().integer().min(1),
        ativado: Joi.boolean()
      }),
    }),
    (req, res, next) => ctrl.updateCamiao(req, res, next) );

};  