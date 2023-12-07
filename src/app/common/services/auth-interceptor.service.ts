import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  constructor(private loginService: LoginService, private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.loginService.user.pipe(
      take(1), exhaustMap((user:any) => {
        // debugger;
        if (!user) {
          return next.handle(req);
        }
        let modifiedReq;
        if (req.url == this.loginService.loginUrl) {
          modifiedReq = req;
        } else {
          modifiedReq = req.clone({
            headers: new HttpHeaders().set("Authorization", "Bearer " + user.token)
          });
        }
        return next.handle(modifiedReq).pipe(
          tap(() => { },
            (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status !== 401) {
                  return;
                }
                this.router.navigate(['/login']);
              }
            })

        );
      })
    )

  }


}
