import { Component, OnInit, ViewChild } from '@angular/core';
import { Conta } from 'src/app/domain/conta';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ContaService } from 'src/app/services/conta.service';

@Component({
  selector: 'app-inibir-conta',
  templateUrl: './inibir-conta.component.html',
  styleUrls: ['./inibir-conta.component.css']
})
export class InibirContaComponent implements OnInit {
  users: Conta[] = [];
  selectedEmail: string = "";

  //@ts-ignore
  @ViewChild('paginator') paginator: MatPaginator;
  //@ts-ignore
  dataSource: MatTableDataSource<Armazem>;
  displayedColumns: string[] = ['nome', 'telefone', 'role', 'email'];

  constructor(private contaService: ContaService) { }

  ngAfterViewInit(list: Conta[]) {
    this.dataSource = new MatTableDataSource(list);
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getUsersAtivos();
  }

  getUsersAtivos(){
    this.contaService.getActiveUsers().subscribe({
      next: users => {
        this.users = users;
        this.ngAfterViewInit(users);
      }
    })
  }

  inibirConta(){
    this.contaService.deactivateConta(this.selectedEmail);
  }
}
