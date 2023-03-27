import { SocialUser } from '@abacritt/angularx-social-login';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public userDetails = SocialUser;

  constructor(
    private router: Router,
    private service : AuthService,
    private _ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    
  }

 isUserAuthenticated(){
    var token: any = localStorage.getItem("token");
    if(token ){
      return true;
    
    }else{
      return false;
    }
  }
  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(() => {
    this.router.navigate(['/']).then(() => window.location.reload());
  })
    }
}

