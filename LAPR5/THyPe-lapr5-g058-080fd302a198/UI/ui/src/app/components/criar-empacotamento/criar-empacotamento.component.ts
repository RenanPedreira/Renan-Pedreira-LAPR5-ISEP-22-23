import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';


import { EmpacotamentoService } from '../../services/empacotamento.service';

@Component({
  selector: 'app-criar-empacotamento',
  templateUrl: './criar-empacotamento.component.html',
  styleUrls: ['./criar-empacotamento.component.css']
})

export class CriarEmpacotamentoComponent implements OnInit {

  constructor(private empacotamentoService: EmpacotamentoService, private ms: MessageService) { }

  ngOnInit(): void {
    this.ms.clear
  }


  add(id: string,
    camiao: string,
    posicaoX: string,
    posicaoY: string,
    posicaoZ: string): void {
    this.empacotamentoService.createEmpacotamento(id, camiao, posicaoX, posicaoY, posicaoZ);
  }

}
