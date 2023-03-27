import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private path = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService) { }

  public signOutExternal = () => {
      localStorage.removeItem("token");
      console.log("token deleted");
  }

  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "LoginWithGoogle", JSON.stringify(credentials), { headers: header });
  }

  login(login:any): Observable<any>{
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(this.path + "Login", JSON.stringify(login), { headers: header , withCredentials:true});
  }

  getUserRolebyEmail(email: string): Observable<string>  {
    const url = `${this.path}getUserRolebyEmail/${email}`;
    return this.httpClient.get<string>(url).pipe(
      catchError(this.handleError<string>(`getUserRolebyEmail email=${email}`))
    ); 
  }

  /** Log a AuthService message with the MessageService */
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
}