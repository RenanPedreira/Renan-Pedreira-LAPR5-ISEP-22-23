import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Plano } from '../domain/plano';
import { PlanoRequest } from '../domain/planorequest';
import { MessageService } from './message.service';
import { PlanoGenetico } from '../domain/plano-genetico';

@Injectable({providedIn: 'root'})

export class PlanoService {

  private planoUrl = 'https://penguin58.azurewebsites.net/api/plano';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {}

  createPlano(planoRequest: PlanoRequest){
    let matricula:string;
    let armazens:string[];
    let entregas:string[][];

    this.http.post<Plano>(this.planoUrl, planoRequest, this.httpOptions)
    .pipe(catchError(this.handleError<Plano>('createPlano')))
    .subscribe({
      next: data=>{matricula=data.matricula;
                  armazens=data.armazem;
                   entregas=data.entrega;
                   this.showPlano(matricula, armazens, entregas);
                  }
    });
  }

  createPlanoGenetico(planoGenetico: PlanoGenetico){
    let matricula:string;
    let armazens:string[];
    let entregas:string[][];


    this.http.post<Plano>(this.planoUrl+"/gen", planoGenetico, this.httpOptions)
    .pipe(catchError(this.handleError<Plano>('createPlanoGenetico')))
    .subscribe({
      next: data=>{ 
        matricula=data.matricula;
        armazens=data.armazem;
        entregas=data.entrega;
        this.showPlano(matricula, armazens, entregas);
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

  /** Log a CamiãoService message with the MessageService */
  log(message: string) {
    this.messageService.add(`${message}`);
  }

  private showPlano(camiao:string, armazens:string[], entregas:string[][]){
    this.log("Camião:  "+camiao);
    for(let arm=0; arm<armazens.length; arm++){
      this.log("  Armazem:  "+armazens[arm]);
      for(let ent=0; ent<entregas[arm].length; ent++){
        this.log("    Entrega:  "+entregas[arm][ent]); 
      }
      this.log("----------------------");
    }
  }

  getPlanos(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.planoUrl)
      .pipe(
        tap(_ => this.log('fetched planos')),
        catchError(this.handleError<Plano[]>('getPlanos', []))
      );
  }

  getPlanosByCamiao(): Observable<Plano[]> {
    return this.http.get<Plano[]>(this.planoUrl)
      .pipe(
        tap(_ => this.log('fetched planos')),
        catchError(this.handleError<Plano[]>('getPlanos', []))
      );
  }

}