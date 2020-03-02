import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface PaymentData {
  cardNum: string;
  expDate: Date;
  cvv: number;
  name:string;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  payForm: FormGroup;

  constructor(private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
    this.payForm = new FormGroup({
      'cardNum': new FormControl(null, Validators.required),
      'expDate': new FormControl (null, Validators.required),
      'cvv': new FormControl (null, Validators.required),
      'name': new FormControl (null, Validators.required)
    });
  }

  onPay(){
    this.http.post<PaymentData>('https://travelex-468dc.firebaseio.com/payment.json', {
      cardNum: this.payForm.value.cardNum,
      expDate: this.payForm.value.expDate,
      cvv: this.payForm.value.cvv,
      name: this.payForm.value.name,
    })
    .subscribe(responseData => {
      if(responseData){
        this.router.navigateByUrl('/ticket');
      }
    });
  }
}
