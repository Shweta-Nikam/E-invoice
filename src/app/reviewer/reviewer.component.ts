import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../registration/register.service';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.css']
})
export class ReviewerComponent implements OnInit {
  registerForm: FormGroup;
  data: any;
  constructor(private http: HttpClient, private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    public router: Router,) { 
      this.registerForm = this._formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        userType:['reviewer',Validators.required]
      });
    }

  ngOnInit(): void {
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      userType:['reviewer',Validators.required]
    });
  }


  onClickSubmit(data: { name: any; email: any; password: any;userType: any}) {
    // debugger;
    if (this.registerForm.valid) {
      this.registerService.register(data.name, data.email, data.password, data.userType)
        .subscribe(
          (userdata) => {
            console.log(userdata);
            // alert("register successfully");
          
              this.router.navigate(['/login']);
          },
          (error) => {
            // alert(error.error.message);
          });
    }
  }

}
