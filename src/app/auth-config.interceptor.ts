import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable()
export class AuthConfigInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService,
    ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler) {
    // return next.handle(request);
    const authToken = this.loginService.getToken();
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(request);
  }
}
