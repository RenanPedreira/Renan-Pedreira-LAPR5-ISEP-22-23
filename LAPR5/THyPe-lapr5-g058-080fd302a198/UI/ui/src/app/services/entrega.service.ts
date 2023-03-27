import { Injectable } from '@angular/core';
import { Entrega } from '../domain/entrega';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  private entregasUrl = environment.apiUrl + '/Entregas';
  //private entregasByArmazemUrl = this.entregasUrl + '/entregasByArmazem/';
 // private entregasUrl = 'https://localhost:5001/api/Entregas';  // URL to web api
  private entregasByArmazemUrl = this.entregasUrl + '/entregasByArmazem/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** Log a EntregaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`${message}`);
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET entregas from the server */
  getEntregas(): Observable<Entrega[]> {
    return this.http.get<Entrega[]>(this.entregasUrl)
      .pipe(
        tap(_ => this.log('fetched entregas')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
      );
  }

  /** GET entrega by id. Will 404 if id not found */
  getEntrega(id: number): Observable<Entrega> {
    const url = `${this.entregasUrl}/${id}`;
    return this.http.get<Entrega>(url).pipe(
      tap(_ => this.log(`fetched entrega id=${id}`)),
      catchError(this.handleError<Entrega>(`getEntrega id=${id}`))
    );
  }

  getEntregasByArmazem(id: string): Observable<Entrega[]> {    
    return this.http.get<Entrega[]>(this.entregasByArmazemUrl + id)
      .pipe(
        tap(_ => this.log('')),
        catchError(this.handleError<Entrega[]>('getEntregas', []))
    );
  }

  /* getEntregas(){
    let entregaList: Entrega[] = [];
    this.http.get<Entrega[]>(this.entregasUrl)
      .pipe(
        tap(_ => this.log('Entregas: ')),
        catchError(this.handleError<Entrega[]>('getEntrega', []))
      ).subscribe({
        next: data=>{entregaList=data;
                     this.listEntregas(data);
      }});
  }

  listEntregas(list: Entrega[]){
    for(var c in list){
      this.log("------------------------------------");
      this.log("Data de entrega: "+list[c].dataEntrega);
      this.log("Massa de entrega: "+list[c].massaEntrega);
      this.log("Tempo de colocar: "+list[c].tempoColocar);
      this.log("Tempo de retirar: "+list[c].tempoRetirar);
    }
  } */

  /** POST: add a new entrega to the server */
  createEntrega(entrega: Entrega) {
    let id:string;

    this.http.post<Entrega>(this.entregasUrl, entrega, this.httpOptions)
    .pipe(catchError(this.handleError<Entrega>('createEntrega')))
    .subscribe({
      next: newEntrega=>{id = newEntrega.id;
                  this.log(`Created entrega w/ id=${newEntrega.id}`);
                  }
    });
  }  

  /** PUT: update the entrega on the server */
  updateEntrega(entrega: Entrega): Observable<any> {
    return this.http.put(this.entregasUrl, entrega, this.httpOptions).pipe(
      tap(_ => this.log(`updated entrega id=${entrega.id}`)),
      catchError(this.handleError<any>('updateEntrega'))
    );
  }

  /** DELETE: delete the entrega from the server */
  deleteEntrega(id: number): Observable<Entrega> {
    const url = `${this.entregasUrl}/${id}`;

    return this.http.delete<Entrega>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted entrega id=${id}`)),
      catchError(this.handleError<Entrega>('deleteEntrega'))
    );
  } 
}
