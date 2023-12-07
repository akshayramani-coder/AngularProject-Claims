import { Component, ElementRef, OnInit, Inject } from '@angular/core';

import { SnackbarService } from 'src/app/views/core/snackbar.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentRaisedService } from '../services/document upload services/document-raised.service';
import { AllCommonService } from '../services/common-service/all-common.service';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { ResourceLoader } from '@angular/compiler';
// import { DocumentRaisedService } from '../services/document-upload-services/document-raised.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  // fileToUpload:File=null;
  result: string = "";
  policyNo: any = "";
  id: any;

  selectedFiles!: File;
  isSelected: boolean = false;
  invalidFileType = 0;
  clicked: boolean = false;
  documentId: any;
  claimsDetailId: any
  policyNumber: any;
  constructor(private documentuploadservice: DocumentRaisedService,
    private snackBar: SnackbarService,
    private allCommonService: AllCommonService,
    private matDialogService: MatDialogService,
    private dialogRef: MatDialogRef<DocumentUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public Matdata: {rqmtCode:string}) {
  }


  ngOnInit(): void {
    // this.uploadFiles();
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    this.documentId = this.allCommonService.geDocReqmtCode();
  }

  selectFiles(event: any) {
    this.selectedFiles = event.target.files[0];
    var fileName = this.selectedFiles.name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (!(extFile == "jpg" || extFile == "jpeg" || extFile == "pdf" || extFile == "png" || extFile == "tiff" || extFile == "tif")) {  // Added Extentions Based on Requirements --Vipul
      this.snackBar.error(this.warningMsg, 'close');
      this.isSelected = true;
      this.clicked = false;
      this.invalidFileType = 1;
      return;
    }
  }
  data:any;
  documentIds = new Array();
  uploadDocResult = new Array();
  warningMsg = "Please select only JPG/JPEG/PDF/PNG/TIFF files!'"
  uploadFiles() {
    // Prevented saving if extension not match
    var fileName = this.selectedFiles.name;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    console.log(extFile)
    if (!(extFile == "jpg" || extFile == "jpeg" || extFile == "pdf" || extFile == "png" || extFile == 'tiff' || extFile == "tif")) {
      this.snackBar.error(this.warningMsg, 'close');
      this.isSelected = true;
      this.clicked = false;
      this.invalidFileType = 1;
      return;
    }
    else{
    this.documentuploadservice.uploadFile(this.selectedFiles, this.documentId, this.claimsDetailId,this.Matdata.rqmtCode).subscribe((res => {
      console.log(':::::::::document raised', res);
      this.policyNumber = this.allCommonService.getProfileData()
      this.data = res   
      localStorage.setItem('docUplodeDate', this.data.upldDt)
      this.allCommonService.uploadDate(this.data.upldDt);
      let reqmId = this.data.reqId
      console.log(reqmId);
       this.uploadDocResult = JSON.parse(localStorage.getItem('uploadDoc')||'{}') ;
       this.documentIds = []
      this.documentIds = this.uploadDocResult[this.policyNumber] || []
      console.log(this.documentIds)
      let index = -1;
      for(let i = 0;i<this.documentIds.length;i++){
        if(this.documentIds[i].reqId == reqmId){
          console.log(i)
          index = i;
          break;
        }
      }
      if(index == -1){ 
      this.documentIds.push(this.data);
      }
      else{
        console.log("IN ELSE");

        this.documentIds[index] = this.data;
      }
      this.uploadDocResult[this.policyNumber] = this.documentIds;
      localStorage.setItem('uploadDoc', JSON.stringify(this.uploadDocResult));
      this.matDialogService.openSuccessDocumentupload('Success');
      this.dialogRef.close("OK");

    })
    )
  }
  }  
}

