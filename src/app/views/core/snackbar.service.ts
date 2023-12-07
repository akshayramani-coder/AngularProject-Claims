import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar) {
  }

  error(message: string,type:string) {
    // ['snackbar-error']
    return this._snackBar.open(message, type, {
      duration: 10000,panelClass: ['snackbar-success']});
  }

  success(message: string,type:string) {
    return this._snackBar.open(message, type, { duration: 3000,panelClass: ['snackbar-success']});
  }

  info(message: string,type:string) {
    // ['snackbar-info']
    return this._snackBar.open(message, type, { duration: 3000,panelClass: ['snackbar-success']});
  }
}
