import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/views/claim-intimation/services/common.service';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogService } from '../../services/mat-service/mat-dialog.service';
import { CheckListComponent } from '../../check-list/check-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonAlertComponent } from '../../common-popup/common-alert/common-alert.component';
@Component({
  selector: 'app-remark',
  templateUrl: './remark.component.html',
  styleUrls: ['./remark.component.scss']
})
export class RemarkComponent implements OnInit {
  dialogCommonRef!: MatDialogRef<CommonAlertComponent>;
  appCode: any;
  ttskInstncId: any;
  tskBpmId: any;
  tskCode: any;
  remarkForm!: FormGroup;
  data: any;
  regSave: any;
  Remark: any = {};
  constructor(private commonService: CommonService,
    private allCommonService: AllCommonService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matDialogService: MatDialogService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode');
    this.createForm();
  }
  createForm() {
    this.remarkForm = this.fb.group({
      tskDcsnRmrks: [''],
    });

  }

  // fillChecklist(){
  //   if(this.remarkForm.valid){
  //     this.matDialogService.OpenChecklist();
  //     this.router.navigate(['/claims-registration/check-list'])
  //   }
  // }

  approveCR() {
    // this.regSave = localStorage.getItem('regSave');
    // console.log("regSave",this.regSave);
    // var docStatus = localStorage.getItem('docStatus')
    // if(this.regSave==null){
    //   this.matDialogService.openCommonDialog('Please Save the documents');
    // }else if(docStatus == 'true'){
    //   this.matDialogService.openCommonDialog('Document status is open');
    // }
    // else{
    this.allCommonService.commonSubmit();
    // this.allCommonService.docUploadCheck();
    var isNomneeValidated = this.allCommonService.getNomineeValidate();
    this.ttskInstncId = this.allCommonService.getTtskInstncId();
    this.tskBpmId = this.allCommonService.getTskBpmId()
    let isNomineeValidated = this.allCommonService.isNomneeValidated;
    if (this.appCode == 'CR' && isNomneeValidated) {  // NO CHANGE
      // localStorage.removeItem('nomineeDetails');

      this.allCommonService.setRemarkCR(this.remarkForm.value.tskDcsnRmrks);

      if (isNomineeValidated) {
        this.allCommonService.docValidation();
        this.allCommonService.docUploadCheck();
        // this.allCommonService.commonSubmit();

      }
      // var payload = {
      //   "tskInstncId": this.ttskInstncId,
      //   "taskBpmId": this.tskBpmId,
      //   "tskDcsnCode": "REG_ACCEPT",
      //   "tskDcsnRmrks": this.remarkForm.value.tskDcsnRmrks
      // }
      // this.commonService.approveCR(payload).subscribe((res: any) => {
      //   this.data = res;      
      //   if(this.data.status=='SUCCESS'||this.data.status=='success'){
      //     this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
      //     this.router.navigate(['/claims-registration'])
      //   }else{
      //     this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
      //   }
      // })
    }
    // }


  }

  rejectCR() {
    this.ttskInstncId = this.allCommonService.getTtskInstncId();
    this.tskBpmId = this.allCommonService.getTskBpmId()

    this.dialogCommonRef = this.dialog.open(CommonAlertComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: "Do you want to reject",
        type: 'editNomineeForm'

      },
    });
    this.dialogCommonRef.afterClosed().subscribe(data => {
      if (data == "Yes") {

        if (this.appCode == 'CR') {
          var payload = {
            "tskInstncId": this.ttskInstncId,
            "taskBpmId": this.tskBpmId,
            "tskDcsnCode": "REG_REJECT",
            "tskDcsnRmrks": this.remarkForm.value.tskDcsnRmrks
          }

          this.commonService.approveCR(payload).subscribe((res: any) => {
            this.data = res;
            // this.matDialogService.openAlertDialog('Reject')
            this.router.navigate(['/claims-registration/']);
            this.matDialogService.openAlertDialog('Rejected')
          })
        }

      }
    })
  }

  onCancelButton() {
    this.allCommonService.onCancelButton();
    localStorage.removeItem('nomineeDetails');
    localStorage.removeItem('nomineeDetailsId');
    localStorage.removeItem('claimTypeDisp');
    localStorage.removeItem('CheckList');
    localStorage.removeItem('validationResponse');
    localStorage.removeItem('checkDOcStatus');
    localStorage.removeItem('docData');
    localStorage.removeItem('cancelStatus');
    localStorage.removeItem('Remark');
    localStorage.removeItem('breCall');
  }
}
