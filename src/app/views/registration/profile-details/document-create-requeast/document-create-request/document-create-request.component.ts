import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AllCommonService } from '../../../services/common-service/all-common.service';
import { DocumentRaisedService } from '../../../services/document upload services/document-raised.service';
import { MatDialogService } from '../../../services/mat-service/mat-dialog.service';
// import { DocumentRaisedService } from '../services/document upload services/document-raised.service';
// import { MatDialogService } from '../services/mat-service/mat-dialog.service';

@Component({
  selector: 'app-document-create-request',
  templateUrl: './document-create-request.component.html',
  styleUrls: ['./document-create-request.component.scss']
})
export class DocumentCreateRequestComponent implements OnInit {

  
  requiredDocList: any;
  DocList: any;
  status: any;
  myForm: any;
  submitted: boolean = false
  
  documentraiseadservice: any;
  // rqmtCode: string = '';
  claimDetailsId: any;
  dataSource!: MatTableDataSource<unknown>;
  appCode: any;

  // myForm!:FormGroup;
  constructor( private dialogRef: MatDialogRef<DocumentCreateRequestComponent>,
   private documentraisedservice: DocumentRaisedService, private allCommonService:AllCommonService, private matDialogService: MatDialogService, private fb: FormBuilder, private router: Router) { }


  ngOnInit(): void {
    this.documentrequirementlist();
     
    this.myForm = this.fb.group({
      docvalue: ['', Validators.required]
    })
  }

  documentrequirementlist() {
    this.documentraisedservice.documentRequirementListdropdown().subscribe((res: any) => {
      console.log(res)
      this.DocList = res
    })
  }
 
  cancel(){
    localStorage.setItem("cancelPopup",'yes')
    this.dialogRef.close(true)
  }

  onSubmit() {

    console.log(this.myForm.value)
    this.allCommonService.setDocData(this.myForm.value.docvalue)
    this.submitted = true;
    this.appCode = localStorage.getItem('appcode')
    localStorage.setItem('documentAddedManually', 'true');
    if (this.myForm.valid && this.appCode != 'CI') {
      var mandatoryYn = 'N';
      var reqType = 'Manual';
      this.documentraisedservice.createNewRequirement(this.allCommonService.getClaimsDetailId(), this.myForm.value.docvalue, mandatoryYn, reqType
      ).subscribe((res: any) => {
        console.log("res>>>>", res)
        // this.refreshdata();
        
        this.allCommonService.refreshDocListSubject.next("this");
        this.matDialogService.openSuccessDialog('Success');
      })
      this.dialogRef.close(`${JSON.stringify(this.myForm.value)}`);

    }
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }


  // refreshdata() {
  //   this.documentraisedservice.fetchRaisedRequirements(this.claimsDetailId).subscribe((res: any) => {
  //     console.log(res)
  //     this.dataSource = new MatTableDataSource(res);
  //   })
  // }

}

