import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AllCommonService } from '../common-service/all-common.service';
export interface RaiseRequirementRequest {
  claimsDetailId: string;
  rqmtCode: string;
  mandatoryYn:any;
  reqType:any;

}

@Injectable({
  providedIn: 'root'
})
export class DocumentRaisedService {
  policyNo: any;
  requirmentId:any;
  appCode: any;
  dataDoc: any;
  constructor(private http: HttpClient,private allCommonService:AllCommonService) { }

  setrequirmentId(Id:any) {
    this.requirmentId = Id;
    console.log(this.requirmentId);
  }

  getrequirmentId() {
    console.log(this.requirmentId);
    return this.requirmentId;
  }


  // Document List Display in Upload document components---//
  fetchRaisedRequirements(claimsDetailId: Number) {
    let documentRaisedUrl = environment.url.documentUpload + '/api/v1/requirements/raised-requirements/' + claimsDetailId;
    return this.http.get(documentRaisedUrl)
  }

  // Add Document By Select Dropdown in document create request components---//
  createNewRequirement(claimsDetailId: string, rqmtCode: string,mandatoryYn:any,reqType:any) {
    var raiseRequirementRequest = {} as RaiseRequirementRequest;
    raiseRequirementRequest.claimsDetailId = claimsDetailId;
    raiseRequirementRequest.rqmtCode = rqmtCode;
    raiseRequirementRequest.mandatoryYn = mandatoryYn,
    raiseRequirementRequest.reqType = reqType
   

    let documentcreateUrl = environment.url.documentUpload + '/api/v1/requirements/create'
    return this.http.post(documentcreateUrl, raiseRequirementRequest)
  }

  // Show Document List By Dropdown in document create request components---//
documentRequirementListdropdown() {
  let documentRequiredUrl = environment.url.documentUpload + '/api/v1/requirements'
  return this.http.get(documentRequiredUrl)
}

  // Document Choose/Select File---//
  uploadFile(fileList: File, documentId:String,claimsDetailId:any, docReqmtCode?:any) {
    this.dataDoc = this.allCommonService.geDocData();
    if(this.dataDoc==undefined || this.dataDoc==null){
      this.dataDoc = this.allCommonService.geDocReqmtCode();
    }
    this.appCode = localStorage.getItem('appcode')
    if (this.appCode != 'CI') {
      let getUploadFileUrl = environment.url.documentUpload + '/api/v1/documents/' + documentId
      let formData: FormData = new FormData();
      formData.append('file', fileList);
      formData.append('claimsDetailId', claimsDetailId);
      return this.http.post(getUploadFileUrl, formData);
    } else {
      let getUploadFileUrl = environment.url.documentUpload + '/api/v1/documents/' + this.dataDoc
      if(docReqmtCode){
        getUploadFileUrl = environment.url.documentUpload + '/api/v1/documents/' + docReqmtCode  // Get RqmtCode from M
      }
      let formData: FormData = new FormData();
      formData.append('file', fileList);
      formData.append('claimsDetailId', '0');
      return this.http.post(getUploadFileUrl, formData);
    }
  }



  documentstatus(data: any) {
    let documentstatusUrl = environment.url.documentUpload + '/api/v1/requirements/updateTransRequirement'
    return this.http.post(documentstatusUrl, data)
  }

  viewDocumentList(claimsDetailId: Number) {
    let vieDocURL = environment.url.documentUpload + '/api/v1/trans-doc/fetchDocument/' + claimsDetailId;
    return this.http.get(vieDocURL)
  }
  previewDoc(docId: Number) {
    let vieDocURL = environment.url.documentUpload + '/api/v1/documents/download/' + docId;
    return vieDocURL;
  }

  download(img,reqmName) {
    const imgUrl = img;
    console.log(img)
    const imgName = imgUrl.substr(imgUrl.lastIndexOf("/") + 1);
    console.log(imgName)
    this.http
      .get(imgUrl, { responseType: "blob" as "json" })
      .subscribe((res: any) => {
        const file = new Blob([res], { type: res.type });

        // IE
        // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        //   window.navigator.msSaveOrOpenBlob(file);
        //   return;
        // }

        const blob = window.URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = blob;
        link.download = reqmName ;

        // Version link.click() to work at firefox
        link.dispatchEvent(
          new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window
          })
        );

        setTimeout(() => {
          // firefox
          window.URL.revokeObjectURL(blob);
          link.remove();
        }, 100);
      });
  }
}