import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl: string = environment.baseurl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  // isLoggedIn: boolean;

  constructor(private http: HttpClient,public router: Router) { }

  login(email: any, password: any) {
    return this.http.post<any>(this.baseUrl + '/user/signin', { email: email, password: password })
      .pipe(map((user: any) => {
        // debugger;
        if (user && user.error == false) {
          localStorage.setItem('token', user.token)
          localStorage.setItem('userType',user.userType)
          this.currentUser = user;
          // console.log(this.currentUser);
        return user;

        }
        else {
          return user
        }
      }),
        catchError(this.handleError)
      );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUserType(){
    return localStorage.getItem('userType');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  handleError(error: HttpHeaderResponse) {
    return throwError(error);
  }

}
