import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from '../login.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegisterComponent, RegisterData } from '../register/register.component';

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
  isRegistered: boolean;
  registerType: RegisterData[];
  email: string;
  phone: string;

  constructor(private http: HttpClient,
              private router: Router,
              private logService: LoginService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUser();
    if(this.logService.isRegister){
      this.isRegistered = true;
    }
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
    if(this.email == this.authForm.value.email && this.phone == this.authForm.value.phone) {
      this.http.post<AuthResponseData>('https://travelex-468dc.firebaseio.com/login.json', {
        email: this.authForm.value.email,
        phone: this.authForm.value.phone
      })
      .subscribe(responseData => {
        this.logService.isLogin = true;
        this.authForm.reset();
        this.router.navigateByUrl('/triptype');
      });
    } else {
      alert("Email does not exist kindly register");
      this.onCreate();
    }
}

  onCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  fetchUser(){
    this.http.get<RegisterData>('https://travelex-468dc.firebaseio.com/register.json')
    .pipe(
      map(responseData => {
        const postArray = [];
        for(const key in responseData) {
          if(responseData.hasOwnProperty(key)){
            postArray.push({ ...responseData[key], id: key});
          }
        }
        return postArray;
      })
    )
    .subscribe(data => {
      this.registerType = data;
      for(let i=0;i<this.registerType.length; i++){
        this.email = this.registerType[i].email;
        this.phone = this.registerType[i].phone;
      }
    })
  }
}
