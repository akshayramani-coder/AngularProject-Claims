import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LookupcodeService {

  // lookupId:any;
  // lookupCd:any;
  // nameSet:any;
  // shrtName:any;
  // lngName:any;
  // prntLookupId:any;
  // srtOrd:any;
  // cat:any;
  // systmYn:any;
  // activeYn:any



  constructor(private http: HttpClient) { }

  getLookupByCode(lookupCd: String) {
    let getDataListUrl = environment.url.userManagement + '/api/v1/lookup/lookupCd/' + lookupCd
    return this.http.get(getDataListUrl);
  }

}
