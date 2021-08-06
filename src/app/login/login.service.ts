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
    debugger;
    return this.http.post<any>(this.baseUrl + '/user/signin', { email: email, password: password })
      .pipe(map((user: any) => {
        if (user && user.error == false) {
          localStorage.setItem('access_token', user.token)
          this.currentUser = user;
          console.log(this.currentUser);
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
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  handleError(error: HttpHeaderResponse) {
    return throwError(error);
  }

}
