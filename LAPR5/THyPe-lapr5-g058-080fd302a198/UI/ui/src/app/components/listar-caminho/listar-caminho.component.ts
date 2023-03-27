import { Component, OnInit, ViewChild } from '@angular/core';
import { Rota } from 'src/app/domain/rota';
import { RotaService } from 'src/app/services/rota.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-caminho',
  templateUrl: './listar-caminho.component.html',
  styleUrls: ['./listar-caminho.component.css']
})
export class ListarCaminhoComponent implements OnInit {
  viagens: Rota[] = [];

  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<Rota>;
  displayedColumns: string[] = ['distancia', 'armazemOrigem', 'armazemDestino', 'tempoPercorrer', 'tempoCarregamento', 'tempoCarregamentoExtra'];

  constructor(private rotaService: RotaService) { }

  ngAfterViewInit(list: Rota[]){
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.rotaService.getRotas().subscribe({
      next: viagens => {
        this.viagens = viagens;
          this.ngAfterViewInit(viagens);
      }
    })
  }
}
