import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RemarkComponent } from '../profile-details/remark/remark.component';
import { AllCommonService } from '../services/common-service/all-common.service';
import { RoleDetailsService } from '../services/common-service/role-details.service';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { CommonService } from 'src/app/views/claim-intimation/services/common.service';
import { lookupAdd } from 'src/app/urls/urls';
@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss']
})
export class CheckListComponent implements OnInit {

  checkListForm!: FormGroup
  appCode: any
  ChecklistDetails: any;
  checklist!: FormArray;
  checkListdata: any;
  queCode: any;
  queValue: any;
  payload: any;
  submitted = false;
  ttskInstncId: any;
  tskBpmId: any;
  data: any;
  remark: any;
  policyNumber: any;
  constructor(
    private roleDetailsService: RoleDetailsService,
    private allCommonService: AllCommonService,
    private router: Router,
    private fb: FormBuilder,
    private matDialogService: MatDialogService,
    private dialogRef: MatDialogRef<CheckListComponent>,
    private commonService: CommonService,
  ) { }

  get CheckListdata(): FormArray {
    return <FormArray>this.checkListForm.get('checklist');
  }

  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode');

    this.checkListForm = this.fb.group({
      checklist: this.fb.array([]),


    });

    this.getList();


  }

  get f(): {} {
    return this.checkListForm.controls;
  }

  get userFormGroups(): FormArray {
    return this.checkListForm.get('checklist') as FormArray;
  }

  checkListDataForm(data) {
    console.log("data is::", data)

    return this.fb.group({
      labelName: [data.queDesc],

      quesCode: [data.queCode],
      // label:[data.queCode]
      answers: [data.queValue, [Validators.required]],

      transQuestionId: [data.transQuestionId]
    })

  }

  addCheckList(contact) {
    this.CheckListdata.push(this.checkListDataForm(contact));
  }

  getList() {

    let payload = {

      "appCode": this.appCode,
      "claimDetailId": this.allCommonService.getClaimsDetailId(),
      // this.allCommonService.claimsDetailId(),
    }

    this.roleDetailsService.getCheckList(payload).subscribe((res: any) => {
      // this.roleDetailsService.setList(res);
      // console.log("tabDetails::::", res);

      this.ChecklistDetails = res;
      console.log("tab::::", this.ChecklistDetails);

      this.ChecklistDetails.forEach(element => {
        this.addCheckList(element);

        this.queCode = element.queCode;
      });

    })

  }

  approvalChange(event) {
    console.log(event.target.value)
  }

  saveCheckList(data) {
    if (this.appCode == 'CI') {
      this.submitted = true;
      console.log('datadatatat', data);

      var payloadArray = Array();
      console.log("Succuss")
      data.checklist.forEach((element: any) => {

        this.payload = {
          "transQuestionId": element.transQuestionId,
          "queCode": element.quesCode,
          "queValue": element.answers,
          "claimsDetailId": this.allCommonService.getClaimsDetailId(),
        }

        payloadArray.push(this.payload);
      })
      if (this.checkListForm.valid) {

        this.policyNumber = this.allCommonService.getProfileData()
        var payload = {
          "checkList": payloadArray
        }

        this.roleDetailsService.saveChecklist(payload).subscribe((res: any) => {
          this.roleDetailsService.setsaveCheckList(res);
          this.ChecklistDetails = res;
          console.log("tab::::", this.ChecklistDetails);

          let checkListObj = JSON.parse(localStorage.getItem('CheckList')|| '{}')
          checkListObj[this.policyNumber] = res


          this.ChecklistDetails.forEach(element => {
            this.addCheckList(element);

            this.queCode = element.queCode;
          });
          // this.matDialogService.savecheckList();
          this.dialogRef.close();
          this.router.navigate(['/claims-intimation/claim-profile'])
          localStorage.setItem('CheckList', JSON.stringify(checkListObj));
        })
      } else {

        this.matDialogService.errorcheckList();
        console.log("Error");
      }

    }
    else if (this.appCode == 'CR') {
      this.submitted = true;
      console.log('datadatatat', data);

      var payloadArray = Array();
      console.log("Succuss")
      data.checklist.forEach((element: any) => {

        this.payload = {
          "transQuestionId": element.transQuestionId,
          "queCode": element.quesCode,
          "queValue": element.answers,
          "claimsDetailId": this.allCommonService.getClaimsDetailId(),
        }

        payloadArray.push(this.payload);
      })
      if (this.checkListForm.valid) {
        var payload = {
          "checkList": payloadArray
        }

        this.roleDetailsService.saveChecklist(payload).subscribe((res: any) => {
          this.roleDetailsService.setsaveCheckList(res);
          this.ChecklistDetails = res;
          console.log("tab::::", this.ChecklistDetails);

          // this.ChecklistDetails.forEach(element => {
          //   this.addCheckList(element);

          //   this.queCode = element.queCode;
          // });
          // this.matDialogService.savecheckList();
          // this.allCommonService.commonSubmit();
          // this.remarkComponent.approveCR();

          // this.router.navigate(['/claims-intimation/claim-profile'])
          this.dialogRef.close();

          // this.matDialogService.registrationCompleted();
          // this.router.navigate(['/claims-registration'])
          localStorage.setItem('CheckList', JSON.stringify(res));
          this.ttskInstncId = this.allCommonService.getTtskInstncId();
          this.tskBpmId = this.allCommonService.getTskBpmId();
          var payload = {
            "tskInstncId": this.ttskInstncId,
            "taskBpmId": this.tskBpmId,
            "tskDcsnCode": "REG_ACCEPT",
            "tskDcsnRmrks":this.allCommonService.getRemarkCR(),
          }
          this.commonService.approveCR(payload).subscribe((res: any) => {
            this.data = res;
            if (this.data.status == 'SUCCESS' || this.data.status == 'success') {
              this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
              this.router.navigate(['/claims-registration'])
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
            } else {
              this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
            }
          })
            
        })
      } else {

        this.matDialogService.errorcheckList();
        console.log("Error");
      }
    }

  }


}

