import { Component, OnInit } from '@angular/core';

import { Armazem } from 'src/app/domain/armazem';
import { ArmazemService } from 'src/app/services/armazem.service';

@Component({
  selector: 'app-criar-armazem',
  templateUrl: './criar-armazem.component.html',
  styleUrls: ['./criar-armazem.component.css']
})
export class CriarArmazemComponent implements OnInit {

  constructor(private armazemService: ArmazemService) { }

  ngOnInit(): void {
  }

  add(longitude: string,
    latitude: string,
    endereco: string,
    designacao: string,
    municipio: string,
    lojaId: string,
    cidadeNo : string,
    altitude: string): void {
    lojaId = lojaId.trim();
    if (!lojaId) {
      return;
    }
    this.armazemService.createArmazem(longitude, latitude, endereco, designacao, municipio, lojaId, cidadeNo, altitude);
  }

  listArmazem() {
    this.armazemService.getActiveArmazens();
  }
}