import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AllCommonService } from './all-common.service';
import { PolicyService } from './policy.service';

@Injectable({
  providedIn: 'root'
})
export class RoleDetailsService {
  policyNo: any;
  claimDetailsId: any;
  appCode: any;
  nomineedata: any;
  checkList: any;
  saveList: any;
  constructor(private http: HttpClient, private policyService: PolicyService, private allcommonService: AllCommonService) { }

  setnomineeData(data: any) {
    this.nomineedata = data;
  }

  getnomineeData() {
    console.log( this.nomineedata)
    return this.nomineedata;
  }

  setList(listdata: any) {
    this.checkList = listdata;
  }
  getList() {
    return this.checkList;
  }

  setsaveCheckList(data: any) {
    this.saveList = data
  }

  getsaveCheckList() {
    return this.saveList
  }

  getroleDetails() {
    this.appCode = localStorage.getItem('appcode')
    if (this.appCode == 'CI') { //NOT CR TO CI
      var claimData = this.allcommonService.getProfileData();
      this.policyNo = claimData;
    } else {
      this.policyNo = this.allcommonService.getCRClaimData();;
    }

    let roleDetailsUrl = environment.url.intimation + '/api/v1/intimation/policy-by-policyno/' + this.policyNo;
    return this.http.get(roleDetailsUrl)
  }

  getNomineeDetails() {
    this.claimDetailsId = this.allcommonService.getClaimsDetailId();
    let nomineeDetailsUrl = environment.url.claimRegistration + '/api/v1/claim-details/all-nominee-by-claimsDetailId/' + this.claimDetailsId;
    return this.http.get(nomineeDetailsUrl);
  }


  getClaimList() {
    this.claimDetailsId = this.allcommonService.getClaimsDetailId();
    let coverageDetailsUrl = environment.url.claimRegistration + '/api/v1/task-instnc/coverage-detail/' + this.claimDetailsId;
    return this.http.get(coverageDetailsUrl);
  }

  closetask(request) {
    // this.claimDetailsId = this.allcommonService.getClaimsDetailId();
    let closeTaskUrl = environment.url.claimAssesment + '/api/v1/assessment-process/close-task';
    return this.http.post(closeTaskUrl, request);
  }

  checkTaskDetails(claimDetailId,decision){
    let checkTaskAcceptanceUrl = environment.url.claimCommonWeb + '/api/v1/check-case-acceptance/'+decision +'/'+claimDetailId
    return this.http.get(checkTaskAcceptanceUrl) 

  }

    referralOpinionCloseTask(opinionData){
    let closereferralOpinion = environment.url.claimReferral + '/api/v1/closereferral/close-task';
    return this.http.post(closereferralOpinion, opinionData);
    // http://10.3.252.168:8318/kli-claims-referral/api/v1/closereferral/close-task
  }

  crcCloseTask(crcPayload){
    let crcCloseTask = environment.url.claimApproval + '/api/v1/task-details/close-crc-task';
    return this.http.post(crcCloseTask,crcPayload);
    // http://localhost:8314/claims-approval/api/v1/task-details/close-crc-task
  }

  saveNominee(data) {
    let savenomineeUrl = environment.url.claimRegistration + '/api/v1/claim-details/nominee-details'
    return this.http.post(savenomineeUrl, data);
  }
  removeNominee(nomineeDetailsId) {
    let removeNomineeUrl = environment.url.claimRegistration + '/api/v1/nominee/deactivate-nominee/' + nomineeDetailsId
    return this.http.get(removeNomineeUrl);
  }

  getCheckList(listdata) {
    let checkListUrl = environment.url.claimRegistration + '/api/v1/checklist/fetch'
    return this.http.post(checkListUrl, listdata);
  }

  saveChecklist(data) {
    let saveCheckListUrl = environment.url.claimRegistration + '/api/v1/checklist/save-checklist'
    return this.http.post(saveCheckListUrl, data)
  }

  getDocData(data){
    let fetchDocDataUrl = environment.url.claimRegistration + '/api/v1/mrequirement'
    return this.http.post(fetchDocDataUrl,data)
  }

  fetchsimultaneousPolicy(){
    this.claimDetailsId = this.allcommonService.getClaimsDetailId();
    let fetchsimultaneousPolicy = environment.url.claimCommonWeb+ '/api/v1/flag-status/fetch-simultaneous-policy/' +this.claimDetailsId;
    return this.http.get(fetchsimultaneousPolicy);
  }

  getSTPDetails(claimsDetailId){
    let STPUrl = environment.url.claimRegistration + '/api/v1/stp/' +  claimsDetailId 
    return this.http.get(STPUrl)
  }

}
