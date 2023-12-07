import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
const apiPaths = new Map<string, any>([
],
);
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private loadings = false;
  private noShowAPIPaths: Map<string, boolean> = apiPaths;

  loadingStatus: Subject<boolean> = new Subject();

  get apiPaths(): Map<string, boolean> {
    return this.noShowAPIPaths;
  }

  get loading(): boolean {
    return this.loadings;
  }

  set loading(value) {
    this.loadings = value;
    this.loadingStatus.next(value);
  }

  startLoading() {
    this.loading = true;
  }

  stopLoading() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  hide() {
    this.loadingStatus.next(false);
  }
}
