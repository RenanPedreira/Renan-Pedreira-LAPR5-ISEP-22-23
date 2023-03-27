import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Camiao } from '../domain/camiao';
import { MessageService } from './message.service';
import { InibirCamiaoComponent } from '../components/inibir-camiao/inibir-camiao.component';

@Injectable({providedIn: 'root'})

export class CamiaoService {

  private camiaoUrl = 'https://penguin58.azurewebsites.net/api/camiao';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void {}


  addCamiaoAlter(camiao: Camiao){
    let matricula:string;
    this.http.post<Camiao>(this.camiaoUrl, camiao, this.httpOptions)
    .pipe(catchError(this.handleError<Camiao>('addCamião')))
    .subscribe({
      next: data=>{matricula=data.id;
                  this.log("Criado camião com matrícula= "+matricula);
                  }
    });
  }

  get(): Observable<Camiao[]> {
    return this.http.get<Camiao[]>(this.camiaoUrl)
      .pipe(
        tap(_ => this.log('')),
        catchError(this.handleError<Camiao[]>('getCamioes', []))
      );
  }

  getCamiao(){
    let camiaoList: Camiao[]=[];
    this.http.get<Camiao[]>(this.camiaoUrl)
      .pipe(
        tap(_ => this.log('Camiões encontrados')),
        catchError(this.handleError<Camiao[]>('getCamiao', []))
      ).subscribe({
        next: data=>{camiaoList=data;
                     this.listCamioes(data);
      }});
  }

  listCamioes(list: Camiao[]){
    for(var c in list){
      this.log("Matrícula: "+list[c].id);
    }
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
    this.messageService.add(message);
  }

  createCamiao(id: string,
    taraC: string,
    cargaKgC: string,
    cargaKWhC: string,
    autonomiaC: string,
    tempoCarregamentoRapidoC: string): void{

    let tara = Number(taraC);
    let cargaKg = Number(cargaKgC);
    let cargaKWh = Number(cargaKWhC);
    let autonomia = Number(autonomiaC);
    let tempoCarregamentoRapido = Number(tempoCarregamentoRapidoC);

    if(this.validateData(id, tara, cargaKg, cargaKWh, autonomia, tempoCarregamentoRapido)){
      this.addCamiaoAlter({ id, tara, cargaKg, cargaKWh, autonomia, tempoCarregamentoRapido} as Camiao);
    }
    else{
      this.log("Foram encontrados erros ao tentar criar o caminhão.");
    }

  }
  validateData(id: string,
    tara: number,
    cargaKg: number,
    cargaKWh: number,
    autonomia: number,
    tempoCarregamentoRapido: number): boolean{

    let flag:boolean = true;
    
    if(id.length!=8){
      this.log("ERRO: Matrícula deve seguir o modleo português.");
      flag=false;
    }

    if(tara<=0){
      this.log("ERRO: Tara deve ter um valor positivo.");
      flag=false;
    }
    if(cargaKg<=0){
      this.log("ERRO: Carga Kg deve ter um valor positivo.");
      flag=false;
    }
    if(cargaKWh<=0){
      this.log("ERRO: Carga KWh deve ter um valor positivo.");
      flag=false;
    }
    if(autonomia<=0){
      this.log("ERRO: Autonomia deve ter um valor positivo.");
      flag=false;
    }
    if(tempoCarregamentoRapido<=0){
      this.log("ERRO: Tempo de carregamento deve ter um valor positivo.");
      flag=false;
    }
    
    return flag;
  }

  inibirCamiao(selectedCamiao: Camiao) {
    this.http.patch<Camiao>(this.camiaoUrl, selectedCamiao, this.httpOptions)
    .pipe(catchError(this.handleError<Camiao>('addCamião')))
    .subscribe({
      next: data=>{ this.log("Camião inibido"); }
    });
  }
}
