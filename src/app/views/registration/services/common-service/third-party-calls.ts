import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';


export interface PanDetails {
  returnCode: String,
  pan: String,
  panStatus: String,
  lastName: String,
  firstName: String,
  middleName: String,
  panTitle: String,
  lastUpdateOn: String,
  nameOnCard: String,
  aadharSeedingStatus: String,
}


@Injectable({
  providedIn: 'root'
})
export class ThirdPartyCalls {
  constructor(private http: HttpClient) { }
  public stringSubject = new Subject<any>();
  validateBankDetail(data) {
    return this.http.post(environment.url.claimTirdPartyCall + '/api/v1/claims-third-party-calls/bank-verification', data)
  }

  validatePanDetails(clientId: String, panNo: String, claimDetailsId: String, claimNo: String) {
    var panDetails = {
      "clientId": clientId,
      "panNumber": panNo,
      "claimsDetailId": claimDetailsId,
      "claimNo": claimNo
    };
    return this.http.post<PanDetails>(environment.url.claimTirdPartyCall + '/api/v1/claims-third-party-calls/validate-pan', panDetails);
  }
}
