import { Component, OnInit } from '@angular/core';
import { EmpacotamentoService } from 'src/app/services/empacotamento.service';

@Component({
  selector: 'app-update-empacotamento',
  templateUrl: './update-empacotamento.component.html',
  styleUrls: ['./update-empacotamento.component.css']
})
export class UpdateEmpacotamentoComponent implements OnInit {

  constructor(private empacotamentoService: EmpacotamentoService) { }

  ngOnInit(): void {
  }

  update(id: string, camiao: string, posicaoX: string, posicaoY: string, posicaoZ: string): void {
    this.empacotamentoService.createEmpacotamento(id, camiao, posicaoX, posicaoY, posicaoZ);
  }
}
