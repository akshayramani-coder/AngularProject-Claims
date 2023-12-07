import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/views/claim-assessor/services/common.service';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { PolicyService } from '../../services/common-service/policy.service';
import { RoleDetailsService } from '../../services/common-service/role-details.service';
import { DocumentRaisedService } from '../../services/document upload services/document-raised.service';

@Component({
  selector: 'app-cps',
  templateUrl: './cps.component.html',
  styleUrls: ['./cps.component.scss']
})
export class CpsComponent implements OnInit {
  note: any;
  policyData: any;
  appCode: any;
  roledata: any;
  policyService: any;
  claimData: any;
  lifeassureData: any;
  clientidservice: any;
  beneficiarydetails:any
  data: any;
  claimTypeDisp: any;
  claimIntimationDt: any;
  deathCause: any;
  eventDt: any;
  initiatedByDisp: any;
  relationWithLifeAssuredDisp: any;
  rcddoe:any;
  rcddoi:any;
  revivaldoe:any;
  message:any;
  lifeassureddata: any;
  dataSourceReferralConsultation:Array<any> = new Array();
  displayedColumns!: string[];
  dataSourcedoc:any;
  dataSource = new MatTableDataSource();
  displayedColumnsdocument!:string[];
  dataSourceReferral!:string[];
  documentstatus: any;
  claimsDetailId: any;
  fundData: any;
  stpDate!:any;
  stpDecision:string = ''
  stpReason:string = ''
  taskCode: any
  statuses: Array<any> = new Array();
  referralCode!: boolean;
  taskDecisionCode = ["REFERRAL_TYPE_MED_OPINION", "REFERRAL_TYPE_CRC_CLM_REVEW_COMMITTEE", "REFERRAL_TYPE_EXPRT_OPINION", "REFERRAL_TYPE_INVESTIGATION", "REFERRAL_TYPE_INVESTIGATION_WAIVER", "REFERRAL_TYPE_LEGAL_OPINION", "REFERRAL_TYPE_RCU_RSK_CNTRL_UNIT", "REFERRAL_TYPE_RE_INSUR_OPINION", "REFERRAL_TYPE_UW_OPINION"];
  earlyNonEarlyCR: any;
  totalValue: any;
  claimAmountCPS: any;

  constructor(private allCommonService: AllCommonService, 
    private roledetailService: RoleDetailsService,
    private documentraisedservice: DocumentRaisedService,
    private roleService:RoleDetailsService,
    private commonService: CommonService) {
    this.note = ("Life Assured / Proposer <Salutation Name> , <Gender>, age <Age> years has applied for <Product Name> with Sum Assured <sum assured>. He was <occupation> and was earning Rs <annual Income>. Policy was  <medical / non-medical> issued at <standard / rated - up>.")
    this.message = "NA"
  }
  // note:any
  ngOnInit(): void {
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    this.taskCode = this.allCommonService.getTaskCode();
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    this.displayedColumns = ['Name', 'DOB', 'Gender', 'RelationWithLA'];
    this.displayedColumnsdocument = ['RequirementName', 'Status', 'ReceivedDate'];
    this.dataSourceReferral = ['referralTypeDisp', 'asmRemarks', 'refUserName', 'updatedOn', 'refRemarks'];
    this.appCode = localStorage.getItem('appcode');
    this.lifeAssureDetailsCI();
    this.claimdetails();
    this.policyduration();
    this.beneficirydata();
    this.documentList();
    this.getSTPDecision();
    this.referralConsultation();
    this.earlyNonEarly();
    this.claimAmountCPS=this.allCommonService.getClaimAmount()
  }
  
  
  lifeAssureDetailsCI() {
    this.allCommonService.getAllTabData();
    var allTabData = this.allCommonService.getAllTabData();
    console.log("clientDetails:::", allTabData)
    this.lifeassureddata = {};
    var clientid = this.allCommonService.getClientId()
    console.log('currentclientid', clientid)

    for (var client of allTabData.clientDetails) {
      if (client.clientId === clientid) {
        this.lifeassureddata = client;

      }
    }

    var tabData = this.allCommonService.getAllTabData();
    this.policyData={}
    // this.riderDetails=[]
    console.log("tabData is:::", tabData);
    var policyDetails = tabData.policyDetails;
    // this.policyData = data;
   
    for (let data of policyDetails) {
      if(data.isrider=='N'){
        this.policyData = data;
      }
      // if(data.isrider=='Y'){
      
      //  this.dataSource = new MatTableDataSource(this.riderDetails)
      //   this.riderDetails.push(data)
      // }
    }
    var  fundDetails=tabData.fundDetails;
          this.fundData = fundDetails;
  }
  
