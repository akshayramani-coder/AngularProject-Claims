import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IntimationService {
clientId:any
policyNo:any
claimData:any;
clientNo:any;
claimList:any;
  userData: any;
  constructor(private http: HttpClient) { }
  
  setClientId(Id:any) {
    this.clientId = Id;
    console.log(this.clientId);
  }

  getClientId() {
    console.log(this.clientId);
    return this.clientId;
  }
  setClaimList(res:any) {
    this.claimList = res;
    console.log(this.claimList);
  }

  getClaimList() {
    console.log(this.claimList);
    return this.claimList;
  }
  // setClientNo(clientNo:any) {
  //   this.clientNo = clientNo;
  //   console.log(this.clientNo);
  // }

  // getClientNo() {
  //   console.log(this.clientNo);
  //   return this.clientNo;
  // }

  setPolicyno(data: any) {
    this.policyNo = data;
  }
  getPolicyno() {
    return this.policyNo;
  }

  setClaimData(value:any){
    this.claimData = value;
  }

  getClaimData(){
    return this.claimData;
  }
  getdatalist() {
    let getDataListUrl = environment.url.intimation + '/api/v1/intimation/roles-from-policy/05121235'
    return this.http.get(getDataListUrl);
  }
  getPolicyNo(policyNo: any) {
  
    let getDataUserProfileUrl = environment.url.intimation + '/api/v1/intimation/roles-from-policy/' + policyNo
    return this.http.get(getDataUserProfileUrl)
    // return this.http.get('http://192.168.6.99:8082/claims-intimation/api/v1/intimation/policy-details/00')
  }
  getClientID(clientID: any) {  
    let getDataClientUserProfileUrl = environment.url.claimRegistration + '/api/v1/claim-details/all-by-client/' + clientID
    return this.http.get(getDataClientUserProfileUrl);
  }

  allDetails(data:any) {  
    let getDataAllDetailsUrl = environment.url.intimation + '/api/v1/claim-intimation/claim-type' 
    return this.http.post(getDataAllDetailsUrl, data);
  }
   
  
  getNotificationData(){
    this.userData = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log("USEEEEEEEEEERRRRRR",this.userData)
    const loginId =this.userData.loginId
    console.log("LOGIN ID",loginId)
     let getNotificationUrl=environment.url.claimRegistration + '/api/v1/notification/notification/' + loginId
     return this.http.get(getNotificationUrl)
  }

  updateNotification(data){
    let updateNotificationUrl=environment.url.claimRegistration + '/api/v1/notification/update-all'
    return this.http.post(updateNotificationUrl,data)
  }
}
