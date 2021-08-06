import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  data: any;

  constructor(private http: HttpClient, private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    public router: Router,) {
      this.registerForm = this._formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
      });
  }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onClickSubmit(data: { name: any; email: any; password: any; }) {
    if (this.registerForm.valid) {
      debugger;
      this.registerService.register(data.name, data.email, data.password)
        .subscribe(
          (userdata) => {
            console.log(userdata);
            alert("register successfully");
          
              this.router.navigate(['/login']);
          },
          (error) => {
            alert(error.error.message);
          });
    }
  }
}
