import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  isLog: boolean;
  constructor(private logService: LoginService){}

  ngOnInit(){
    this.isLog = this.logService.isLogin;
  }

}
