/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable prettier/prettier */

import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';

import config from '../../../config';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import IEmpacotamentoService from '../../../src/services/IServices/IEmpacotamentoService';
import EmpacotamentoController from '../../../src/controllers/empacotamentoController';
import IEmpacotamentoDTO  from '../../../src/dto/IEmpacotamentoDTO';


describe('Testes ao Empacotamento Controller', function() {
  beforeEach(() => {
    let empacotamentoSchemaInstance = require("../../../src/persistence/schemas/empacotamentoSchema").default;
    Container.set("empacotamentoSchema", empacotamentoSchemaInstance);

    let empacotamentoRepoInstance = require('../../../src/repos/empacotamentoRepo').default;
    Container.set("EmpacotamentoRepo", empacotamentoRepoInstance);

    let empacotamentoServiceClass = require('../../../src/services/empacotamentoService').default;
    let empacotamentoServiceInstance = Container.get(empacotamentoServiceClass);
    Container.set("EmpacotamentoService", empacotamentoServiceInstance);
    });

  afterEach(() => {
    sinon.restore();
  });

  it('Cria um Empacotamento com certos atributos', async function() {

    let body = { id: 1, camiao: "FF-69-FF", posicaoX: 0, posicaoY: 0, posicaoZ: 0};
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let empacotamentoServiceInstance = Container.get(config.services.empacotamento.name);

    //Duplo
    const obj = sinon.stub(empacotamentoServiceInstance, 'createEmpacotamento').returns(
      Result.ok<IEmpacotamentoDTO>(req.body as IEmpacotamentoDTO));

    const ctrl = new EmpacotamentoController(empacotamentoServiceInstance as IEmpacotamentoService);
    await ctrl.createEmpacotamento(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(body));
  });

  it('Atualiza os atributos de um Empacotamento', async function () {
    let body = { id: 1, camiao: "FF-69-FF", posicaoX: 0, posicaoY: 0, posicaoZ: 0 };
    let req: Partial<Request> = {};
    req.body = body;
  
    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };
  
    let empacotamentoServiceInstance = Container.get(config.services.empacotamento.name);
  
    //Duplo
    const obj = sinon.stub(empacotamentoServiceInstance, 'updateEmpacotamento').returns(Result.ok<IEmpacotamentoDTO>(req.body as IEmpacotamentoDTO));
  
    const ctrl = new EmpacotamentoController(empacotamentoServiceInstance as IEmpacotamentoService);
    await ctrl.updateEmpacotamento(<Request>req, <Response>res, <NextFunction>next);
  
    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match({ id: 1, camiao: "FF-69-FF", posicaoX: 0, posicaoY: 0, posicaoZ: 0 }));
  });


  it('Lista um Empacotamento pelo id', async function () {
    let body = { id: "1", camiao: "FF-69-FF", posicaoX: 0, posicaoY: 0, posicaoZ: 0 };
    let req: Partial<Request> = {};
    req.body = { id: 1 }

    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };

    let empacotamentoServiceInstance = Container.get(config.services.empacotamento.name);

    //Duplo
    const obj = sinon.stub(empacotamentoServiceInstance, 'listEmpacotamento').returns(
      Result.ok<IEmpacotamentoDTO[]>([body] as IEmpacotamentoDTO[]));

    const ctrl = new EmpacotamentoController(empacotamentoServiceInstance as IEmpacotamentoService);
    await ctrl.listEmpacotamento(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(req.body));
  });

  it('Lista todos os Empacotamentos quando não especificado o id', async function () {
    let body = { id: "1", camiao: "FF-69-FF", posicaoX: 0, posicaoY: 0, posicaoZ: 0 };
    let req: Partial<Request> = {};
    req.body = { }

    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };

    let empacotamentoServiceInstance = Container.get(config.services.empacotamento.name);

    //Duplo
    const obj = sinon.stub(empacotamentoServiceInstance, 'listEmpacotamento').returns(
      Result.ok<IEmpacotamentoDTO[]>([body] as IEmpacotamentoDTO[]));

    const ctrl = new EmpacotamentoController(empacotamentoServiceInstance as IEmpacotamentoService);
    await ctrl.listEmpacotamento(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(req.body));
  });

});