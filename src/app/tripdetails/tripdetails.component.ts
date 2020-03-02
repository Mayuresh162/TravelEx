import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
import { AuthResponseData } from '../login/login.component';
import { map } from 'rxjs/operators';

export interface TripdetailData {
  email: string;
  phone: string;
  pickupTime: Time;
  pickupLoc: string;
}

@Component({
  selector: 'app-tripdetails',
  templateUrl: './tripdetails.component.html',
  styleUrls: ['./tripdetails.component.css']
})
export class TripdetailsComponent implements OnInit {
  tripDetForm: FormGroup;
  isLogged: boolean;
  loginData: AuthResponseData[];
  email: string;
  phone: string;

  constructor(private logService: LoginService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    // this.fetchLogin();
    this.isLogged = this.logService.isLogin;
    if(this.isLogged){
      this.fetchLogin();
    }
    this.tripDetForm = new FormGroup({
      'email': new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      'phone': new FormControl (null, [
        Validators.required,
        Validators.maxLength(10)
      ]),
      'pickupTime': new FormControl (null, [
        Validators.required
      ]),
      'pickupLoc': new FormControl (null, [
        Validators.required
      ])
    });
  }

  onProceed() {
    this.http.post<TripdetailData>('https://travelex-468dc.firebaseio.com/tripdetails.json', {
      email: this.tripDetForm.value.email,
      phone: this.tripDetForm.value.phone,
      pickupTime: this.tripDetForm.value.pickupTime,
      pickupLoc: this.tripDetForm.value.pickupLoc,
    })
    .subscribe(responseData => {
      if(responseData){
        this.router.navigateByUrl('/payment');
      }
    });
  }

  private fetchLogin(){
    this.http.get<AuthResponseData>('https://travelex-468dc.firebaseio.com/login.json')
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
      this.loginData = data;  
      for(let i=0; i< this.loginData.length; i++){
        this.email = this.loginData[i].email;
        this.phone = this.loginData[i].phone;
      }
    })
    // console.log(this.email, this.phone);
  }
}
