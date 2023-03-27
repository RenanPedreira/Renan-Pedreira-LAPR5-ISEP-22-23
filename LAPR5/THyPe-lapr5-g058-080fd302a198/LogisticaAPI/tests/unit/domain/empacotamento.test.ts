/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import { Empacotamento } from "../../../src/domain/empacotamento/empacotamento";
import { EmpacotamentoCamiao } from "../../../src/domain/empacotamento/empacotamentoCamiao";
import { EmpacotamentoPosicaoX } from "../../../src/domain/empacotamento/empacotamentoPosicaoX";
import { EmpacotamentoPosicaoY } from "../../../src/domain/empacotamento/empacotamentoPosicaoY";
import { EmpacotamentoPosicaoZ } from "../../../src/domain/empacotamento/empacotamentoPosicaoZ";
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';

describe('Teste do agregado Empacotamento', () => {

    const empacotamentoID = "220909/1";
    const empacotamentoCamiao = "LU-13-LA";
    const empacotamentoPosicaoX = 0;
    const empacotamentoPosicaoY = 0;
    const empacotamentoPosicaoZ = 0;

    const camiaoInvalido = "BOZO-22-NARO";
    const posicaoXInvalida = -100;
    const posicaoYInvalida = 30;
    const posicaoZInvalida = -1;

    const empacotamentoCamiaoNovo = "LU-69-LU";
    const empacotamentoPosicaoXNova = 1;
    const empacotamentoPosicaoYNova = 1;
    const empacotamentoPosicaoZNova = 1;

    const empacotamento = Empacotamento.create({
        camiao: EmpacotamentoCamiao.create(empacotamentoCamiao).getValue(), 
        posicaoX: EmpacotamentoPosicaoX.create(empacotamentoPosicaoX).getValue(), 
        posicaoY: EmpacotamentoPosicaoY.create(empacotamentoPosicaoY).getValue(), 
        posicaoZ:EmpacotamentoPosicaoZ.create(empacotamentoPosicaoZ).getValue(),
    },new UniqueEntityID(empacotamentoID));

    //Testes Camião
    it('Camião válido pode ser criado', () => {
        const empacotamentoCamiaoValido = EmpacotamentoCamiao.create(empacotamentoCamiao);
        expect(true).to.equal(empacotamentoCamiaoValido.isSuccess);
    });
    it('Camião inválido não pode ser criado', () => {
        const empacotamentoCamiaoInvalido = EmpacotamentoCamiao.create(camiaoInvalido);
        expect(true).to.equal(empacotamentoCamiaoInvalido.isFailure);
    });

    //Testes Posição X
    it('Posição X válida pode ser criada', () => {
        const posicaoX = EmpacotamentoPosicaoX.create(empacotamentoPosicaoX);
        expect(true).to.equal(posicaoX.isSuccess);
    });
    it('Posição X inválida não pode ser criada', () => {
        const posicaoX = EmpacotamentoPosicaoX.create(posicaoXInvalida);
        expect(true).to.equal(posicaoX.isFailure);
    });

    //Testes Posição Y
    it('Posição Y válida pode ser criada', () => {
        const posicaoY = EmpacotamentoPosicaoY.create(empacotamentoPosicaoY);
        expect(true).to.equal(posicaoY.isSuccess);
    });
    it('Posição Y inválida não pode ser criada', () => {
        const posicaoY = EmpacotamentoPosicaoY.create(posicaoYInvalida);
        expect(true).to.equal(posicaoY.isFailure);
    });

    //Testes Posição Z
    it('Posição Z válida pode ser criada', () => {
        const posicaoZ = EmpacotamentoPosicaoZ.create(empacotamentoPosicaoZ);
        expect(true).to.equal(posicaoZ.isSuccess);
    });
    it('Posição Z inválida não pode ser criada', () => {
        const posicaoZ = EmpacotamentoPosicaoZ.create(posicaoZInvalida);
        expect(true).to.equal(posicaoZ.isFailure);
    });

    //Teste Empacotamento
    it('Empacotamento com atributos válidos pode ser criado', () => {
        const empacotamento = Empacotamento.create({
            camiao: EmpacotamentoCamiao.create(empacotamentoCamiao).getValue(), 
            posicaoX: EmpacotamentoPosicaoX.create(empacotamentoPosicaoX).getValue(), 
            posicaoY: EmpacotamentoPosicaoY.create(empacotamentoPosicaoY).getValue(), 
            posicaoZ:EmpacotamentoPosicaoZ.create(empacotamentoPosicaoZ).getValue(),
        },new UniqueEntityID(empacotamentoID));
        expect(true).to.equal(empacotamento.isSuccess);
    });

    //Testes Get
    it('Camião do empacotamento foi criado com sucesso', () => {
        expect(empacotamento.getValue().camiao.value).to.equal(empacotamentoCamiao);
    });
    it('Posição X do empacotamento foi criada com sucesso', () => {
        expect(empacotamento.getValue().posicaoX.value).to.equal(empacotamentoPosicaoX);
    });
    it('Posição Y do empacotamento foi criada com sucesso', () => {
        expect(empacotamento.getValue().posicaoY.value).to.equal(empacotamentoPosicaoY);
    });
    it('Posição Z do empacotamento foi criada com sucesso', () => {
        expect(empacotamento.getValue().posicaoZ.value).to.equal(empacotamentoPosicaoZ);
    });

    //Testes Set
    it('Camião do empacotamento pode ser atualizado para valor válido', () => {
        empacotamento.getValue().updateCamiao(EmpacotamentoCamiao.create(empacotamentoCamiaoNovo).getValue());
        expect(empacotamento.getValue().camiao.value).to.equal(empacotamentoCamiaoNovo);
    });
    it('Posição X do empacotamento pode ser atualizada para valor válido', () => {
        empacotamento.getValue().updatePosicaoX(EmpacotamentoPosicaoX.create(empacotamentoPosicaoXNova).getValue());
        expect(empacotamento.getValue().posicaoX.value).to.equal(empacotamentoPosicaoXNova);
    });
    it('Posição Y do empacotamento pode ser atualizada para valor válido', () => {
        empacotamento.getValue().updatePosicaoY(EmpacotamentoPosicaoY.create(empacotamentoPosicaoYNova).getValue());
        expect(empacotamento.getValue().posicaoY.value).to.equal(empacotamentoPosicaoYNova);
    });
    it('Posição Z do empacotamento pode ser atualizada para valor válido', () => {
        empacotamento.getValue().updatePosicaoZ(EmpacotamentoPosicaoZ.create(empacotamentoPosicaoZNova).getValue());
        expect(empacotamento.getValue().posicaoZ.value).to.equal(empacotamentoPosicaoZNova);
    });
});