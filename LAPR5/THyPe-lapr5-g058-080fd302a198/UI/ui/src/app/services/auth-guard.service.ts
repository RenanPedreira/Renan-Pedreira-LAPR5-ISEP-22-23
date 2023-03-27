/* import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ActivatedRouteSnapshot, CanActivate,Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{


constructor(private router: Router,private jwtHelper: JwtHelperService,private _ngZone: NgZone){

}

    canActivate(){
        const token = localStorage.getItem("token");

        if(token && !this.jwtHelper.isTokenExpired(token)){
            return true;
        }
        this._ngZone.run(() => {
            this.router.navigate(['/']).then(() => window.location.reload());
          })
          return false;
    }
    



} */