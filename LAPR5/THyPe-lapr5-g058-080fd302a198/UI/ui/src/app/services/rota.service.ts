import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Rota } from '../domain/rota';
import { MessageService } from './message.service';

@Injectable({  providedIn: 'root'})

export class RotaService {

  private rotaUrl = 'https://penguin58.azurewebsites.net/api/rota';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {}
  
  /** GET rotas from the server */
  getRotas(): Observable<Rota[]> {
    return this.http.get<Rota[]>(this.rotaUrl)
      .pipe(
        tap(_ => this.log('fetched rotas')),
        catchError(this.handleError<Rota[]>('getRotas', []))
      );
  }

  createRota(
    dist: string, 
    origem: string, 
    destino: string, 
    tempoPerc: string, 
    tempoCarr: string, 
    tempoCarrExtra: string): void{
      
    let distancia = Number(dist);
    let armazemOrigem = Number(origem);
    let armazemDestino = Number(destino);
    let tempoPercorrer = Number(tempoPerc);
    let tempoCarregamento = Number(tempoCarr);
    let tempoCarregamentoExtra = Number(tempoCarrExtra);

    let id: string;
  
    id = this.createID(armazemOrigem, armazemDestino);
    
    if(this.validateData(distancia, armazemOrigem, armazemDestino, tempoPercorrer, tempoCarregamento, tempoCarregamentoExtra)){
      this.addRota({ id, distancia, armazemOrigem, armazemDestino, tempoPercorrer, tempoCarregamento, tempoCarregamentoExtra } as Rota);
    }
    else{
      this.log("Foram encontrados erros ao tentar criar a rota.");
    }
  }

  validateData(distancia: number, 
    armazemOrigem: number, 
    armazemDestino: number, 
    tempoPercorrer: number, 
    tempoCarregamento: number, 
    tempoCarregamentoExtra: number): boolean{

    let flag:boolean = true;
    
    if(distancia <= 0){
      this.log("ERRO: Distancia deve ter um valor positivo.");
      flag=false;
    }

    if(armazemOrigem <= 0 || armazemOrigem >= 1000){
      this.log("ERRO: ID do armazém origem deve ter um valor entre 1 e 999.");
      flag=false;
    }

    if(armazemDestino <= 0 || armazemDestino >= 1000){
      this.log("ERRO: ID do armazém destino deve ter um valor entre 1 e 999.");
      flag=false;
    }
    
    if(armazemOrigem == armazemDestino){
      this.log("ERRO: O armazém de origem deve ser diferente do armazém destino.");
      flag=false;
    }

    if(tempoPercorrer <= 0){
      this.log("ERRO: Tempo deve ter um valor positivo.");
      flag=false;
    }
    
    if(tempoCarregamento < 0){
      this.log("ERRO: Tempo deve ter um valor positivo.");
      flag=false;
    }

    if(tempoCarregamentoExtra < 0){
      this.log("ERRO: Tempo deve ter um valor positivo.");
      flag=false;
    }
    
    return flag;
  }

  log(message: string) {
    this.messageService.add(`Rota criada: ${message}`);
  }

  addRota(rota: Rota){  
    this.http.post<Rota>(this.rotaUrl, rota, this.httpOptions)
    .pipe(catchError(this.handleError<Rota>('addRota')))
    .subscribe({
      next: data=>{rota.id = data.id;
                  this.log("Criado rota com ID = "+ rota.id);
                  }
    });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  createID(armazemOrigem: number, armazemDestino: number) : string {
    let orig: string;
    let dest: string;
    let id: string;

    if(armazemOrigem < 10){
        orig = '00' + armazemOrigem.toString();
    } else if(armazemOrigem >= 10 && armazemOrigem < 100){
      orig = '0' + armazemOrigem.toString();
    } else orig = armazemOrigem.toString();

    if(armazemDestino < 10){
      dest = '00' + armazemDestino.toString();
    }else if(armazemDestino >= 10 && armazemDestino < 100){
      dest = '0' + armazemDestino.toString();
    } else dest = armazemDestino.toString();
    
    id = "R" + orig + '-' + dest;

    return id;
  }
}