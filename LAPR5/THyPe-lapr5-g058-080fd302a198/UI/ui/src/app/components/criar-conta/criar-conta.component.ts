import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';

import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {
  
  selectedRole: string = "";
  password: string = "";
  showPassword = false;
  result :string = "";

  constructor(private contaService: ContaService, private ms: MessageService) { }
  
  ngOnInit(): void {
    this.ms.clear();
  }

  add(nome: string,
    email: string,
      telefone: string,
      password: string): void {
    
    const selectElement = document.querySelector('select');
    if (selectElement) {
      this.selectedRole = selectElement.value
    }
    
    this.result = this.contaService.createConta(nome, email,telefone,password, this.selectedRole);
  }
}