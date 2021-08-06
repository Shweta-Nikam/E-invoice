import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
@Input() isloggedin: any;
  constructor( public router: Router) { }

  ngOnInit(): void {
  }
  // logout(){
  //   localStorage.clear(); 
  //   localStorage.removeItem('currentUser');
  //   const isLoggedin = false;
  //   this.router.navigate(['/login'])
  // .then(() => {
  //   window.location.reload();
  // });
  // }

}
