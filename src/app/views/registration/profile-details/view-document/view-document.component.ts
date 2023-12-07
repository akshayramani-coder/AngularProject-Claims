import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentRaisedService } from '../../services/document upload services/document-raised.service';
import { DomSanitizer } from '@angular/platform-browser';
// import { ImageViewerComponent } from 'ngx-image-viewer';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  viewDocList: any;
  claimsDetailId: any;
  previewDoc: any;
  docView: any;
  documentListToDisplay = new Array();
  currentImgIndex: any;
  isPdf: any;
  documentUrl: any;
  // @ViewChild('imageViewer')
  // viewer: ImageViewerComponent;

  constructor(private dialogRef: MatDialogRef<ViewDocumentComponent>, private documentraisedservice: DocumentRaisedService,
    private allCommonService: AllCommonService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.docView = false;
    this.isPdf = true;
    this.documentView();
  }

  cancel() {
    this.dialogRef.close(true)
  }

  contentLoaded() {
    console.log("content Loaded")
  }

  documentView() {
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    this.documentraisedservice.viewDocumentList(this.claimsDetailId).subscribe((res: any) => {
      console.log(res)
      this.viewDocList = res;
    })
  }
   
  previrewDoc(documentId, fileName) {
    console.log(fileName);
    var fileExt = fileName.substring(fileName.indexOf('.') + 1).toLowerCase();;
    console.log(fileExt);
    //Image Viewver changed Conditions  --Vipul
    if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png") {
      this.isPdf = false
    } 
     else {
      this.isPdf = true
    }
    this.documentUrl = this.documentraisedservice.previewDoc(documentId);
    if(this.isPdf == false && !this.documentListToDisplay.includes(this.documentUrl)){ //insert only  Images --Vipul
    this.documentListToDisplay.push(this.documentUrl)
    }
    console.log(this.documentListToDisplay);
    
    this.docView = true;
  }

  downloadImage(id,list) {
    console.log(id) 
    console.log(list)
    this.documentraisedservice.download( this.documentraisedservice.previewDoc(id),list.reqName);
  }
}
