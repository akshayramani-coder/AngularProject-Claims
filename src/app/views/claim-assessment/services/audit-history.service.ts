import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditHistoryService {
  claimdetailID: any;

  constructor(
    private http:HttpClient
  ) { }


  getauditHistory(caseDetailID:Number){

    let getDataAuditHistory = environment.url.claimRegistration + '/api/v1/case-audit/get-case-audit/'+caseDetailID
    return this.http.get(getDataAuditHistory);
  }
  getTransactionHistory(policyID:any){

    let getDataTransactionHistory = environment.url.claimLaOds + '/api/v1/transaction/history/'+policyID
    http://localhost:8307/claims-la-ods/api/v1/transaction/history/02176056

    return this.http.get(getDataTransactionHistory);
  }
  getIIBHistory(claimdetailID,clientId) {

    let getDataIIBHistory = environment.url.claimCommonWeb + '/api/v1/iibDetails/iib-Details/' + claimdetailID + '/' + clientId;
    // let getDataIIBHistory = environment.url.claimCommonWeb + '/api/v1/iibDetails/iib-Details/136/132';
    //  http://localhost:8312/kli-claims-common-web/api/v1/iibDetails/iib-Details/136/132

    return this.http.get(getDataIIBHistory);

  }

}
