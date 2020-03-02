import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

export interface AuthResponseData {
  email: string;
  phone: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authForm: FormGroup;

  constructor(private http: HttpClient,
              private router: Router,
              private logService: LoginService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'phone': new FormControl (null, [
        Validators.required,
        Validators.maxLength(10)
      ])
    });
  }

  onLogin() {
    this.http.post<AuthResponseData>('https://travelex-468dc.firebaseio.com/login.json', {
      email: this.authForm.value.email,
      phone: this.authForm.value.phone
    })
    .subscribe(responseData => {
      if(responseData){
        this.logService.isLogin = true;
        this.router.navigateByUrl('/triptype');
      }
    });
  }
}
