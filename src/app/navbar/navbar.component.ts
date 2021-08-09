import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input() isloggedin: any;
 show:Boolean=true;
  constructor( public router: Router,private loginService: LoginService) { }

  ngOnInit(): void {
  this.loginService.headerManage.subscribe(res=> {
    let token= localStorage.getItem('token');
    if(token){
      this.show=false;
    }
    else{
      this.show = true;
    }
  })
  }

  login(){
    this.router.navigate(['login']);
  }

  logout() {
    let removeToken = localStorage.removeItem('token');
    this.loginService.headerManage.next(true);
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
}
