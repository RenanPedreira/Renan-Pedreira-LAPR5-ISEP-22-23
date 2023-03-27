import { Component, OnInit, ViewChild } from '@angular/core';
import { Camiao } from 'src/app/domain/camiao';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { CamiaoService } from '../../services/camiao.service';

@Component({
  selector: 'app-listar-camiao',
  templateUrl: './listar-camiao.component.html',
  styleUrls: ['./listar-camiao.component.css']
})
export class ListarCamiaoComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<Camiao>;
  displayedColumns: string[] = ['id', 'tara', 'cargaKg', 'cargaKWh', 'autonomia', 'tempoCarregamentoRapido', 'ativado'];

  constructor(private camiaoService: CamiaoService) { }

  camioes: Camiao[] = [];

  ngAfterViewInit(list: Camiao[]){
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.camiaoService.get().subscribe({
      next: camioes => {
        this.camioes = camioes;
        this.ngAfterViewInit(camioes);
      }
    })
  }



}