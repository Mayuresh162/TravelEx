import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Time } from '@angular/common';
import { TriptypeData } from '../triptype/triptype.component';
import { TripdetailData } from '../tripdetails/tripdetails.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  from: string;
  to: string;
  depDate: Date;
  pickupTime: Time;
  pickupLoc: string;
  triptype: TriptypeData[]
  tripdetail: TripdetailData[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchTriptype();
    this.fetchTripdetail();
  }

  private fetchTriptype(){
    this.http.get<TriptypeData>('https://travelex-468dc.firebaseio.com/triptype.json')
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
      this.triptype = data;
      for(let i=0;i<this.triptype.length; i++){
        this.from = this.triptype[i].from;
        this.to = this.triptype[i].to;
        this.depDate = this.triptype[i].depDate;
      }
    })
  }

  private fetchTripdetail(){
    this.http.get<TripdetailData>('https://travelex-468dc.firebaseio.com/tripdetails.json')
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
      this.tripdetail = data;
      for(let i=0;i<this.tripdetail.length; i++){
        this.pickupLoc = this.tripdetail[i].pickupLoc;
        this.pickupTime = this.tripdetail[i].pickupTime;
      }
    })
  }

}
