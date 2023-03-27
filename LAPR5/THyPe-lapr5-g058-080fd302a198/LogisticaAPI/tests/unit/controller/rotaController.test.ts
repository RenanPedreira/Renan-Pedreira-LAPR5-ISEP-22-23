import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IRotaService from "../../../src/services/IServices/IRotaService";
import RotaController from "../../../src/controllers/rotaController";
import IRotaDTO from '../../../src/dto/IRotaDTO';
import config from '../../../config';

describe('Teste ao Rota Controller', function () {
	beforeEach(function() {
        let rotaSchemaInstance = require("../../../src/persistence/schemas/rotaSchema").default;
        Container.set("rotaSchema", rotaSchemaInstance);

        let rotaRepoInstance = require("../../../src/repos/rotaRepo").default;
        Container.set("RotaRepo", rotaRepoInstance);

        // let rotaRepoClass = require("../../../src/repos/rotaRepo").default;
        // let rotaRepoInstance = Container.get(rotaRepoClass);
        // Container.set("RotaRepo", rotaRepoInstance);

        let rotaServiceClass = require("../../../src/services/rotaService").default;
        let rotaServiceInstance = Container.get(rotaServiceClass);
        Container.set("RotaService", rotaServiceInstance);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('Cria Rota e devolve json com os valores da nova rota', async function () {
        let body = {
            "id":1,
            "distancia":1,
            "armazemOrigem":1,
            "armazemDestino":2,
            "tempoPercorrer":20,
            "tempoCarregamento":1,
            "tempoCarregamentoExtra":0
        };

        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let rotaServiceInstance = Container.get("RotaService");

        //Duplo
		const obj = sinon.stub(rotaServiceInstance, "createRota").returns( Result.ok<IRotaDTO>(req.body as IRotaDTO));

		const ctrl = new RotaController(rotaServiceInstance as IRotaService);
		await ctrl.createRota(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(body));
	});

    it('ListRota filtra por armazém de origem e devolve json da rota', async function() {
        let body = {
            "id":1,
            "distancia":1,
            "armazemOrigem":1,
            "armazemDestino":2,
            "tempoPercorrer":20,
            "tempoCarregamento":1,
            "tempoCarregamentoExtra":0
        };
        
        let req: Partial<Request> = {};
        req.body = { armazemOrigem:"1"};

        let res: Partial<Response> = {
            json: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };
        let rotaServiceInstance = Container.get(config.services.rota.name);

        //Duplo 
        const obj = sinon.stub(rotaServiceInstance, "listRota").returns( Result.ok<IRotaDTO[]>([body] as IRotaDTO[]));

        const ctrl = new RotaController(rotaServiceInstance as IRotaService);
		await ctrl.listRota(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('ListRota filtra por armazém de destino e devolve json da rota', async function() {
        let body = {
            "id":1,
            "distancia":1,
            "armazemOrigem":1,
            "armazemDestino":2,
            "tempoPercorrer":20,
            "tempoCarregamento":1,
            "tempoCarregamentoExtra":0
        };
        
        let req: Partial<Request> = {};
        req.body = { armazemDestino:"2"};

        let res: Partial<Response> = {
            json: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };
        let rotaServiceInstance = Container.get(config.services.rota.name);

        //Duplo 
        const obj = sinon.stub(rotaServiceInstance, "listRota").returns( Result.ok<IRotaDTO[]>([body] as IRotaDTO[]));

        const ctrl = new RotaController(rotaServiceInstance as IRotaService);
		await ctrl.listRota(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('ListRota filtra pelos armazéns de origem e de destino e devolve json da rota', async function() {
        let body = {
            "id":1,
            "distancia":1,
            "armazemOrigem":1,
            "armazemDestino":2,
            "tempoPercorrer":20,
            "tempoCarregamento":1,
            "tempoCarregamentoExtra":0
        };
        
        let req: Partial<Request> = {};
        req.body = { armazénsOrigem:"1", armazemDestino:"2"};

        let res: Partial<Response> = {
            json: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };
        let rotaServiceInstance = Container.get(config.services.rota.name);

        //Duplo 
        const obj = sinon.stub(rotaServiceInstance, "listRota").returns( Result.ok<IRotaDTO[]>([body] as IRotaDTO[]));

        const ctrl = new RotaController(rotaServiceInstance as IRotaService);
		await ctrl.listRota(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    }); 
    
    it('ListRota lista os json de todas as rotas', async function() {
        let body = {
            "id":1,
            "distancia":1,
            "armazemOrigem":1,
            "armazemDestino":2,
            "tempoPercorrer":20,
            "tempoCarregamento":1,
            "tempoCarregamentoExtra":0
        };
        
        let req: Partial<Request> = {};
        req.body = { };

        let res: Partial<Response> = {
            json: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };
        let rotaServiceInstance = Container.get(config.services.rota.name);

        //Duplo 
        const obj = sinon.stub(rotaServiceInstance, "listRota").returns( Result.ok<IRotaDTO[]>([body] as IRotaDTO[]));

        const ctrl = new RotaController(rotaServiceInstance as IRotaService);
		await ctrl.listRota(<Request>req, <Response>res, <NextFunction>next);

        sinon.assert.calledOnce(obj);
        sinon.assert.calledWith(obj, sinon.match(req.body));
    });

    it('UpdateRota devolve o json da rota atualizada', async function() {
        let body = {
            "id":1,
            "distancia":1,
            "armazemOrigem":1,
            "armazemDestino":2,
            "tempoPercorrer":20,
            "tempoCarregamento":1,
            "tempoCarregamentoExtra":0
        };

        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sinon.spy(),
        };

        let next: Partial<NextFunction> = () => { };
        let rotaServiceInstance = Container.get(config.services.rota.name);

        //Duplo
		const obj = sinon.stub(rotaServiceInstance, "updateRota").returns(Result.ok<IRotaDTO>(req.body as IRotaDTO));

		const ctrl = new RotaController(rotaServiceInstance as IRotaService);
		await ctrl.updateRota(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match(body));
    });
});


// it('Cria Rota e devolve o código de sucesso (201)', async function () {

//     let body = {"id":1,
//                 "distancia":1,
//                 "armazemOrigem":1,
//                 "armazemDestino":2,
//                 "tempoPercorrer":20,
//                 "tempoCarregamento":1,
//                 "tempoCarregamentoExtra":0
//     };

//     let req: Partial<Request> = {};
// 	req.body = body;

//     let res: Partial<Response> = {
// 		status: sinon.spy()
//     };
// 	let next: Partial<NextFunction> = () => {};

// 	let rotaServiceInstance = Container.get("RotaService");

//     //Duplo
// 	const obj = sinon.stub(rotaServiceInstance, "createRota").returns( Result.ok<IRotaDTO>(req.body as IRotaDTO));

// 	const ctrl = new RotaController(rotaServiceInstance as IRotaService);
// 	await ctrl.createRota(<Request>req, <Response>res, <NextFunction>next);

// 	sinon.assert.calledOnce(res.status);
// 	sinon.assert.calledWith(res.status, 201);
// });

    // it('ListRota filtra por armazém de destino e devolve json da rota', async function() {
//     let body = {"id":1,
//                 "distancia":1,
//                 "armazemOrigem":1,
//                 "armazemDestino":2,
//                 "tempoPercorrer":20,
//                 "tempoCarregamento":1,
//                 "tempoCarregamentoExtra":0
//     };

//     let req: Partial<Request> = {};
//     req.body = { armazemDestino:"5"};

//     let res: Partial<Response> = {
//         status: sinon.spy(),
//     };

//     let next: Partial<NextFunction> = () => { };
//     let rotaServiceInstance = Container.get(config.services.rota.name);

//     //Duplo 
//     const obj = sinon.stub(rotaServiceInstance, "listRota").returns( Result.ok<IRotaDTO[]>([body] as IRotaDTO[]));

//     const ctrl = new RotaController(rotaServiceInstance as IRotaService);
// 	await ctrl.listRota(<Request>req, <Response>res, <NextFunction>next);

//     sinon.assert.calledOnce(res.status);
//     sinon.assert.calledWith(res.status, 404);
// });