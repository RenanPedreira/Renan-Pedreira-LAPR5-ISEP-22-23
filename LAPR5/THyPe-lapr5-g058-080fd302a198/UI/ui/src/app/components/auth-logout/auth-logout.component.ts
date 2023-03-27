import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.css']
})
export class AuthLogoutComponent implements OnInit{

  constructor(private router: Router,
    private service: AuthService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
  }

  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then(() => window.location.reload());
    })
  }
}
