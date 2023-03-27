/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IEmpacotamentoController from '../../controllers/IControllers/IEmpacotamentoController'; 

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/empacotamento', route);

  const ctrl = Container.get(config.controllers.empacotamento.name) as IEmpacotamentoController;

  //Create
  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        camiao: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/).required(),
        posicaoX: Joi.number().min(0).max(10).required(),
        posicaoY: Joi.number().min(0).max(20).required(),
        posicaoZ: Joi.number().min(0).max(8).required(),
      })
    }),
    (req, res, next) => ctrl.createEmpacotamento(req, res, next) );

  //Update
  route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        camiao: Joi.string().regex(/^(([A-Z]{2}-\d{2}-(\d{2}|[A-Z]{2}))|(\d{2}-(\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2})))$/),
        posicaoX: Joi.number().min(0).max(10),
        posicaoY: Joi.number().min(0).max(20),
        posicaoZ: Joi.number().min(0).max(8),
      }),
    }),
    (req, res, next) => ctrl.updateEmpacotamento(req, res, next) );


  //List
  route.get('',
    celebrate({
      body: Joi.object({
        id: Joi.string()
      }),
    }),
    (req, res, next) => ctrl.listEmpacotamento(req, res, next) );
    
};  