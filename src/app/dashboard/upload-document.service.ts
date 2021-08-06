import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UploadDocumentService {
  baseUrl: string = environment.baseurl;

  constructor(private http: HttpClient) { }
  uploadFile(file:any) {
    debugger;
    console.log(file);
    return this.http.post<any>(this.baseUrl + '/document/', file)
      .pipe(map((document: any) => {
        alert("document uploaded successfully");
        
          return document;
      }),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpHeaderResponse) {
    return throwError(error);
  }
}
