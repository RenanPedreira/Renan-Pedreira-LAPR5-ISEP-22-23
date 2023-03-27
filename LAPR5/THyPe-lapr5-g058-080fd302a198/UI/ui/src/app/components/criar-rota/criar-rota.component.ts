import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { RotaService } from '../../services/rota.service';

@Component({
  selector: 'app-criar-rota',
  templateUrl: './criar-rota.component.html',
  styleUrls: ['./criar-rota.component.css']
})

export class CriarRotaComponent implements OnInit {

  constructor(private rotaService: RotaService, private ms: MessageService) { }

  ngOnInit(): void {
    this.ms.clear();
  }

  add(distancia: string, 
    armazemOrigem: string, 
    armazemDestino: string, 
    tempoPercorrer: string, 
    tempoCarregamento: string, 
    tempoCarregamentoExtra: string): void {
    this.rotaService.createRota(distancia, armazemOrigem, armazemDestino, tempoPercorrer, tempoCarregamento, tempoCarregamentoExtra);
  }

}
