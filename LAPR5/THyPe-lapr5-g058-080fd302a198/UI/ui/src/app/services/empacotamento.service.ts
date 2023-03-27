import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Empacotamento } from '../domain/empacotamento';
import { MessageService } from './message.service';

@Injectable({  providedIn: 'root'})

export class EmpacotamentoService {

  private empacotamentoUrl = 'https://penguin58.azurewebsites.net/api/empacotamento';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {}
  
  createEmpacotamento(
    id: string,
    camiao: string, 
    posX: string, 
    posY: string, 
    posZ: string): void{
      
    let posicaoX = Number(posX);
    let posicaoY = Number(posY);
    let posicaoZ = Number(posZ);

    if(this.validateData(camiao, posicaoX, posicaoY, posicaoZ)){
      this.addEmpacotamento({ id, camiao, posicaoX, posicaoY, posicaoZ } as Empacotamento);
    }
    else{
      this.log("Foram encontrados erros ao tentar criar o empacotamento.");
    }
  }

  validateData(camiao: string, 
    posicaoX: number, 
    posicaoY: number, 
    posicaoZ: number): boolean{

    let flag:boolean = true;
    
    if(camiao.length != 8){
      this.log("ERRO: Matrícula do camião incorreta.");
      flag=false;
    }

    if(posicaoX < 0 || posicaoX > 10){
      this.log("ERRO: Valor da posição X incorreta. Tem de ser entre 0 e 10.");
      flag=false;
    }

    if(posicaoY < 0 || posicaoY > 20){
      this.log("ERRO: Valor da posição Y incorreta. Tem de ser entre 0 e 20.");
      flag=false;
    }
    
    if(posicaoZ < 0 || posicaoZ > 8){
      this.log("ERRO: Valor da posição Z incorreta. Tem de ser entre 0 e 20.");
      flag=false;
    }
    
    return flag;
  }

  log(message: string) {
    this.messageService.add(message);
  }

  addEmpacotamento(empacotamento: Empacotamento){  
    this.http.post<Empacotamento>(this.empacotamentoUrl, empacotamento, this.httpOptions)
    .pipe(catchError(this.handleError<Empacotamento>('addEmpacotamento')))
    .subscribe({
      next: data=>{empacotamento.id = empacotamento.id;
                  this.log("Criado empacotamento da entrega "+ empacotamento.id);
                  }
    });
  }

  get(): Observable<Empacotamento[]> {
    return this.http.get<Empacotamento[]>(this.empacotamentoUrl)
      .pipe(
        tap(_ => this.log('')),
        catchError(this.handleError<Empacotamento[]>('getEmpacotamentos', []))
      );
  }

  list(list: Empacotamento[]){
    for(var c in list){
      this.log("-------------------------------");
      this.log("Entrega: "+list[c].id);
      this.log("Camião: "+list[c].camiao);
      this.log("Posição X: "+list[c].posicaoX);
      this.log("Posição Y: "+list[c].posicaoY);
      this.log("Posição Z: "+list[c].posicaoZ);
    }
  }

  getEmpacotamento(id: string): boolean {
    let exists:boolean = false;
    let empacotamentoList: Empacotamento[]=[];

    this.http.get<Empacotamento[]>(this.empacotamentoUrl)
      .pipe(
        tap(_ => this.log('Empacotamentos encontrados')),
        catchError(this.handleError<Empacotamento[]>('getEmpacotamento', []))
      ).subscribe({
        next: data=>{empacotamentoList=data;
      }});

    let flag: boolean = false;

    for(let i = 0; i < empacotamentoList.length; i++) {
      if(empacotamentoList[i].id = id) {
        flag = true;
        break;
      }
    }
    
    return flag;
  }

  updateEmpacotamento(id: string, camiao: string, posX: string, posY: string, posZ: string) {
    let posicaoX = Number(posX);
    let posicaoY = Number(posY);
    let posicaoZ = Number(posZ);

    if(this.getEmpacotamento(id)){

      if(this.validateData(camiao, posicaoX, posicaoY, posicaoZ)){
        this.http.put<Empacotamento>(this.empacotamentoUrl, { id, camiao, posicaoX, posicaoY, posicaoZ } as Empacotamento, this.httpOptions)
      .pipe(
        tap(_ => this.log('Empacotamento encontrado')),
        catchError(this.handleError<Empacotamento>('getEmpacotamento', ))
      ).subscribe({
        next: data=>{
          this.log("O empacotamento da entrega "+ id +" foi atualizado.")}});
      } else {
        this.log("Foram encontrados erros ao tentar atualizar o empacotamento.");
      }
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

}