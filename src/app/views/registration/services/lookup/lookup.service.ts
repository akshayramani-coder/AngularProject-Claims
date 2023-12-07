import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lookpu } from '../../model/lookpu';
const headerOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
}
@Injectable({
  providedIn: 'root'
})


export class LookupService {
  lookuDitail: Lookpu = {


    activeYn: '',
    cat: '',
    lngName: '',
    lookupCd: '',
    lookupId: null,
    prntLookupId: null,
    setName: '',
    shrtName: '',
    srtOrd: null,   
    systmYn: '',
  }
  constructor(private http:HttpClient) { }
  getClaimlist(){
      let getDataListUrl = environment.url.userManagement + '/api/v1/lookup/setName/CLAIM_TYPE?isPaging=false'
      return this.http.get(getDataListUrl);
  }

  getClaimdeath(){
    let getDataListUrl =environment.url.userManagement + '/api/v1/lookup/setName/DEATH_CLAIM_TYPE?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  geteventType(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/EVENT_TYPE?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  getcauseofDeath(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/CAUSE_OF_EVENT?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  getplaceofDeath(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/PLACE_OF_DEATH?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  getorganImpact(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/EVENT_ORGAN_IMPACTED?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  getsecondaryEvent(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/SECONDARY_EVENT_CAUSE?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  getintimatedBy(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/INTIMITED_BY?isPaging=false'
    return this.http.get(getDataListUrl);
  }

  getrealationlifeAssured(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/RELATION_WITH_LA?isPaging=false'
    return this.http.get(getDataListUrl);
  }

// Document status//
  getpayoutOption(){
    let getDataListUrl=environment.url.userManagement + '/api/v1/lookup/setName/PAYOUT_OPTION?isPaging=false'
    return this.http.get(getDataListUrl);
  }

    // nomini and bank details component Loock UP SERVICESS//
 
  
    fetchBySetName(setName){
      let getprefixUrl=environment.url.userManagement + '/api/v1/lookup/setName/'+setName+'?isPaging=false'
      return this.http.get(getprefixUrl)
    }
    getDecision(){
      let getDecisionUrl=environment.url.userManagement + '/api/v1/decision/task-code/ASSESSMENT_TSK'
      return this.http.get(getDecisionUrl)
    }
    getEvdnce(){
      let getEvdnceUrl=environment.url.userManagement + '/api/v1/lookup/setName/CLM_TYP_DTH_EVDNCE'
      return this.http.get(getEvdnceUrl)
    }
    getReason(){
      let getReasonUrl=environment.url.userManagement + '/api/v1/lookup/setName/CLM_TYP_DTH_REASON'
      return this.http.get(getReasonUrl)
    }
    getdRequirementList(){
      let getdecReqUrl=environment.url.userManagement + '/api/v1/lookup/setName/AWAIT_OPTION'
      return this.http.get(getdecReqUrl)
    }
}