  claimdetails(){
    var ClaimsDetailId = this.allCommonService.getClaimsDetailId();
    this.allCommonService.getEventAndClaimDetails(ClaimsDetailId).subscribe((res: any) => {
      this.data = res
      console.log('claimdata',this.data)
      if (this.data) {
        this.claimTypeDisp = this.data.transClaimDetailsDto.claimTypeDisp;
        this.claimIntimationDt = this.data.transClaimDetailsDto.intimationDate;
        this.deathCause = this.data.eventDetailsDto.deathCauseDisp;
        this.eventDt = this.data.eventDetailsDto.eventDt;
        this.initiatedByDisp = this.data.eventDetailsDto.initiatedByDisp;
        // this.relationWithLifeAssuredDisp = this.data.eventDetailsDto.relationWithLifeAssuredDisp;
      }
  }
    );
}


policyduration(){
  this.allCommonService.getrcddoe();
  console.log(this.allCommonService.getrcddoe())
  this.rcddoe=this.allCommonService.getrcddoe();

  this.allCommonService.getrcddoi();
  this.rcddoi=this.allCommonService.getrcddoi();

  this.allCommonService.getrevivaldoe();
  this.revivaldoe= this.allCommonService.getrevivaldoe();
}

beneficirydata(){
  this.roledetailService.getNomineeDetails().subscribe((res:any)=>{
    console.log('beneficiry',res)
    this.dataSource = new MatTableDataSource(res)
    this.beneficiarydetails=res
  })
}

documentList(){
  this.documentraisedservice.fetchRaisedRequirements(this.claimsDetailId).subscribe((res: any) => {
    console.log(res)
    this.dataSourcedoc=new MatTableDataSource(res)
  })
  
}
convertlookup(val:string): string{
  if(val == "DOC_STATUS_OPEN"){
    return "OPEN"
  }
  else if(val == "DOC_STATUS_RECEIVED"){
return "RECEIVED"
  }
  else if(val == "DOC_STATUS_CANCELLED"){
    return "CANCELLED"
      }
  return "NA"
  
}
getSTPDecision(){
  var ClaimsDetailId = this.allCommonService.getClaimsDetailId();
  console.log('here')
  this.roleService.getSTPDetails(ClaimsDetailId).subscribe((res:any)=>{
      console.log(res)
      this.stpDecision = res.status
      for(let i = 0 ;i<res.objList.length; i++){
        if(i<(res.objList.length-1)){
          this.stpReason += res.objList[i] + ' ,';
        }
        else{
          this.stpReason += res.objList[i]
        }
      }
      this.stpDate = res.statusMsg
    },
    (error)=>{
      console.log("Some error occurred")
    }
  )
}

referralConsultation() {
  this.taskDecisionCode.forEach((ele) => {
    if (this.taskCode == ele) {
      this.referralCode = true;
    }
  })

  if (this.referralCode == true) {
    this.commonService.getReferralComments(this.taskCode, this.claimsDetailId).subscribe((res: any) => {
        console.log('its referral Comments', res)
        res.forEach(ele => {
          this.statuses.push(ele.status)
          this.dataSourceReferralConsultation.push(new MatTableDataSource(ele.objList))
        });
    })
  }
  else {
    this.commonService.getReferralDecisions(this.allCommonService.getClaimsDetailId()).subscribe((res: any) => {
        console.log('its Assessment or assessment await Comments', res)
        res.forEach(ele => {
          this.statuses.push(ele.status)
          this.dataSourceReferralConsultation.push(new MatTableDataSource(ele.objList))
        });
    })
  }
}

earlyNonEarly(){
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
}

}
