/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import { Rota } from "../../../src/domain/rota/rota";
import { RotaArmazem } from "../../../src/domain/rota/rotaArmazem";
import { RotaDistancia } from "../../../src/domain/rota/rotaDistancia";
import { RotaTempoCarregamento } from "../../../src/domain/rota/rotaTempoCarregamento";
import { RotaTempoCarregamentoExtra } from "../../../src/domain/rota/rotaTempoCarregamentoExtra";
import { RotaTempoPercorrer } from "../../../src/domain/rota/rotaTempoPercorrer";
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

describe('Testes ao agregado Rota', () => {
    
    //dados válidos
    const rotaID = 1;
    const distancia = 40;
    const armazemOrigem = 1;
    const armazemDestino = 2;
    const tempoPercorrer = 1;
    const tempoCarregamento = 8;
    const tempoCarregamentoExtra = 0;

    //dados inválidos
    const rotaID_invalido = 2;
    const distancia_invalida = -1;
    const tempoPercorrer_invalido = -1;
    const tempoCarregamento_invalido = -1;
    const tempoCarregamentoExtra_invalido = -1;

    //Rota válida
    const rota = Rota.create({
        distancia: RotaDistancia.create(distancia).getValue(),
        armazemOrigem: RotaArmazem.create(armazemOrigem).getValue(),
        armazemDestino: RotaArmazem.create(armazemDestino).getValue(),
        tempoPercorrer: RotaTempoPercorrer.create(tempoPercorrer).getValue(),
        tempoCarregamento: RotaTempoCarregamento.create(tempoCarregamento).getValue(),
        tempoCarregamentoExtra: RotaTempoCarregamentoExtra.create(tempoCarregamentoExtra).getValue()
    }, new UniqueEntityID(rotaID));

    
    //Testes distância
    it('Distância válida é criada', () => {
        expect(rota.getValue().rotaDistancia.value).to.equal(distancia);
    });

    it('Distância inválida não é criada', () => {
        const rotaDistanciaInvalida = RotaDistancia.create(distancia_invalida);
        expect(true).to.equal(rotaDistanciaInvalida.isFailure);
    });

    //Testes TempoPercorrer
    it('Tempo válido é criado', () => {
        expect(rota.getValue().rotaTempoPercorrer.value).to.equal(tempoPercorrer);
    });

    it('Tempo inválido não é criado', () => {
        const rotaTempoInvalido = RotaTempoPercorrer.create(tempoPercorrer_invalido);
        expect(true).to.equal(rotaTempoInvalido.isFailure);
    });


    //Testes TempoCarregamento
    it('Tempo de Carregamento válido é criado', () => {
        expect(rota.getValue().rotaTempoCarregamento.value).to.equal(tempoCarregamento);
    });

    it('Tempo de Carregamento inválido não é criado', () => {
        const rotaCarregamentoInvalido = RotaTempoCarregamento.create(tempoCarregamento_invalido);
        expect(true).to.equal(rotaCarregamentoInvalido.isFailure);
    });


    //tempoCarregamentoExtra
    it('Tempo de Carregamento Extra válido é criado', () => {
        expect(rota.getValue().rotaTempoCarregamentoExtra.value).to.equal(tempoCarregamentoExtra);
    });

    it('Tempo de Carregamento Extra inválido não é criado', () => {
        const rotaCarregamentoExtraInvalido = RotaTempoCarregamento.create(tempoCarregamentoExtra_invalido);
        expect(true).to.equal(rotaCarregamentoExtraInvalido.isFailure);
    });


    //Testes Rota
    it('Criar Rota com dados válidos é bem sucedido', () => {
        expect(true).to.equal(rota.isSuccess);
    });

    it('Criar Rota com dados inválidos falha (ArmazémOrigem = ArmazemDestino)', () => {
        const rotaInvalida = Rota.create({
            distancia: RotaDistancia.create(0).getValue(),
            armazemOrigem: RotaArmazem.create(armazemOrigem).getValue(),
            armazemDestino: RotaArmazem.create(armazemOrigem).getValue(),
            tempoPercorrer: RotaTempoPercorrer.create(0).getValue(),
            tempoCarregamento: RotaTempoCarregamento.create(0).getValue(),
            tempoCarregamentoExtra: RotaTempoCarregamentoExtra.create(0).getValue()
        }, new UniqueEntityID(rotaID_invalido));

        expect(true).to.equal(rotaInvalida.isFailure);
    });
    
});
