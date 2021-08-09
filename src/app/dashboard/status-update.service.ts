import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StatusUpdateService {
  baseUrl: string = environment.baseurl;

  constructor(private http: HttpClient) { }
  
  updateStatus(id:number) {
    return this.http.put<any>(this.baseUrl + '/document/approved/' + id, {})
      .pipe(map((document: any) => {
        return document;
      }),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpHeaderResponse) {
    return throwError(error);
  }
}
