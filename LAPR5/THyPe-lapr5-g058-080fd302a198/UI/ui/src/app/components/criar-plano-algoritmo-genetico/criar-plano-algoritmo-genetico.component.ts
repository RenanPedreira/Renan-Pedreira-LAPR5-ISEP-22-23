import { Component, OnInit } from '@angular/core';
import { PlanoGenetico } from 'src/app/domain/plano-genetico';
import { PlanoService } from 'src/app/services/plano.service';

@Component({
  selector: 'app-criar-plano-algoritmo-genetico',
  templateUrl: './criar-plano-algoritmo-genetico.component.html',
  styleUrls: ['./criar-plano-algoritmo-genetico.component.css']
})
export class CriarPlanoAlgoritmoGeneticoComponent implements OnInit {

  constructor(private planoService: PlanoService) {  }

  ngOnInit(): void {
  }
 
  add(rdata: string, rlimite: string, rtempo: string, rgeracoes: string, rpopulacao: string, rprobCruzamento: string, rprobMutacao:string): void {

    let date: number;
    let limite: number;
    let tempo: number;
    let geracoes: number;
    let populacao: number;
    let probCruzamento: number;
    let probMutacao: number;

    rdata = rdata.split('-').join('');
    date = Number(rdata);
    limite = Number(rlimite);
    tempo = Number(rtempo)
    geracoes = Number(rgeracoes);
    populacao = Number(rpopulacao);
    probCruzamento = Number(rprobCruzamento);
    probMutacao = Number(rprobMutacao);
    
    this.planoService.createPlanoGenetico({ date, limite, tempo, geracoes, populacao, probCruzamento, probMutacao } as PlanoGenetico);
  }
}