import { Component, OnInit, ViewChild } from '@angular/core';
import { Plano } from 'src/app/domain/plano';
import { PlanoService } from 'src/app/services/plano.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Entrega } from 'src/app/domain/entrega';
import { Camiao } from 'src/app/domain/camiao';
import { Armazem } from 'src/app/domain/armazem';
import { CamiaoService } from 'src/app/services/camiao.service';

@Component({
  selector: 'app-listar-plano',
  templateUrl: './listar-plano.component.html',
  styleUrls: ['./listar-plano.component.css']
})
export class ListarPlanoComponent implements OnInit {
  
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<Plano>;
  displayedColumns: string[] = ['id', 'matricula', 'date', 'armazem', 'entrega'];
 
  constructor(private planoService: PlanoService, private camiaoService: CamiaoService) { }

  planos: Plano[] = [];
  entregas: Entrega[] = [];
  camioes: Camiao[] = [];
  armazens: Armazem[] = [];
  planosFiltered: Plano[] = [];

  selectedCamiao: string = "";
  parametro: number = 0;

  ngAfterViewInit(list: Plano[]){
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
  }
 
  ngOnInit(): void {
    this.planoService.getPlanos().subscribe({
      next: planos=> {
        this.planos = planos;
        this.ngAfterViewInit(planos);
        this.planosFiltered = planos;
      }
    })

    this.camiaoService.get().subscribe({
      next: camioes => {
        this.camioes = camioes;
      }
    })
  }

  filter(dataPlano: string) {
    let date: number = 0;

    if(dataPlano != null) {
      dataPlano = dataPlano.split('-').join('');
      date=Number(dataPlano);
    }

    if(this.selectedCamiao != "" && date == 0){
      this.planosFiltered=[];
      
      for(var plano of this.planos){
        if(plano.matricula==this.selectedCamiao){
          this.planosFiltered.push(plano);
        }
      }
    } else if(this.selectedCamiao == "" && date != 0) {
      this.planosFiltered=[];

      for(var plano of this.planos){
        if(plano.date == date){
          this.planosFiltered.push(plano);
        }
      }
    } else if(this.selectedCamiao != "" && date != 0) {
      this.planosFiltered=[];

      for(var plano of this.planos){
        if(plano.date == date && plano.matricula == this.selectedCamiao){
          this.planosFiltered.push(plano);
        }
      }
    }

    this.sortList();
    this.ngAfterViewInit(this.planosFiltered);
  }

  sortList() { 
    if(this.parametro == 1) {
      this.planosFiltered.sort(this.sortByData);
    }else if(this.parametro == 2){
      this.planosFiltered.sort(this.sortByMatricula);
    } //else if(this.parametro == 3){
    //   this.planosFiltered.sort(this.sortByTempoColocar);
    // }else if(this.parametro == 4) {
    //   this.planosFiltered.sort(this.sortByTempoRetirar);
    // }
  }

  sortByData(a: Plano, b: Plano) {
    if (a.date < b.date){
      return -1;
    }
    if (a.date > b.date){
      return 1;
    }
    return 0;
  }
  
  sortByMatricula(a: Plano, b: Plano) {
    if (a.matricula < b.matricula){
      return -1;
    }
    if (a.matricula > b.matricula){
      return 1;
    }
    return 0;
  }
} 