import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let intRequest = request;
    const token = this.tokenService.getAccessToken();
    if (token != null) {
      intRequest = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(request);
  }
}
