import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gestor-frota',
  templateUrl: './gestor-frota.component.html',
  styleUrls: ['./gestor-frota.component.css']
})
export class GestorFrotaComponent implements OnInit {

  constructor(
    private router: Router,
    private service : AuthService,
    private _ngZone: NgZone,
  ) {}

  ngOnInit(): void {
  }

  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(() => {
    this.router.navigate(['/']).then(() => window.location.reload());
    })
  }
}
