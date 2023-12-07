import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {


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
  // Claim Approve Task
  getClaimApproveRefreshWorkQueue() {
    let getAllWorkQueueClaimApprove = environment.url.claimApproval + '/api/v1/task-details/APPROVAL_TSK/N'
    return this.http.get(getAllWorkQueueClaimApprove);
  }

  claimTask(taskBpmId) {
    let claimTaskUrl = environment.url.claimRegistration + '/api/v1/task-instnc/claims-task/' + taskBpmId
    return this.http.get(claimTaskUrl);
  }


  approveCR(data) {
    let approveCRUrl = environment.url.claimRegistration + '/api/v1/task-instnc/close-task'
    return this.http.post(approveCRUrl, data);
  }

  getClaimAmount(data) {
    let claimAmtUrl = environment.url.claimLaOds + '/api/v1/claim/claimAmount';
    return this.http.post(claimAmtUrl, data)
    // http://192.168.6.214:3000/claims-la-ods/api/v1/claim/claimAmount/02194252
  }
  Approvalclosetask(data) {
    let closeApprovalUrl = environment.url.claimApproval + '/api/v1/task-details/close-task'
    return this.http.post(closeApprovalUrl, data);
  }
  referBack(data) {
    let closeApprovalUrl = environment.url.claimApproval + '/api/v1/task-details/refer-back'
    return this.http.post(closeApprovalUrl, data);
  }
  Payoutclosetask(data) {
    let closePayoutUrl = environment.url.claimPayout + '/api/v1/task-details/close-task'
    return this.http.post(closePayoutUrl, data);
  }

  getReferralUsers(referralUser: any) {

    let getDataReferralUsers = environment.url.claimReferral + '/api/v1/referral/' + referralUser;
    return this.http.get(getDataReferralUsers);
  }
  getReferralDecisions(claimDetailID){
    let getreferralDecision = environment.url.claimReferral + '/api/v1/referral-details/referral/' + claimDetailID;
    return this.http.get(getreferralDecision);
  }
  getReferralComments(taskCode, claimsDetailId){
    let getreferralComments = environment.url.claimReferral + `/api/v1/referral-details/referral-comment/${taskCode}/${claimsDetailId}`;
    return this.http.get(getreferralComments);
    // http://localhost:8318/kli-claims-referral/api/v1/referral-details/referral-comment/REFERRAL_TYPE_UW_OPINION/LO7447
  }
  getCommonGroupService(){
    let commonGroupService = environment.url.claimAssesment + '/api/v1/task-details/group/TSK/N'
    return this.http.get(commonGroupService)
  }
 
  getDropdowns(){
    let dropdownsUrl = environment.url.claimCommonWeb + '/api/v1/user-reass-dtls/';
    return this.http.get(dropdownsUrl);
    // http://localhost:8312/kli-claims-common-web/api/v1/user-reass-dtls/
  }
  
  getUserWorkques(taskCode, user){
    let workque = environment.url.claimCommonWeb + `/api/v1/user-reass-dtls/reassign/${taskCode}/${user}`;
    return this.http.get(workque);
    // http://localhost:8312/kli-claims-common-web/api/v1/user-reass-dtls/reassign/PAYOUT_TSK/LO7447
  }
  assignCases(data){
    let reAssignmentApi =environment.url.claimCommonWeb + '/api/v1/user-reass-dtls/reassign-case';
    return this.http.post(reAssignmentApi, data)
    // http://localhost:8312/kli-claims-common-web/api/v1/user-reass-dtls/reassign-case
  }
  getUserComment(claimsDetailId){
    let userCommentApi=environment.url.claimCommonWeb + '/api/v1/audit-details/audit-dtl/'+claimsDetailId;
    return this.http.get(userCommentApi)
  }
}
