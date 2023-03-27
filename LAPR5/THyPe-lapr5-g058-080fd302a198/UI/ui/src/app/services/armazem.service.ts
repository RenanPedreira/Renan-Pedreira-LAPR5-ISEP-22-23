import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Armazem } from '../domain/armazem';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ArmazemService {

  private armazemUrl = environment.apiUrl + '/Armazens';
  //private armazemUrl = 'https://localhost:5001/api/Armazens';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  /** POST: add a new hero to the server */
  addArmazem(armazem: Armazem): Observable<Armazem> {
    return this.http.post<Armazem>(this.armazemUrl, armazem, this.httpOptions).pipe(
      tap((newArmazem: Armazem) => this.log(`Criado armazém com id=${newArmazem.id}`)),
      catchError(this.handleError<Armazem>('addArmazem'))
    );
  }

  addArmazemAlter(armazem: Armazem){

    let id:string;

    this.http.post<Armazem>(this.armazemUrl, armazem, this.httpOptions)
    .pipe(catchError(this.handleError<Armazem>('addArmazem')))
    .subscribe({
      next: data=>{id=data.id;
                  this.log("Criado Armazem= "+id);
                  }
    });
  }

  createArmazem(long: string,
    lat: string,
    endereco: string,
    designacao: string,
    municipio: string,
    lojaId: string,
    no: string,
    alt: string): void{
      
    let longitude = Number(long);
    let latitude = Number(lat);
    let cidadeNo = Number(no);
    let altitude = Number(alt);

    this.addArmazemAlter({ longitude, latitude, endereco, designacao, municipio, lojaId, cidadeNo, altitude} as Armazem);
  }

  /** GET armazens from the server */
  getArmazens(): Observable<Armazem[]> {
    return this.http.get<Armazem[]>(this.armazemUrl)
      .pipe(
        tap(_ => this.log('')),
        catchError(this.handleError<Armazem[]>('getArmazens', []))
      );
  }
 
  /* getArmazem(){

    let armazemList: Armazem[]=[];

    this.http.get<Armazem[]>(this.armazemUrl)
      .pipe(
        tap(_ => this.log('Armazens encontrados')),
        catchError(this.handleError<Armazem[]>('getArmazem', []))
      ).subscribe({
        next: data=>{armazemList=data;
                     this.listArmazens(data);
      }});

  }

  listArmazens(list: Armazem[]){
    for(var c in list){
      this.log("-----------------------------")
      this.log("Endereço: " + list[c].endereco);
      this.log("Cidade id: " + list[c].cidadeNo);
    }
  } */

  /** GET armazem by id. Will 404 if id not found */
  getArmazem(id: number): Observable<Armazem> {
    const url = `${this.armazemUrl}/${id}`;
    return this.http.get<Armazem>(url).pipe(
      tap(_ => this.log(`fetched armazem id=${id}`)),
      catchError(this.handleError<Armazem>(`getArmazem id=${id}`))
    );
  }

  /** GET only active armazéns */
  getActiveArmazens(): Observable<Armazem[]> {
    const url = `${this.armazemUrl}/active`;
    return this.http.get<Armazem[]>(url)
      .pipe(
        catchError(this.handleError<Armazem[]>('getActiveArmazens', []))
      );
  }

  /** GET armazém by loja id */
  getArmazemByLojaId(lojaId: string): Observable<Armazem> {
    const url = `${this.armazemUrl}/getByLojaId/${lojaId}`;
    console.log(url);
     return this.http.get<Armazem>(url).pipe(
      catchError(this.handleError<Armazem>(`getArmazem id=${lojaId}`))
    );
  }

  /** PUT: update the armazem on the server */
  updateArmazem(armazem: Armazem): Observable<any> {
    return this.http.put(this.armazemUrl, armazem, this.httpOptions).pipe(
      tap(_ => this.log(`updated armazem id=${armazem.id}`)),
      catchError(this.handleError<any>('updateArmazem'))
    );
  }

  /** Deactivate the armazém */
  deactivateArmazem(id: string) {
    const url = `${this.armazemUrl}/${id}`;
    this.http.patch(url, this.httpOptions)
    .subscribe({
        error: error => {
            console.error('There was an error!', error);
        }
    });
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

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`${message}`);
  }
}


  

 

   

 