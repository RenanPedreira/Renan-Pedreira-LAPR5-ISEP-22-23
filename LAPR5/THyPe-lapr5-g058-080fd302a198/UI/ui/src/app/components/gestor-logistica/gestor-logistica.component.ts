import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-gestor-logistica',
  templateUrl: './gestor-logistica.component.html',
  styleUrls: ['./gestor-logistica.component.css']
})
export class GestorLogisticaComponent implements OnInit {

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
