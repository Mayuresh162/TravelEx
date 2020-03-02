import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TriptypeComponent } from './triptype/triptype.component';
import { BookingComponent } from './booking/booking.component';
import { TripdetailsComponent } from './tripdetails/tripdetails.component';
import { PaymentComponent } from './payment/payment.component';
import { TicketComponent } from './ticket/ticket.component';


const routes: Routes = [
  { path: '', redirectTo: '/triptype', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'triptype', component: TriptypeComponent},
  { path: 'booking', component: BookingComponent},
  { path: 'tripdetails', component: TripdetailsComponent},
  { path: 'payment', component: PaymentComponent},
  { path: 'ticket', component: TicketComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
