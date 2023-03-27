/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import { Camiao } from "../../../src/domain/camiao/camiao";
import { CamiaoTara } from "../../../src/domain/camiao/camiaoTara";
import { CamiaoCargaKg } from "../../../src/domain/camiao/camiaoCargaKg";
import { CamiaoCargaKWh } from "../../../src/domain/camiao/camiaoCargaKWh";
import { CamiaoAutonomia } from "../../../src/domain/camiao/camiaoAutonomia";
import { CamiaoTempoCarregamentoRapido } from "../../../src/domain/camiao/camiaoTempoCarregamentoRapido";
import { UniqueEntityID } from '../../../src/core/domain/UniqueEntityID';
import { CamiaoAtivado } from '../../../src/domain/camiao/camiaoAtivado';

describe('Teste do agregado Camião', () => {

    //Valores válidos de criação
    const camiaoID = "77-EE-77";
    const camiaoTara = 3000;
    const camiaoCargaKg = 2000;
    const camiaoCargaKWh = 100;
    const camiaoAutonomia = 10;
    const camiaoTempoCarregamentoRapido = 60;
    const camiaoAtivo = true;

    //Valores inválidos de criação
    const camiaoTaraInvalida = -3000;
    const camiaoCargaKgInvalida = -2000;
    const camiaoCargaKWhInvalida = -100;
    const camiaoAutonomiaInvalida = -10;
    const camiaoTempoCarregamentoRapidoInvalido = -60;

    //Valores válidos de atualização
    const camiaoTaraNova = 2500;
    const camiaoCargaKgNova = 1500;
    const camiaoCargaKWhNova = 75;
    const camiaoAutonomiaNova = 9;
    const camiaoTempoCarregamentoRapidoNovo = 120;

    const camiao = Camiao.create({
        tara: CamiaoTara.create(camiaoTara).getValue(), 
        cargaKg: CamiaoCargaKg.create(camiaoCargaKg).getValue(), 
        cargaKWh: CamiaoCargaKWh.create(camiaoCargaKWh).getValue(), 
        autonomia:CamiaoAutonomia.create(camiaoAutonomia).getValue(), 
        tempoCarregamentoRapido: CamiaoTempoCarregamentoRapido.create(camiaoTempoCarregamentoRapido).getValue(),
        ativado: CamiaoAtivado.create(camiaoAtivo).getValue(),
    },new UniqueEntityID(camiaoID));


    //Testes Tara
    it('Tara válida pode ser criada', () => {
        const taraVálida = CamiaoTara.create(camiaoTara);
        expect(true).to.equal(taraVálida.isSuccess);
    });
    it('Tara inválida não pode ser criada', () => {
        const taraInválida = CamiaoTara.create(camiaoTaraInvalida);
        expect(true).to.equal(taraInválida.isFailure);
    });

    //Testes CargaKg
    it('CargaKg válida pode ser criada', () => {
        const cargaKgVálida = CamiaoCargaKg.create(camiaoCargaKg);
        expect(true).to.equal(cargaKgVálida.isSuccess);
    });
    it('CargaKg inválida não pode ser criada', () => {
        const cargaKgInválida = CamiaoCargaKg.create(camiaoCargaKgInvalida);
        expect(true).to.equal(cargaKgInválida.isFailure);
    });

    //Testes CargaKWh
    it('CargaKWh válida pode ser criada', () => {
        const cargaKWhVálida = CamiaoCargaKWh.create(camiaoCargaKWh);
        expect(true).to.equal(cargaKWhVálida.isSuccess);
    });
    it('CargaKWh inválida não pode ser criada', () => {
        const cargaKWhInválida = CamiaoCargaKWh.create(camiaoCargaKWhInvalida);
        expect(true).to.equal(cargaKWhInválida.isFailure);
    });

    //Testes Autonomia
    it('Autonomia válida pode ser criada', () => {
        const autonomiaVálida = CamiaoCargaKWh.create(camiaoAutonomia);
        expect(true).to.equal(autonomiaVálida.isSuccess);
    });
    it('Autonomia inválida não pode ser criada', () => {
        const autonomiaInválida = CamiaoAutonomia.create(camiaoAutonomiaInvalida);
        expect(true).to.equal(autonomiaInválida.isFailure);
    });

    //Testes Carregamento Rápido
    it('Carregamento Rápido válido pode ser criado', () => {
        const tempoCarregamentoRapidoVálido = CamiaoTempoCarregamentoRapido.create(camiaoTempoCarregamentoRapido);
        expect(true).to.equal(tempoCarregamentoRapidoVálido.isSuccess);
    });
    it('Carregamento Rápido inválido não pode ser criada', () => {
        const tempoCarregamentoRapidoInválido = CamiaoTempoCarregamentoRapido.create(camiaoTempoCarregamentoRapidoInvalido);
        expect(true).to.equal(tempoCarregamentoRapidoInválido.isFailure);
    });


    //Teste Camião
    it('Camião com atributos válidos pode ser criado', () => {
        const camiaoValido = Camiao.create({
            tara: CamiaoTara.create(camiaoTara).getValue(), 
            cargaKg: CamiaoCargaKg.create(camiaoCargaKg).getValue(), 
            cargaKWh: CamiaoCargaKWh.create(camiaoCargaKWh).getValue(), 
            autonomia:CamiaoAutonomia.create(camiaoAutonomia).getValue(), 
            tempoCarregamentoRapido: CamiaoTempoCarregamentoRapido.create(camiaoTempoCarregamentoRapido).getValue(),
            ativado: CamiaoAtivado.create(camiaoAtivo).getValue(),
        },new UniqueEntityID(camiaoID));
        expect(true).to.equal(camiaoValido.isSuccess);
    });

    //Testes Get
    it('Tara do camião foi criada com sucesso', () => {
        expect(camiao.getValue().tara.value).to.equal(camiaoTara);
    });
    it('CargaKg do camião foi criada com sucesso', () => {
        expect(camiao.getValue().cargaKg.value).to.equal(camiaoCargaKg);
    });
    it('CargaKWh do camião foi criada com sucesso', () => {
        expect(camiao.getValue().cargaKWh.value).to.equal(camiaoCargaKWh);
    });
    it('Autonomia do camião foi criada com sucesso', () => {
        expect(camiao.getValue().autonomia.value).to.equal(camiaoAutonomia);
    });
    it('Carregamento Rápido do camião foi criado com sucesso', () => {
        expect(camiao.getValue().tempoCarregamentoRapido.value).to.equal(camiaoTempoCarregamentoRapido);
    });

    //Testes Set
    it('Tara do camião pode ser atualizada para valor válido', () => {
        camiao.getValue().updateTara(CamiaoTara.create(camiaoTaraNova).getValue());
        expect(camiao.getValue().tara.value).to.equal(camiaoTaraNova);
    });
    it('CargaKg do camião pode ser atualizada para valor válido', () => {
        camiao.getValue().updateCargaKg(CamiaoCargaKg.create(camiaoCargaKgNova).getValue());
        expect(camiao.getValue().cargaKg.value).to.equal(camiaoCargaKgNova);
    });
    it('CargaKWh do camião pode ser atualizada para valor válido', () => {
        camiao.getValue().updateCargaKWh(CamiaoCargaKWh.create(camiaoCargaKWhNova).getValue());
        expect(camiao.getValue().cargaKWh.value).to.equal(camiaoCargaKWhNova);
    });
    it('Autonomia do camião pode ser atualizada para valor válido', () => {
        camiao.getValue().updateAutonomia(CamiaoAutonomia.create(camiaoAutonomiaNova).getValue());
        expect(camiao.getValue().autonomia.value).to.equal(camiaoAutonomiaNova);
    });
    it('Carregamento Rápido do camião pode ser atualizado para valor válido', () => {
        camiao.getValue().updateTempoCarregamentoRapido(CamiaoTempoCarregamentoRapido.create(camiaoTempoCarregamentoRapidoNovo).getValue());
        expect(camiao.getValue().tempoCarregamentoRapido.value).to.equal(camiaoTempoCarregamentoRapidoNovo);
    });
    

});