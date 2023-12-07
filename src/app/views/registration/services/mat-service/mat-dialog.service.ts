import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { map } from 'rxjs/operators';
import { ConfirmPopupComponent } from '../../common-popup/confirm-popup/confirm-popup.component';
import { CommonAlertComponent } from '../../common-popup/common-alert/common-alert.component';
@Injectable({
  providedIn: 'root'
})
export class MatDialogService {

  dialogCommonRef!: MatDialogRef<ConfirmPopupComponent>;
  dialogServerRef!:MatDialogRef<CommonAlertComponent>;
  dialogSuccessRef!:MatDialogRef<CommonAlertComponent>;
  constructor(public dialog: MatDialog) { }

  openCommonDialog(msg: any) {
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: msg,
        // // type: type
        // message: "Are you sure wants to clear data?",
        type: 'confirmation'
      },
    });
  }
  openAlertDialog(msg: any) {
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: msg,
        // type: 
        // message: "Ae you sure wants to clear data?",
        type: 'alert'
      },
    });
  }
  openNomineeAlertDialog(msg: any) {
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: msg,
        // type: 
        // message: "Ae you sure wants to clear data?",
        type: 'Nomineealert'
      },
    });
  }
  public closeCommonDialog(): Observable<any> {
    return this.dialogCommonRef.afterClosed();
  }
  openCommonServerErrorPopup(msg: any) {
    this.dialogServerRef = this.dialog.open(CommonAlertComponent, {
      width: '560px',
      panelClass: 'serverErrorpopup',
      data: {
        message: msg,
        type: 'serverError',
      },
    });
  }
  public closeSeverDialog(): Observable<any> {
    return this.dialogServerRef.afterClosed();
  }
  openCommonSucessPopup(msg: any) {
    this.dialogServerRef = this.dialog.open(CommonAlertComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: msg,
        type: 'confirmation'
      },
    });
  }
  public closeSuccessDialog(): Observable<any> {
    return this.dialogSuccessRef.afterClosed();
  }
  openBankDetailsPopup(msg: any) {
    this.dialogServerRef = this.dialog.open(CommonAlertComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: msg,
        type: 'bankInformation'
      },
    });
  }
  public closeBankDetailsDialog(): Observable<any> {
    return this.dialogSuccessRef.afterClosed();
  }
  openNomineePopup(msg: any) {
    this.dialogServerRef = this.dialog.open(CommonAlertComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: "You Have Added Successfully Beneficiary",
        type: 'addNominee'
      },
    });
  }
  public closeNomineeDialog(): Observable<any> {
    return this.dialogSuccessRef.afterClosed();
  }

  openSuccessDialog(msg: any) {
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        // message: msg,
        // // type: type
        message: "You have added successfully document",
        type: 'confirmation'
      },
    });
    localStorage.setItem('documentAddedManually','true');
  }

  openSuccessDocumentupload(msg: any) {
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        // message: msg,
        // // type: type
        message: "You have added successfully document",
        type: 'confirmation'
      },
    });
    localStorage.setItem('documentAddedManually','true');
  }

  errorcheckList() {
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        // message: msg,
        // // type: type
        message: "Please fill the Process Checklist",
        type: 'confirmation'
      },
    });
  }

  OpenChecklist(){
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        // message: msg,
        // // type: type
        message: "Fill up Check List",
        type: 'confirmation'
      },
    });
  }

  savecheckList(){
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        // message: msg,
        // // type: type
        message: "Succuss",
        type: 'confirmation'
      },
    });
  }

  registrationCompleted(){
    this.dialogCommonRef = this.dialog.open(ConfirmPopupComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: "Registration Completed",
        type: 'confirmation'
      },
    });
  }
}