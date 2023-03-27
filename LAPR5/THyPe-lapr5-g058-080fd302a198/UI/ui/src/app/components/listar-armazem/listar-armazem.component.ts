import { Component, OnInit, ViewChild } from '@angular/core';
import { ArmazemService } from '../../services/armazem.service';
import { Armazem } from 'src/app/domain/armazem';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-armazem',
  templateUrl: './listar-armazem.component.html',
  styleUrls: ['./listar-armazem.component.css']
})
export class ListarArmazemComponent implements OnInit {
  armazens: Armazem[] = [];
  selectedId: string = "";

  //@ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;
  //@ts-ignore
  dataSource: MatTableDataSource<Armazem>;
  displayedColumns: string[] = ['longitude', 'latitude', 'endereco', 'designacao', 'municipio', 'lojaId', 'cidadeNo'];

  constructor(private armazemService: ArmazemService) { }

  ngAfterViewInit(list: Armazem[]) {
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getArmazensAtivos();
  }

  getArmazensAtivos(){
    this.armazemService.getActiveArmazens().subscribe({
      next: armazens => {
        this.armazens = armazens;
        this.ngAfterViewInit(armazens);
      }
    })
  }

  inibirArmazem(){
    this.armazemService.getArmazemByLojaId(this.selectedId).subscribe({
      next: armazem => { 
        this.armazemService.deactivateArmazem(armazem.id)
        if(armazem){
          alert("O armazém foi inibido!");
          window.location.reload();
        }
      }
    });
  }
}
