import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerService } from '../services/spinner/spinner.service'; 
import { finalize } from 'rxjs/operators';


@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  activeRequests = 0;
  constructor(private spinnerService: SpinnerService) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.spinnerService.apiPaths.has(request.url) || (request.url && this.spinnerService.apiPaths.has(request.url
      .split('?')[0]))) {
      return next.handle(request);
  }
    if (this.activeRequests === 0) {
      this.spinnerService.startLoading();
  }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(() => {
          this.activeRequests--;
          if (this.activeRequests === 0) {
              this.spinnerService.stopLoading();
          }
      })
  );
}
}
