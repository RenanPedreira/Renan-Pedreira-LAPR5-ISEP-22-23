import { Component, OnInit } from '@angular/core';
import { Entrega } from '../../domain/entrega';
import { EntregaService } from '../../services/entrega.service';
import { ArmazemService } from 'src/app/services/armazem.service';
import { Armazem } from 'src/app/domain/armazem';

@Component({
  selector: 'app-criar-entrega',
  templateUrl: './criar-entrega.component.html',
  styleUrls: ['./criar-entrega.component.css']
})
export class CriarEntregaComponent implements OnInit {
  armazens: Armazem[] = [];
  selectedId: string = "";

  constructor(private entregaService: EntregaService, private armazemService: ArmazemService) { }

  ngOnInit(): void {
    this.armazemService.getActiveArmazens().subscribe({
      next: armazens => {
        this.armazens = armazens;
      }
    })
  }

  add(dataEntrega: string,
    massa: string,
    tempoC: string,
    tempoR: string): void {

    this.selectedId = this.selectedId.trim();
    if (!this.selectedId) {
      return;
    }

    let massaEntrega = Number(massa);
    let tempoColocar = Number(tempoC);
    let tempoRetirar = Number(tempoR);
    dataEntrega = dataEntrega.replace(/-/g, '/');

    this.entregaService.createEntrega({ armazemId:this.selectedId, dataEntrega, massaEntrega, tempoColocar, tempoRetirar } as Entrega);
  }
}
