
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialAuthService, FacebookLoginProvider, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  user: any;
  isSignedin!: Boolean ;
  
  constructor(
    private formBuilder: FormBuilder, 
    private router :Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });    
    
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.isSignedin = (user != null);
      console.log(this.user);
    });
  }

  facebookSignin(): void {
  
  this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
  .then((data)=>{
  localStorage.setItem('facebook_auth', JSON.stringify(data));
  this.router.navigateByUrl('/dashboard').then();
  console.log(localStorage)
  });
}



}