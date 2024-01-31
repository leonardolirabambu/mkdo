import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  #cockieservices= inject(CookieService);
  #router = inject(Router);
  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = req;

      if(!request.url.includes('/auth')){
        const token = localStorage.getItem('tokenmkdo');
        request = req.clone({
          setHeaders: {
            'x-api-key':token!
          }
        });
      }



      return next.handle(request);
    }

}
