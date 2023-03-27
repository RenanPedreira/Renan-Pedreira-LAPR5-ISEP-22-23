import { Component, OnInit } from '@angular/core';
import { isNull } from 'cypress/types/lodash';
import { Armazem } from 'src/app/domain/armazem';
import { Entrega } from 'src/app/domain/entrega';
import { ArmazemService } from 'src/app/services/armazem.service';
import { EntregaService } from 'src/app/services/entrega.service';

@Component({
  selector: 'app-listar-entrega',
  templateUrl: './listar-entrega.component.html',
  styleUrls: ['./listar-entrega.component.css']
})
export class ListarEntregaComponent implements OnInit {
  entregas: Entrega[] = [];
  armazens: Armazem[] = [];
  entregasFiltered: Entrega[] = [];
  entregasArmazem: Entrega[] = [];
  selectedId: string = "";
  labelData: string = 'Data ';
  labelMassa: string= 'Massa ';
  labelTempoColocar: string = 'Tempo Colocar';
  labelTempoRetirar: string = 'Tempo Retirar';
  parametro: number = 0;
  

  constructor(private entregaService: EntregaService, private armazemService: ArmazemService) { }

  ngOnInit(): void {
    this.entregaService.getEntregas().subscribe({
      next: entregas => {
        this.entregas = entregas;
        this.entregasFiltered = entregas;
      }
    })
    this.armazemService.getArmazens().subscribe({
      next: armazens => {
        this.armazens = armazens;
      }
    })
  }

  filter(dataEntrega: string): any {

    let armazemDestino = this.selectedId.trim();

    if(dataEntrega!=null && armazemDestino==''){
      this.entregasFiltered = [];
      this.entregasArmazem = [];
      let data = dataEntrega.split("-").join("/");

      for(var entrega of this.entregas){
        if(entrega.dataEntrega==data){
          this.entregasFiltered.push(entrega);
        } 
      }

    } else if(dataEntrega==null && armazemDestino!=''){
      this.entregasFiltered = [];

      this.entregaService.getEntregasByArmazem(armazemDestino).subscribe({
        next: entregasArmazem => {
          this.entregasArmazem = entregasArmazem;
        }
      });

      for(var entrega of this.entregasArmazem){
        this.entregasFiltered.push(entrega);
      }

    } else if(dataEntrega!=null && armazemDestino!=''){
      this.entregasFiltered = [];
      let data = dataEntrega.split("-").join("/");

      this.entregaService.getEntregasByArmazem(armazemDestino).subscribe({
        next: entregasArmazem => {
          this.entregasArmazem = entregasArmazem;
        }
      });

      for(var entrega of this.entregasArmazem){
        if(entrega.dataEntrega==data){
          this.entregasFiltered.push(entrega);
        }
      }
    } 

    this.sortList();
  } 
  

  sortList() { 
      if(this.parametro == 1) {
        this.entregasFiltered.sort(this.sortByData);
      }else if(this.parametro == 2){
        this.entregasFiltered.sort(this.sortByMassa);
      }else if(this.parametro == 3){
        this.entregasFiltered.sort(this.sortByTempoColocar);
      }else if(this.parametro == 4) {
        this.entregasFiltered.sort(this.sortByTempoRetirar);
      }
  }

  sortByData(a: Entrega, b: Entrega) {
    if ( a.dataEntrega < b.dataEntrega ){
      return -1;
    }
    if ( a.dataEntrega > b.dataEntrega ){
      return 1;
    }
    return 0;
  }

  sortByMassa(a: Entrega, b: Entrega) {
    if ( a.massaEntrega < b.massaEntrega ){
      return -1;
    }
    if ( a.massaEntrega > b.massaEntrega ){
      return 1;
    }
    return 0;
  }

  sortByTempoColocar(a: Entrega, b: Entrega) {
    if ( a.tempoColocar < b.tempoColocar ){
      return -1;
    }
    if ( a.tempoColocar > b.tempoColocar ){
      return 1;
    }
    return 0;
  }

  sortByTempoRetirar(a: Entrega, b: Entrega) {
    if ( a.tempoRetirar < b.tempoRetirar ){
      return -1;
    }
    if ( a.tempoRetirar > b.tempoRetirar ){
      return 1;
    }
    return 0;
  }
}