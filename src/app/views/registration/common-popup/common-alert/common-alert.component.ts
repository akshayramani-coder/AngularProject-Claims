import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { AllCommonService } from '../../services/common-service/all-common.service';
@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.scss']
})
export class CommonAlertComponent implements OnInit {
  allImpsRes: any;
  panData:any;
  bankData:any;
  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private allCommonService: AllCommonService,
    public dialogRef: MatDialogRef<CommonAlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    // var data = this.allCommonService.getImpsRes()
    // this.allImpsRes = data
    this.panData = this.allCommonService.getPanResponse();
    this.bankData = this.allCommonService.getBankValidation();
    // this.panData = data
  }
  public cancel() {
    this.close(false);
  }
  public close(value: any) {
    this.dialogRef.close(value);
  }
  public confirm() {
    // this.router.navigate(['/claims-intimation/new-claim-intimation']);

    this.close(true);
  }
  addNominee(){   

    this.close(true);
  }
  @HostListener("keydown.esc")
  public onEsc() {
    this.close(false);
  }
  public freezForm(){
    // this.close(true);
    this.dialogRef.close("Yes")
  }
  public cancelForm(){
    this.close(true);

  }
  removeNominee(){
    this.dialogRef.close("YES")
  }
  cancelNominee(){
    this.close(true);
  }
}

