import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  public currentUser: any;
  isLoggedin: boolean = false;
  userdata: any;
  constructor(private http: HttpClient, private _formBuilder: FormBuilder,
    private loginService: LoginService,
    public router: Router,) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // this.userdata;
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // localStorage.setItem('token',JSON.stringify(this.userdata.token));

    if (this.currentUser) {
      this.router.navigate(['/dashboard']);

    }

    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  // onClickSubmit(data: any) {
  //   this.loginService.login(data.email, data.password);
  // }

  onClickSubmit(data: { email: any; password: any; }) {
    this.loginService.login(data.email, data.password)
      .subscribe(
        (userdata:any) => {
          this.currentUser =this.userdata;
          if(userdata && userdata.token){
            localStorage.setItem('token',userdata.token);
            localStorage.setItem('userType',userdata.result.userType)
          this.isLoggedin = true;
          this.loginService.headerManage.next(true);
          }
        //  console.log(this.userdata);
        //  console.log(this.isLoggedin);
          // alert("Login Successfully");
          let getToken = localStorage.getItem('token');
          let getuserType = localStorage.getItem('userType');
      
          if (getToken && getuserType == "requester") {
          this.router.navigate(['/dashboard']);
          }
          if (getToken && getuserType == "reviewer") {
            this.router.navigate(['/updateStatus']);
          }
        },
        (error) => {
          // alert(error.error.message);
        });
}
}
