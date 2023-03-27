/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-angle-bracket-type-assertion */
/* eslint-disable prettier/prettier */

import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';

import config from '../../../config';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';

import ICamiaoService from '../../../src/services/IServices/ICamiaoService';
import CamiaoController from '../../../src/controllers/camiaoController';
import ICamiaoDTO  from '../../../src/dto/ICamiaoDTO';


describe('Camião controller', function() {
  beforeEach(() => {
    let camiaoSchemaInstance = require("../../../src/persistence/schemas/camiaoSchema").default;
    Container.set("camiaoSchema", camiaoSchemaInstance);

    let camiaoRepoInstance = require('../../../src/repos/camiaoRepo').default;
    Container.set("CamiaoRepo", camiaoRepoInstance);

    let camiaoServiceClass = require('../../../src/services/camiaoService').default;
    let camiaoServiceInstance = Container.get(camiaoServiceClass);
    Container.set("CamiaoService", camiaoServiceInstance);
    });

  afterEach(() => {
    sinon.restore();
  });

  it('Cria um camião com certos atributos', async function() {

    let body = { id: "FF-69-FF", tara: 7500, cargaKg: 4300, cargaKWh: 80, autonomia: 100,  tempoCarregamentoRapido: 60, ativado: true};
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let camiaoServiceInstance = Container.get(config.services.camiao.name);

    //Duplo
    const obj = sinon.stub(camiaoServiceInstance, 'createCamiao').returns(
      Result.ok<ICamiaoDTO>(req.body as ICamiaoDTO));

    const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);
    await ctrl.createCamiao(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(body));
  });

  it('Atualiza os atributos de um camião', async function () {
    let body = { id: "FF-69-FF", tara: 9500, cargaKg: 6300, cargaKWh: 90, autonomia: 90,  tempoCarregamentoRapido: 120, ativado: false};
    let req: Partial<Request> = {};
    req.body = body;
  
    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };
  
    let camiaoServiceInstance = Container.get(config.services.camiao.name);
  
    //Duplo
    const obj = sinon.stub(camiaoServiceInstance, 'updateCamiao').returns(Result.ok<ICamiaoDTO>(req.body as ICamiaoDTO));
  
    const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);
    await ctrl.updateCamiao(<Request>req, <Response>res, <NextFunction>next);
  
    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match({
        id: 'FF-69-FF',
        tara: 9500,
        cargaKg: 6300,
        cargaKWh: 90,
        autonomia: 90,
        tempoCarregamentoRapido: 120,
        ativado: false,
    }));
  });

  it('Lista um camião pela matrícula', async function () {
    let body = { id: "FF-69-FF", tara: 7500, cargaKg: 4300, cargaKWh: 80, autonomia: 100,  tempoCarregamentoRapido: 60};
    let req: Partial<Request> = {};
    req.body = { id: "FF-69-FF" }

    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };

    let camiaoServiceInstance = Container.get(config.services.camiao.name);

    //Duplo
    const obj = sinon.stub(camiaoServiceInstance, 'listCamiao').returns(
      Result.ok<ICamiaoDTO[]>([body] as ICamiaoDTO[]));

    const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);
    await ctrl.listCamiao(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(req.body));
  });

  it('Lista todos os camiões quando não especificada matrícula', async function () {
    let body = { id: "FF-69-FF", tara: 7500, cargaKg: 4300, cargaKWh: 80, autonomia: 100,  tempoCarregamentoRapido: 60};
    let req: Partial<Request> = {};
    req.body = { }

    let res: Partial<Response> = {
        json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };

    let camiaoServiceInstance = Container.get(config.services.camiao.name);

    //Duplo
    const obj = sinon.stub(camiaoServiceInstance, 'listCamiao').returns(
      Result.ok<ICamiaoDTO[]>([body] as ICamiaoDTO[]));

    const ctrl = new CamiaoController(camiaoServiceInstance as ICamiaoService);
    await ctrl.listCamiao(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(req.body));
  });

});