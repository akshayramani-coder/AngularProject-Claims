import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getCommonGroupService() {
    let commonGroupService = environment.url.claimAssesment + '/api/v1/task-details/group/TSK/N'
    return this.http.get(commonGroupService)
  }


  constructor(private http: HttpClient) { }
  // Claim Registration Task
  getAllWorkQueue() {
    let getAllWorkQueue = environment.url.claimRegistration + '/api/v1/task-details/REG_TSK/Y'
    return this.http.get(getAllWorkQueue);
  }
  // Claim Assessment Task
  getRefreshWorkQueue() {
    let getAllWorkQueue = environment.url.claimAssesment + '/api/v1/task-details/ASSESSMENT_TSK/N'
    return this.http.get(getAllWorkQueue);
  }
  // Claim Payout Task
  getClaimApproveRefreshWorkQueue() {
    let getAllWorkQueueClaimApprove = environment.url.claimPayout + '/api/v1/task-details/PAYOUT_TSK/N'
    return this.http.get(getAllWorkQueueClaimApprove);
  }

   // Claim Payout Task
   getPayout() {
    let getAllWorkQueue = environment.url.claimRegistration + '/api/v1/task-payout/PAYOUT_TSK/N'
    return this.http.get(getAllWorkQueue);
  }


  claimTask(taskBpmId) {
    let claimTaskUrl = environment.url.claimRegistration + '/api/v1/task-instnc/claims-task/' + taskBpmId
    return this.http.get(claimTaskUrl);
  }


  approveCR(data) {
    let approveCRUrl = environment.url.claimRegistration + '/api/v1/task-instnc/close-task'
    return this.http.post(approveCRUrl, data);
  }

  getClaimAmount(policyId) {
    let claimAmtUrl = environment.url.claimLaOds + '/api/v1/claim/claimAmount/' + policyId;
    return this.http.get(claimAmtUrl, policyId)
    // http://192.168.6.214:3000/claims-la-ods/api/v1/claim/claimAmount/02194252
  }
  Payoutclosetask(data) {
    let closePayoutUrl = environment.url.claimPayout + '/api/v1/task-details/close-task'
    return this.http.post(closePayoutUrl, data);
  }
}
