import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface TriptypeData {
  from: string;
  to: string;
  depDate: Date;
  returnDate:Date;
}

@Component({
  selector: 'app-triptype',
  templateUrl: './triptype.component.html',
  styleUrls: ['./triptype.component.css']
})
export class TriptypeComponent implements OnInit {
  triptypeForm : FormGroup
  minDate = new Date();
  maxDate = new Date(2020, 12, 31);
  isTick = false;

  constructor(private http: HttpClient,
              private router: Router,) { }

  ngOnInit(): void {
    this.triptypeForm = new FormGroup({
      'from': new FormControl(null),
      'to': new FormControl (null, Validators.required),
      'depDate' : new FormControl(null, Validators.required),
      'returnDate' : new FormControl(null, Validators.required)
    });
  }

  onTrip(){
    this.http.post<TriptypeData>('https://travelex-468dc.firebaseio.com/triptype.json', {
      from: 'Bangalore',
      to: this.triptypeForm.value.to,
      depDate: this.triptypeForm.value.depDate,
      returnDate: this.triptypeForm.value.returnDate,
    })
    .subscribe(responseData => {
      if(responseData){
        this.router.navigateByUrl('/booking');
      }
    });
  }

  onTick(){
    this.isTick = !this.isTick;
  }
}
