import { Component, OnInit, NgZone } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

  password: string = "";
  showPassword = false;

  role: string = "";
  menu: string = "dashboard";

  private clientId = environment.clientId;
  invalidLogin!: false;


  constructor(
    private http: HttpClient,
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: this.clientId,
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large", width: "100%" }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => { });
    };
  }

  async handleCredentialResponse(response: CredentialResponse) {
    //debugger;
    await this.service.LoginWithGoogle(response.credential).subscribe(
      (x: any) => {
        //debugger;
        localStorage.setItem("token", x.token);

        this._ngZone.run(() => {
          this.router.navigate(["\dashboard"]);
        })
      },

      (error: any) => {
        console.log(error);
      }
    );
  }

  login(form: NgForm) {
    const credentials = {
      "email": form.value.email,
      "password": form.value.password
    }

    console.log(credentials.email);
    console.log(credentials.password);

    this.http.post("https://gestorarmazem.azurewebsites.net/api/Login", credentials).subscribe(response => {
      const token = (<any>response).token;
      localStorage.setItem("token", token);
      this.invalidLogin = false;

      this.service.getUserRolebyEmail(credentials.email).subscribe({
        next: role => {
          this.role = role;
          
          if(this.role == "Gestor de Armazém"){
            this.menu = "gestor-armazem";
          }
          if(this.role == "Gestor de Frota"){
            this.menu = "gestor-frota";
          }
          if(this.role == "Gestor de Logística"){
            this.menu = "gestor-logistica";
          }

          this._ngZone.run(() => {
            this.router.navigate([`${this.menu}`]);
          })
        }
      })

    }, (error: any) => {
      alert("Ocorreu um erro! \nEmail ou password incorretos.");
      console.log(error);
    }
    );
  }
}


