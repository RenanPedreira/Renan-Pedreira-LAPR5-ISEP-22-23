import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Conta } from '../domain/conta';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class ContaService {

  private userUrl = environment.apiUrl + '/Users';
  private contaUrl = environment.apiUrl + '/Register';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  ngOnInit(): void { }

  addConta(conta: Conta): string {
    let email: string;
    this.http.post<Conta>(this.contaUrl, conta, this.httpOptions)
      .pipe(catchError(this.handleError<Conta>('addUser')))
      .subscribe(data => {
          email = data.email;
          alert("Criada nova conta de utilizador com sucesso!");
          this.log("Criado conta de utilizador com email= " + email);
        }
      );

    return conta.email;


  }

  get(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('')),
        catchError(this.handleError<Conta[]>('getContas', []))
      );
  }

  getConta() {
    let contaList: Conta[] = [];
    this.http.get<Conta[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('Contas encontradas')),
        catchError(this.handleError<Conta[]>('getConta', []))
      ).subscribe({
        next: data => {
          contaList = data;
          this.listContas(data);
        }
      });
  }

  listContas(list: Conta[]) {
    for (var c in list) {
      this.log("Email: " + list[c].email);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      alert("Ocorreu um erro!");

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  log(message: string) {
    this.messageService.add(message);
  }

  createConta(nomeCompleto: string,
    mail: string,
    telef: string,
    pass: string,
    tipoUser: string): string {

    let nome = String(nomeCompleto);
    let telefone = Number(telef);
    let role = String(tipoUser);
    let password = String(pass);
    let email = String(mail);


    return this.addConta({ nome, email, telefone, password, role } as Conta);
  }

  /** GET only active users */
  getActiveUsers(): Observable<Conta[]> {
    const url = `${this.userUrl}/active`;
    return this.http.get<Conta[]>(url)
      .pipe(
        catchError(this.handleError<Conta[]>('getActiveUsers', []))
      );
  }

  /** Deactivate the conta */
  deactivateConta(id: string) {
    const url = `${this.userUrl}/${id}`;
    this.http.patch(url, this.httpOptions)
      .subscribe(conta => {
        alert("A conta foi desativada!");
        window.location.reload();
      }, error => {
        alert("Ocorreu um erro!");
        console.error('There was an error!', error);
      }
    );
  }
}