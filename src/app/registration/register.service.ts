import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl: string = environment.baseurl;

  constructor(private http: HttpClient) { }

  register(name: any,email: any,password: any) {
    debugger;
    return this.http.post<any>(this.baseUrl + '/user/signup', { name:name,email: email, password: password })
      .pipe(map(user => {
        return user;
      }),
      catchError(this.handleError)
      );
  }

  handleError(error: HttpHeaderResponse) {
      return throwError(error);
  }

}
