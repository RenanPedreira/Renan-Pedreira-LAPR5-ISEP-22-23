import { Component, OnInit, ViewChild } from '@angular/core';
import { Empacotamento } from 'src/app/domain/empacotamento';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


import { EmpacotamentoService } from '../../services/empacotamento.service';

@Component({
  selector: 'app-listar-empacotamento',
  templateUrl: './listar-empacotamento.component.html',
  styleUrls: ['./listar-empacotamento.component.css']
})
export class ListarEmpacotamentoComponent implements OnInit {
  
  @ViewChild('paginator') paginator: MatPaginator;
  dataSource: MatTableDataSource<Empacotamento>;
  displayedColumns: string[] = ['id', 'camiao', 'posicaoX', 'posicaoY', 'posicaoZ'];

  constructor(private empacotamentoService: EmpacotamentoService) { }

  empacotamentos: Empacotamento[] = []; 

  ngAfterViewInit(list: Empacotamento[]){
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.empacotamentoService.get().subscribe({
      next: empacotamentos => {
        this.empacotamentos = empacotamentos;
        this.ngAfterViewInit(empacotamentos);
      }
    })  
  }
}