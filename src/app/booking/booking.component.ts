import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import {MatTableDataSource} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  price: string;
  language: string;
  select: boolean
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Raju Rastogi', price: '15 Rs per km', language: 'Hindi', select: null},
  { name: 'Vinod Nair ', price: '18 Rs per km', language: 'Kannada', select: null},
  { name: 'Anil Kumar', price: '20 Rs per km', language: 'English', select: null},
]

export interface DriverData {
  name: string;
  price: string;
  language: string;
  select: null;
}

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookForm: FormGroup;
  driver: {name: string, price: string, language: string, select: null}[] = [];
  displayedColumns: string[] = ['name', 'price', 'language', 'select'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.storeDriver();
    this.bookForm = new FormGroup({
      'name': new FormControl(null, [
        Validators.required,
      ]),
      'price': new FormControl(null, [
        Validators.required,
      ]),
      'language': new FormControl(null, [
        Validators.required,
      ]),
      'select': new FormControl(null, [
        Validators.required,
      ])
    });
  }
  booking(){
    this.router.navigateByUrl('/tripdetails');
  }

  applyFilter(filterValue: string){
    this.dataSource = this.dataSource.filter((value) => {
      return value.language == filterValue;
    })
  }
  
  storeDriver(){
    this.http.post<DriverData>('https://travelex-468dc.firebaseio.com/login.json', ELEMENT_DATA)
    .subscribe(responseData => {
    });
  }
  
  // clearFilter() {
  //   this.dataSource = ELEMENT_DATA;
  // }
}
