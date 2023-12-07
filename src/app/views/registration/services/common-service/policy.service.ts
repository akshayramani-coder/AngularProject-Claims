// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';

// @Injectable({
//   providedIn: 'root'
// })
// export class PolicyService {

//   constructor(private http:HttpClient) { }


// getprofiledata(){
//   let getDataUserProfileUrl= environment.url.intimation + '/api/v1/intimation/policy-details/52759434' 
//   return this.http.get(getDataUserProfileUrl)
//   // return this.http.get('http://192.168.6.99:8082/claims-intimation/api/v1/intimation/policy-details/00')
// }
// getpolicyDetails(clientID:any){
//   let getDataUserProfileUrl= environment.url.intimation + '/api/v1/intimation/policy-details/' +clientID
//   return this.http.get(getDataUserProfileUrl)
//   // return this.http.get('http://192.168.6.99:8082/claims-intimation/api/v1/intimation/policy-details/00')
// }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  claimData: any;
  policyno:any;
  constructor(private http: HttpClient) { }

  setClaimData(data: any) {
    this.claimData = data;
  }
  getClaimData() {
    return this.claimData;
  }
  getprofiledata(data: any) {
    return this.http.post(environment.url.intimation + '/api/v1/intimation/policy-details', data)
  }
  getpolicyDetails(clientID: any) {
    let getDataUserProfileUrl = environment.url.intimation + '/api/v1/intimation/policy-details/' + clientID
    return this.http.get(getDataUserProfileUrl)
  }
  // Save Registration event details and claim details 
  saveEventClaimDetails(data:any){
    let saveEventClaimDetails = environment.url.claimRegistration + '/api/v1/claim-details' 
    return this.http.post(saveEventClaimDetails,data)
  }

  

}

