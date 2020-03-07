import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

export interface RegisterData {
  fullName: string;
  email: string;
  curAddress: string;
  phone: string;
  city: string;
  code: string;
  gender: number;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;

  constructor(private http: HttpClient,
              private router: Router,
              private logService: LoginService,
              private dialogRef: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
    this.regForm = new FormGroup({
      'fullName': new FormControl(null, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'curAddress': new FormControl(null, [
        Validators.required,
        Validators.maxLength(150)
      ]),
      'phone': new FormControl (null, [
        Validators.required,
        Validators.maxLength(10)
      ]),
      'city': new FormControl (null, [
        Validators.required,
      ]),
      'code': new FormControl (null, [
        Validators.required,
      ]),
      'gender': new FormControl (null, [
        Validators.required,
      ])
    });
  }

  onRegister() {
    this.http.post<RegisterData>('https://travelex-468dc.firebaseio.com/register.json', {
      fullName: this.regForm.value.fullName,
      email: this.regForm.value.email,
      curAddress: this.regForm.value.curAddress,
      phone: this.regForm.value.phone,
      city: this.regForm.value.city,
      pincode: this.regForm.value.code,
      gender: this.regForm.value.gender
    })
    .subscribe(responseData => {
      if(responseData){
        this.logService.isRegister = true;
        this.regForm.reset();
        this.dialogRef.close();
        this.router.navigateByUrl('/login');
      }
    });
  }
}
