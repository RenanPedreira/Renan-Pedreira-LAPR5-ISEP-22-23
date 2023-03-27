import { Component, OnInit } from '@angular/core';

import { CamiaoService } from '../../services/camiao.service';

@Component({
  selector: 'app-criar-camiao',
  templateUrl: './criar-camiao.component.html',
  styleUrls: ['./criar-camiao.component.css']
})
export class CriarCamiaoComponent implements OnInit {

  constructor(private camiaoService: CamiaoService) { }

  ngOnInit(): void {  }

  add(id: string,
      tara: string,
      cargaKg: string,
      cargaKWh: string,
      autonomia: string,
      tempoCarregamentoRapido: string): void {
    id = id.trim();

    if (!id || id.length!=8) {
       return; 
    }
    
    this.camiaoService.createCamiao(id, tara,cargaKg, cargaKWh, autonomia, tempoCarregamentoRapido);
  }
}