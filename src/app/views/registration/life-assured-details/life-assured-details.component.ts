import { Component, OnInit, Inject, Optional} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AllCommonService } from '../services/common-service/all-common.service';
import { CommonService } from '../../claim-intimation/services/common.service';
import { PolicyService } from '../services/common-service/policy.service';
import {  MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-life-assured-details',
  templateUrl: './life-assured-details.component.html',
  styleUrls: ['./life-assured-details.component.scss']
})
export class LifeAssuredDetailsComponent implements OnInit {
  content:any;
  user!: Observable<string>;
  sideNav = false;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  value = 80;
  appCode:any;
  // data:any
  policyNo:any;
  claimData:any;
  policyId:any;
  clientId:any;
  breCall:any;
  ClaimsDetailId:any;
  claimTypeDisp:any;
  productCode:any;
  policyStatusOnEvent:any;
  policyData:any;
  policyInfo: any;
  claimStatusDesc: any;
  policyStatusAtDoe: any;
  claimNo: any;
  earlyNonEarlyCR:any;
  earlyNonEarly:any;
  behaviourSubscription!:Subscription;
  claimStatusDisp: any;
  claimDuration: any;
  constructor(private router:Router, 
     
    private allCommonService: AllCommonService,private commonService: CommonService,private policyService: PolicyService,
    ) {       
}

    // @Inject(MAT_DIALOG_DATA) public data: any,

  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode');
    this.policyId = this.allCommonService.getCRClaimData();
    this.clientId = this.allCommonService.getClientId();
    this.claimStatusDesc=this.allCommonService.getclaimStatus();
    this.claimDuration=this.allCommonService.getClaimDurationCI()
    this.productCode=this.allCommonService.getproductCode();
    this.claimNo=this.allCommonService.getclaimNo();
    this.policyStatusAtDoe=this.allCommonService.getpolicyStatusAtDoe()
    console.log('111111111111',this.policyId )
    var claimData = this.allCommonService.getProfileData();
    console.log('claimData  >?>?>?>>??>>>>>>', claimData)
    this.policyNo = claimData;
    this.sideNav = false;
    if(this.appCode == 'CI'){
      this.claimData = this.policyService.getClaimData()

    this.policyInfo = this.allCommonService.getPolicydata();
    console.log('policyno////',this.policyInfo.policyNumber,'status///', this.policyInfo.policyStatusOnEventDisp ,'productcode////', this.policyInfo.productCode)
    this.policyNo = this.policyInfo.policyNumber;
    this.policyStatusOnEvent = this.policyInfo.policyStatusOnEventDisp;
    this.productCode = this.policyInfo.productCode;

      this.breCall = localStorage.getItem('breCall');
      console.log("breCall",this.breCall)
    

      this.allCommonService.intimationDocBreSubjct.subscribe(data => {
        this.earlyNonEarly = data.claimDuration;
        console.log("earlyNonEarly",this.earlyNonEarly)
      });
    }
    if(this.appCode=='CR'){
      this.earlyNonEarlyCR = this.allCommonService.getClaimDuration();
      console.log("earlyNonEarly?????",this.earlyNonEarly)
    }else if(this.appCode=='AS'){
      this.earlyNonEarlyCR = this.allCommonService.getClaimDurationAS();
      console.log("earlyNonEarly?????",this.earlyNonEarly)
    }
    else if(this.appCode=='PO'){
      this.earlyNonEarlyCR = this.allCommonService.getClaimDurationPO();
      console.log("earlyNonEarly?????",this.earlyNonEarly)
    }
    else if(this.appCode=='AP'){
      this.earlyNonEarlyCR = this.allCommonService.getClaimDurationAP();
      console.log("earlyNonEarly?????",this.earlyNonEarly)
    }


    
    this.behaviourSubscription =this.allCommonService.selectedMenu.subscribe(res => {
      this.content = res;
      console.log("gdsgfghsfgshgfgshfh>>>>>",this.content)
    });

   
  }

  ngOnDestroy() {
    this.behaviourSubscription.unsubscribe();
}

  openNav(){
    this.sideNav = true;
  //   if(this.tabs) this.tabs.realignInkBar();  
  //  //  this.tabs.selectedIndex = 0;
  //   this.noteAdded='';
   }
   closeNav(){
    this.sideNav = false;
  }
  onViewClick(){
    this.router.navigate(["/claims-intimation/claim-details"]);
  }


}

  // onSubmit(){
    
    // this.ClaimDetails=localStorage.getItem('ClaimDetails');
    // localStorage.setItem('ClaimDetails',JSON.stringify(this.myForm.value));
  
    // this.ClaimDetails = JSON.parse(this.ClaimDetails);
    
    
    
   
  // }

 
