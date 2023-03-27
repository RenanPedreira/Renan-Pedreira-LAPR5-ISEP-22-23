import { Component, OnInit } from '@angular/core';
import { Conta } from 'src/app/domain/conta';
import { MessageService } from 'src/app/services/message.service';

import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-listar-conta',
  templateUrl: './listar-conta.component.html',
  styleUrls: ['./listar-conta.component.css']
})
export class ListarContaComponent implements OnInit {

  constructor(private contaService: ContaService) { }

  contas: Conta[] = []; 

  ngOnInit(): void {
    this.contaService.get().subscribe({
      next: contas => {
        this.contas = contas;
      }
    })  
  }
}