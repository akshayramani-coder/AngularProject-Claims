import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { RoleDetailsService } from '../../services/common-service/role-details.service';
import { RoleDetailsComponent } from '../role-details/role-details.component';
import { FormBuilder, FormControlName, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { LookupService } from '../../services/lookup/lookup.service';
import { CommonService } from 'src/app/views/claim-assessor/services/common.service';
// import { CommonService } from 'src/app/views/claim-payout/services/common.service';
import { MatDialogService } from '../../services/mat-service/mat-dialog.service';
import { CrossFieldErrorMatcherNew } from '../../ErrorStateMatcher/ErrorStateMatcher-nominee-Bank-details';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { CommonAlertComponent } from '../../common-popup/common-alert/common-alert.component';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {
  dialogCommonRef!: MatDialogRef<CommonAlertComponent>;
  showdecision: boolean = false;
  decisionhidden: boolean = false;
  decisionRequirementShow:boolean=false;
  commonMessageForAwait = "It’s an await stage. Waiting for referral’s opinion.";
  trackClaim: boolean = false;
  errroMatcherNew = new CrossFieldErrorMatcherNew();
  regSave:any;
  showrequirement: boolean = false;
  requirementhidden: boolean = false;
  coverageDetails: any;
  coverageForm!: FormGroup;
  referralForm!: FormGroup;
  decisionRequirementForm!:FormGroup;
  dcsnCode: any;
  dcsnId: any;
  dcsn_date: any;
  dcsnBy: any;
  dcsnRsnId: any;
  approvalArray: any;
  coverageName: any;
  caverage!: FormArray;
  coverageCode: any;
  coverageType: any;
  coverageDetailId: any;
  decisionlist: any;
  appCode: any;
  isReadonly: any
  Data: any;
  approval: any;
  payload: any;
  submitted = false
  isRejects: boolean = false;
  isReject: any;
  reasonlist: any;
  evdncelist: any;
  selectedReject: String = '';
  showWaive: boolean = false;
  referralOpinions: any;
  referrals: any;
  setAccessorDecision: any;
  referralUsers:Array<any> = new Array();
  selectedCheckBox:Array<Number> = new Array();
  referralFormsValue: any;
  isRefButtonDisable:boolean = true;
  selectUser: String = '';
  payloadReferral :any;
  checkDOcStatus:any;
  statusDocChange:any;
  cancelStatus:any;
  LrdDate:any;
  getReferralFlag:boolean = true
  deathBeforeRCD:boolean = false
  medicalNonDisclosure:boolean = false
  previousInsuranceNonDisclosure:boolean = false;
  paymentULIP:boolean = false
  paymentCI:boolean = false
  paymentRPU:boolean = false 
  paymentInForce:boolean = false
  paymentGracePeriod:boolean = false
  paymentSuicide:boolean = false
  baseDecisionOfSelectedLetters:any;
  submitSucidePreview:boolean = false
  lapsedWOPay:boolean = false
  lapsedWithPay:boolean = false
  submitLapsedWOPay:boolean = false
  submitDeathBeforeRCD:boolean = false
  submitMedicalNonDisclosure:boolean = false
  submitPreviousInsuranceNonDisclosure:boolean = false;
  waitingPeriodForCI:boolean = false
  waitingPeriodForDisability:boolean = false
  showNDALetter:boolean = false
  showClaimRequirementLetter:boolean = false
  showClaimRequirementLetterForCI:boolean = false
  submitClaimRequirementLetter:boolean = false
  submitClaimRequirementLetterForCI:boolean = false
  submitNDAletter:boolean=false
  decisionReList:any
  commonMessage = "Please complete all required fields";
  refDict = {
    "REFERRAL_TYPE_UW_OPINION": "UW_OPN_FINISH",
    "REFERRAL_TYPE_RE_INSUR_OPINION": "RE_INSUR_OPN_FINISH",
    "REFERRAL_TYPE_RCU_RSK_CNTRL_UNIT": "RCU_FINISH",
    "REFERRAL_TYPE_LEGAL_OPINION": "LEGAL_OPN_FINISH",
    "REFERRAL_TYPE_INVESTIGATION_WAIVER": "INVSTGTION_WAIVR_FINISH",
    "REFERRAL_TYPE_INVESTIGATION": "INVSTGTION_FINISH",
    "REFERRAL_TYPE_EXPRT_OPINION": "EXPRT_OPN_FINISH",
    "REFERRAL_TYPE_CRC_CLM_REVEW_COMMITTEE": "CRC_CLM_REVEW_FINISH",
    "REFERRAL_TYPE_MED_OPINION": "MED_OPN_FINISH",
  }
  baseDecisionjson:any
  reRegestrationVisible: boolean = false;
  reRegestrationRemark: boolean = false;
  referBackButton!: boolean;
  isAPReadOnly!: boolean;
  newDecisionCode:string|null = null
  constructor(private router: Router,
    private allCommonService: AllCommonService,
    private tabDetailsService: RoleDetailsService,
    private fb: FormBuilder,
    private loockUpService: LookupService,
    private commonService: CommonService,
    private matDialogService: MatDialogService,
    public dialog: MatDialog,
    private payoutCommonService: CommonService) { 
      this.allCommonService.stringSubject.subscribe(
        (res:any) =>{
          this.stringSubject = res
        }
      )
      this.allCommonService.claimSubject.subscribe(
        (res:any) =>{
          this.claimAndEventDetails = res
        }
      )
    }

  get coverageData(): FormArray {
    return <FormArray>this.coverageForm.get('coverage');
  }

  get referralData(): FormArray {
    return <FormArray>this.referralForm.get('referralsFormArray')
  }
  claimDetailId:string=""
  isDisableForPO:boolean = false
  showRadioButton = true
  showDetails = true
  showLetters = false
  taskDecisionCodeReferral = ["REFERRAL_TYPE_MED_OPINION","REFERRAL_TYPE_CRC_CLM_REVEW_COMMITTEE","REFERRAL_TYPE_EXPRT_OPINION","REFERRAL_TYPE_INVESTIGATION","REFERRAL_TYPE_INVESTIGATION_WAIVER","REFERRAL_TYPE_LEGAL_OPINION","REFERRAL_TYPE_RCU_RSK_CNTRL_UNIT","REFERRAL_TYPE_RE_INSUR_OPINION","REFERRAL_TYPE_UW_OPINION"]
  taskCode: any;
  claimType:any
  stringSubject:any;
  claimAndEventDetails:any;
  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode')
    this.claimDetailId = this.allCommonService.getClaimsDetailId()
    this.taskCode = this.allCommonService.getTaskCode();
    this.LrdDate=this.allCommonService.getRequirementClsdDt();
    if(this.appCode == "AS"){
      if(this.taskCode == "AWAIT_ASSESSMENT_REFERRAL"){
        this.showDetails = false
      }
      else if(this.referralOnlyTaskDisplay()){
       // this.showRadioButton = false
       this.showDetails = false
       //this.requirement()
      }
      else{
        this.showDetails = true
        this.showRadioButton = true
      }
    }else if(this.appCode == "AP" && this.taskCode == 'CRC_TSK'){
      this.showDetails = false
    }
    
    this.coverageForm = this.fb.group({
      coverage: this.fb.array([]),
      remark: [''],

    });

    this.referralForm = this.fb.group({
      referralsFormArray:this.fb.array([]),
    })

    if (this.appCode == 'AP') {
      this.isAPReadOnly = true;
    }
    if (this.appCode == 'PO') {
      this.isReadonly = true;
      this.getClaimList();
    }
    else {
      this.isReadonly = false;
      this.getClaimList();
    }
    this.approvalArray = [
      {
        shortName: 'Approve',
        lookupCode: 'ASM_ACCEPT'
      },
      {
        shortName: 'Return of Premium',
        lookupCode: 'ASM_ACCEPT'
      },
      {
        shortName: 'Reject',
        lookupCode: 'ASM_REJECT'
      },
      {
        shortName: 'Requirements',
        lookupCode: 'ASM_ACCEPT'
      },

    ]
    this.getDecision();
    this.getEvdnce();
    this.getReason();
    this.getdecisionRequirement();
    this.getReferralOpinionList();
    this.trackClaim=this.allCommonService.getTrackClaim();

    if(this.trackClaim){
      this.isReadonly=true
    }
   this.medicalNonDisclosureFrom = this.fb.group({
      "claimsDetailId":this.allCommonService.getClaimsDetailId(),
      "proposalClauseNo":['',Validators.required] ,
      "nonDisclosureFacts": ['',Validators.required],
      "detailsOfIllnesses": ['',Validators.required],
      "documentsToBeCaptured":['',Validators.required]
  })

  this.previousInsuranceNonDisclosureFrom = this.fb.group({
    "claimsDetailId":this.allCommonService.getClaimsDetailId(),
    "proposalClauseNo":['',Validators.required] ,
    "nonDisclosureFacts": ['',Validators.required],
    "factsToBeCaptured": ['',Validators.required],
  })
 
  this.waitingPeriodDisabilityForm = this.fb.group({
    "claimsDetailId":this.allCommonService.getClaimsDetailId(),
    "illnessName":['',Validators.required],
    "waitingPeriodTimeline":['',Validators.required],
    "waitingPeriodClause":['',Validators.required]
  })

  this.waitingPeriodCIForm = this.fb.group({
    "claimsDetailId":this.allCommonService.getClaimsDetailId(),
    "illnessName":['',Validators.required],
    "waitingPeriodTimeline":['',Validators.required],
    "waitingPeriodClause":['',Validators.required]
  })

  this.decisionRequirementDoc();
  }

  
  referralOnlyTaskDisplay():boolean{
    let flag = false
    this.taskDecisionCodeReferral.forEach((ele)=>{
      if(this.taskCode == ele){
        flag = true
      }
    })
    return flag
  }
  

  coverageDataForm(data) {
    console.log("data is::", data)
    return this.fb.group({
      lablename: [data.coverageCodeDisp?data.coverageCodeDisp:' '],
      approval: [data.dcsnCode, Validators.required],
      // tskDcsnRmrks: ['', Validators.required],
      coverageCode: [data.coverageCode],
      coverageType: [data.coverageType],
      coverageDetailId: [data.coverageDetailId],
      reason: [data.dcsnRsnCode],
      suspicious: [data.suspiciousYn],
      evidenceType: [data.dcsnEvdnCode]
    });
  }

  referralDataForm(referralData?) {
    console.log("data is::", referralData)
    return this.fb.group({
      referralType:[referralData.lookupCd],
      user:[""],
      remarks:[""],
    }); 
  }

  decisionRequirementDoc(){
   this.decisionRequirementForm=this.fb.group({
    decisionRequirement:[""],
    decisionrequirementRemark:[""],
   })
  }
  docStatus:any
  policyStatusAtDoe:any
  eventCause:any
  policyTypeUlipYN:any
  checkDocStatus(){
    this.claimType = localStorage.getItem('claimTypeDisp')
    console.log(this.claimType)
    this.docStatus = this.allCommonService.getDocStatus()
    console.log(this.docStatus)
    console.log(this.stringSubject)
    this.policyStatusAtDoe =this.allCommonService.getpolicyStatusAtDoe()
    console.log("hello")
    console.log(this.policyStatusAtDoe)
    console.log(this.claimAndEventDetails)
    var ClaimsDetailId = this.allCommonService.getClaimsDetailId();
    this.eventCause = this.claimAndEventDetails.eventDetailsDto.deathCause
    console.log(this.eventCause)
    this.policyTypeUlipYN = this.allCommonService.getPolicyTypeUlipYN()
    console.log(this.policyTypeUlipYN)
  }

medicalNonDisclosureFrom = this.fb.group({
    "claimsDetailId":this.allCommonService.getClaimsDetailId(),
    "proposalClauseNo":['',Validators.required] ,
	  "nonDisclosureFacts": ['',Validators.required],
	  "detailsOfIllnesses": ['',Validators.required],
    "documentsToBeCaptured":['',Validators.required]
})
  
get medicalNonDisclosureFormControls():FormGroup{
  return <FormGroup> this.medicalNonDisclosureFrom;
}

previousInsuranceNonDisclosureFrom = this.fb.group({
  "claimsDetailId":this.allCommonService.getClaimsDetailId(),
  "proposalClauseNo":['',Validators.required] ,
  "nonDisclosureFacts": ['',Validators.required],
  "factsToBeCaptured": ['',Validators.required],
})



get previousInsuranceNonDisclosureFromControls():FormGroup{
  return <FormGroup> this.previousInsuranceNonDisclosureFrom;
}

suicideLetterForm = this.fb.group({
  "claimsDetailId":this.allCommonService.getClaimsDetailId(),
  "extractAsPerPolicy":['',Validators.required]

})

get suicideLetterFormControl():FormGroup{
  return <FormGroup> this.suicideLetterForm
}

waitingPeriodCIForm = this.fb.group({
  "claimsDetailId":this.allCommonService.getClaimsDetailId(),
  "illnessName":['',Validators.required],
  "waitingPeriodTimeline":['',Validators.required],
  "waitingPeriodClause":['',Validators.required]
})

get waitingPeriodCIFormControls():FormGroup{
  return <FormGroup> this.waitingPeriodCIForm
}
waitingPeriodDisabilityForm = this.fb.group({
  "claimsDetailId":this.allCommonService.getClaimsDetailId(),
  "illnessName":['',Validators.required],
  "waitingPeriodTimeline":['',Validators.required],
  "waitingPeriodClause":['',Validators.required]
})

get waitingPeriodDisabilityFormControls():FormGroup{
  return <FormGroup> this.waitingPeriodDisabilityForm
}

  referralOpinionForm = this.fb.group({
    referralRemark: ['', Validators.required]
  })

  get referralOpinionFormControls():FormGroup{
    return <FormGroup> this.referralOpinionForm
  }

  reRegestrationForm = this.fb.group({
    reRegestrationRemark: ['', Validators.required]
  })

  get reRegestrationFormControls():FormGroup{
    return <FormGroup> this.reRegestrationForm
  }
  get f(): {} {
    return this.coverageForm.controls;
  }

  get userFormGroups(): FormArray {
    return this.coverageForm.get('coverage') as FormArray;
  }

  referBackDecisionForm = this.fb.group({
    referBackDecision: ['', Validators.required],
    remark: ['', Validators.required]
  })

  get referBackDecisionFromControls(): FormGroup {
    return <FormGroup>this.referBackDecisionForm
  }

  addNomineeData(contact) {
    this.coverageData.push(this.coverageDataForm(contact));
  }

  get controls(): { [key: string]: AbstractControl } {
    return this.referralForm.controls;
  }

  get referFormGroups(): FormArray {
    return this.referralForm.get('referralsFormArray') as FormArray;
  }

  addReferralData(data?) {
    this.referralData.push(this.referralDataForm(data));
  }

  removeReferralData(i){
    this.referralData.removeAt(i)
    console.log(this.referralData)
  }

  decision() {
    // this.showdecision = true;
    this.decisionhidden = true;
    this.decisionRequirementShow=false
    this.requirementhidden = false;
    this.reRegestrationVisible = false;
    this.referBackButton = false;
    this.setAccessorDecision = "ASM_ACCEPT";
    let coverageDataFormValue = this.coverageForm.value 
    console.log(coverageDataFormValue)
    if(coverageDataFormValue && coverageDataFormValue.coverage.length > 0){
    // coverageDataFormValue.coverage.forEach(ele=> {
    //   if(ele.coverageType == "BASE"){
    //     this.showLetterBasedOnTheDecision(ele)
    //   }
    // }
    // )
    this.showLetterBasedOnTheDecision(coverageDataFormValue.coverage[0]) 
  }
    console.log(this.setAccessorDecision);
  }

  awaitRequirement(){

  }

  requirement() {
    // this.showrequirement = true;
    this.decisionRequirementShow=false
    this.requirementhidden = true;
    this.decisionhidden = false;
    this.referBackButton = false;
    this.reRegestrationVisible = false;
    this.setAccessorDecision = "ASM_REFERRAL";
    console.log(this.setAccessorDecision);
  }

  decisionRequirement(){
    this.decisionRequirementShow=true
    this.decisionhidden = false;
    this.reRegestrationVisible = false;
    this.requirementhidden = false;
    this.setAccessorDecision = "SEND_TO_AWAIT";
    this.decisionRequirementDoc();
   }

  waive() {
    // this.showWaive = !this.showWaive;
  }
  raise() {
    this.showWaive = false;
  }


  // to fetch coverage Details
  getClaimList() {
    this.tabDetailsService.getClaimList().subscribe((res: any) => {
      console.log("tabDetails::::", res);
      this.coverageDetails = res;
      this.coverageDetails.forEach(element => {
        this.addNomineeData(element);
        // this.coverageCode = element.coverageCode;
        // this.coverageType = element.coverageType;
        // this.coverageDetailId = element.coverageDetailId;  
        this.dcsnCode = element.dcsnCode;
      });
    });
  }


  approvalChange(value,i) {
    this.selectedReject = value
    console.log(this.coverageData)
    let data = this.coverageData.value[i]
    console.log(data)
    let flag:boolean = true
    if(data.approval == "ASM_REPUDIATE" || data.approval == "ASM_INVALID_CLM" || data.approval == "ASM_ROP" ||
         data.approval == "ASM_REJECT"){
          if(data.coverageType == null || data.suspicious == null || data.reason == null || data.evidenceType == null ){
            flag = false
          }
      }
      else{
        if( data.suspicious == null ){
          flag = false
        }
      }
      console.log(data)
    if(i == "0" && flag){
      if(this.appCode == "AS" || this.appCode == "AP"){
        this.showLetterBasedOnTheDecision(data)
      }
    console.log(data)
    this.allCommonService.changeDecision(data)
    }

  }


  showLetterBasedOnTheDecision(decision){
    this.deathBeforeRCD = false
    this.medicalNonDisclosure = false
    this.previousInsuranceNonDisclosure = false
    this.paymentULIP = false
    this.paymentCI = false
    this.paymentRPU = false 
    this.paymentInForce = false
    this.paymentGracePeriod = false
    this.paymentSuicide = false
    this.baseDecisionOfSelectedLetters = ''
    this.previewClick=false
    this.lapsedWOPay = false
    this.lapsedWithPay = false
    this.showNDALetter = false
    switch (decision.approval) {
      case 'ASM_HOLD':
           break;
      case 'ASM_REPUDIATE':
        switch(decision.reason){
          case "CLM_TYP_DTH_REASON_DTH_BFR_ISSUANCE" : 
          if(this.claimType == "Death"){
            this.deathBeforeRCD = true
            this.baseDecisionOfSelectedLetters = decision
          }
            break;
          case "CLM_TYP_DTH_REASON_NON_DISC_HLTH":
            if(this.claimType == "Death"){
            this.medicalNonDisclosure = true
            this.baseDecisionOfSelectedLetters = decision
            }
            break;
          case "CLM_TYP_DTH_REASON_NON_DISC_PRE_INSU":
            if(this.claimType == "Death"){
            this.previousInsuranceNonDisclosure = true
            this.baseDecisionOfSelectedLetters = decision
            }
            break;
          default:
            console.log("letter not for given decision")
        }
       
          break;
      case 'ASM_INVALID_CLM':
           break;
      case 'ASM_ROP': 
          break;
      case 'ASM_SAVE_DRFT':
           break;
      case 'ASM_RE_REG': 
          break;
      case 'SEND_TO_AWAIT': 
          break;
      case 'ASM_ACCEPT' :
      case 'ASM_APPRV_PAYOUT_PEND' : 
          console.log(this.policyTypeUlipYN)
          if(this.policyStatusAtDoe.toLowerCase() == "discontinuation"){
            this.lapsedWithPay = true;
            this.baseDecisionOfSelectedLetters = decision
            //show letter for base decision ---vipul
          }
          else if(this.claimType == "Death" && this.eventCause == "EVENT_CAUSE_SUCIDE" ){
            this.paymentSuicide =true
            this.baseDecisionOfSelectedLetters = decision
          }
          else if(this.claimType != "Death"){ 
            this.paymentCI = true
            this.baseDecisionOfSelectedLetters = decision
          }
          else if(this.claimType == "Death" && this.policyStatusAtDoe.toLowerCase() == "paid up contract" && this.eventCause != "EVENT_CAUSE_SUCIDE"){
            this.paymentRPU = true
            this.baseDecisionOfSelectedLetters = decision
          }
          else if(this.claimType == "Death" && this.policyTypeUlipYN == "Y" && this.eventCause != "EVENT_CAUSE_SUCIDE" && this.policyStatusAtDoe.toLowerCase() != "paid up contract" ){
            this.paymentULIP = true
            this.baseDecisionOfSelectedLetters = decision
          }
          else if(this.claimType == "Death" && this.policyStatusAtDoe.toLowerCase() == "in force" && this.policyTypeUlipYN == "N" && this.eventCause != "EVENT_CAUSE_SUCIDE"){
            this.paymentInForce = true
            //this.paymentGracePeriod = true
            this.baseDecisionOfSelectedLetters = decision
          }
          if(decision.approval == 'ASM_APPRV_PAYOUT_PEND' && this.claimType == 'Death'){
               this.showNDALetter = true
               this.baseDecisionOfSelectedLetters = decision
          }
          break;
      case 'ASM_REJECT': 
          if(decision.reason == "CLM_TYP_DTH_REASON_LAPS_POLICY" && this.claimType == "Death"){
            this.lapsedWOPay = true
            this.baseDecisionOfSelectedLetters = decision
          }
          break;
      case 'ASM_REFERRAL': 
          break;
      default:
        console.log("wrong Decision Code")
  }

  }

previewClick:boolean = true
  previewApi(title:string){
    let body ={}
    let flag = true
    let url = ''
    
    switch(title){
      case 'deathbeforercd':
        url = title
        body = {claimsDetailId:this.claimDetailId,
          dcsnCode:this.baseDecisionOfSelectedLetters.approval,
          dcsnReason:this.baseDecisionOfSelectedLetters.reason
        }
        break;
      case 'medicalNonDisclosure':
        url = 'repudiationlettermedical'
        if(this.medicalNonDisclosureFrom.valid){
          console.log(this.medicalNonDisclosureFrom.value)
          body = this.medicalNonDisclosureFrom.value
          body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
          body['dcsnReason'] = this.baseDecisionOfSelectedLetters.reason
        }
        else{
          flag = false
        }
        break;
      case 'previousInsuranceNonDisclosure':
        url = 'repudiationletterpreviousinsurance'
        if(this.previousInsuranceNonDisclosureFrom.valid){
          body = this.previousInsuranceNonDisclosureFrom.value
          body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
          body['dcsnReason'] = this.baseDecisionOfSelectedLetters.reason
        }
        else{
         flag = false
        }
        break;
      case 'paymentGracePeriod':
        url = 'paymentnonulipgraceperiod'
        body = {
          claimsDetailId:this.claimDetailId,
          dcsnCode:this.baseDecisionOfSelectedLetters.approval,
          ulipYn: this.policyTypeUlipYN
        }
        break;
      case 'paymentInForce':
        url = 'paymentletternonulipinforce'
        body = {
          claimsDetailId:this.claimDetailId,
          dcsnCode:this.baseDecisionOfSelectedLetters.approval,
          ulipYn: this.policyTypeUlipYN
        }
        break;
      case 'paymentRPU':
        url = 'paymentletterrpu'
        body = {
          claimsDetailId:this.claimDetailId,
          dcsnCode:this.baseDecisionOfSelectedLetters.approval,
          ulipYn: this.policyTypeUlipYN
        }
        break;
      case 'paymentCI':
        url ='paymentletterrider'
        body = {
          claimsDetailId:this.claimDetailId,
          dcsnCode:this.baseDecisionOfSelectedLetters.approval,
        }
        break;
      case 'paymentSuicide':
        url = 'suicideletter'
        if(this.suicideLetterForm.valid){
          body = {
            claimsDetailId:this.claimDetailId,
            dcsnCode:this.baseDecisionOfSelectedLetters.approval,
            causeOfEvent : this.eventCause,
            extractAsPerPolicy:this.suicideLetterForm.value.extractAsPerPolicy
          }
        }
        else{
          flag =false
        }
        break;
      case 'paymentULIP':
          url = 'paymentletterulip'
          body = {
            claimsDetailId:this.claimDetailId,
            dcsnCode:this.baseDecisionOfSelectedLetters.approval,
            ulipYn: this.policyTypeUlipYN
          }
          break;
      case 'lapsedWOPay':
          url = 'lapsedwithoutpayletter'
          body = {
            claimsDetailId:this.claimDetailId
          }
          body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
          body['dcsnReason'] = this.baseDecisionOfSelectedLetters.reason
          break;
      case 'lapsedWithPay':
        url = 'lapsedwithpayletter'
        body = {
          claimsDetailId:this.claimDetailId,
          dcsnCode:this.baseDecisionOfSelectedLetters.approval,
          policyStatusAtDoe: this.policyStatusAtDoe
        }
        break;
      case 'showNDALetter':
          url = 'ndaletter'
          body = {
            claimsDetailId:this.claimDetailId
          }
          body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
          break;
      case 'showClaimRequirementLetter':
          url = 'claimsrequirementletter'
          body = {
            claimsDetailId:this.claimDetailId
          }
          break;
      case 'showClaimRequirementLetterForCI':
          url = 'claimsreqletterridercidisability'
          body = {
            claimsDetailId:this.claimDetailId
          }
          break;
      default:
        flag = false;
    }
    if(flag == true){
    this.allCommonService.getLetterFromCommunicationFrameWork(this.claimDetailId,url,body).subscribe(
      (res:any) => {
        console.log(res)
        var file:any
       if(Array.isArray(res)){
          res.forEach((ele:any) =>{
            if(ele.IsSuccess == "true"){
            file  = new File([ele.EmailBody],`${ele.value}.pdf`,{type: 'application/pdf'})
            var fileURL = URL.createObjectURL(file);
            console.log(file)
            window.open(fileURL,'_blank')
            this.previewClick = true
            this.enablePreviewButton(url)
            }
            else{
               this.matDialogService.openAlertDialog(ele.EmailBody.toString())
            }
          })
        } 
        
       
       
      }
    )
    }
  }

  onSelectAction(value){
    console.log(value) 
    this.showClaimRequirementLetter = false
    this.showClaimRequirementLetterForCI = false
    if(value == "ADD_DOC_FROM_NOMINEE"){
      if(this.claimType == "Death"){
        this.showClaimRequirementLetter = true
      }
    }
    else if(value == "ADD_REQ"){
      if(this.claimType == "Death"){
        this.showClaimRequirementLetter = true
      }
      else{
        this.showClaimRequirementLetterForCI = true
      }
    }
  }


  submitLetterToDB(title: string) {
    let flag: boolean = true;
    let body: any
    let finalBody: any
    let corCode = ""
    switch (title) {
      case 'deathbeforercd':
        body = {
          claimsDetailId: this.claimDetailId,
          dcsnCode: this.baseDecisionOfSelectedLetters.approval,
          dcsnReason: this.baseDecisionOfSelectedLetters.reason
        }
        corCode = "DEATH_BEFORE_RCD"
        break;
      case 'medicalNonDisclosure':
        if (this.medicalNonDisclosureFrom.valid) {
          corCode = "REPUDIATION_LTR_MED_NON_DISC"
          console.log(this.medicalNonDisclosureFrom.value)
          body = this.medicalNonDisclosureFrom.value
          body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
          body['dcsnReason'] = this.baseDecisionOfSelectedLetters.reason
        }
        else {
          flag = false
        }
        break;
      case 'previousInsuranceNonDisclosure':
        if (this.previousInsuranceNonDisclosureFrom.valid) {
          corCode = "REPUDIATION_LTR_PREV_INSR_NON_DISC"
          body = this.previousInsuranceNonDisclosureFrom.value
          body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
          body['dcsnReason'] = this.baseDecisionOfSelectedLetters.reason
        }
        else {
          flag = false
        }
        break;
      case 'paymentSuicide':
        if (this.suicideLetterForm.valid) {
          corCode = "SUICIDE_LETTER"
          body = {
            claimsDetailId: this.claimDetailId,
            dcsnCode: this.baseDecisionOfSelectedLetters.approval,
            causeOfEvent: this.eventCause,
            extractAsPerPolicy: this.suicideLetterForm.value.extractAsPerPolicy
          }
        }
        else {
          flag = false
        }
        break;
      case 'paymentGracePeriod':
        //  url = 'paymentnonulipgraceperiod'
        corCode = "PAYMENT_LETTER_NON_ULIP_GRACE_PERIOD"
        body = {
          claimsDetailId: this.claimDetailId,
          dcsnCode: this.baseDecisionOfSelectedLetters.approval,
          ulipYn: this.policyTypeUlipYN,
          //    policyStatusAtDoe: this.policyStatusAtDoe

        }
        break;
      //   case 'paymentInForce':
      //    // url = 'paymentletternonulipinforce'
      //     body = {
      //       claimsDetailId:this.claimDetailId,
      //       dcsnCode:this.baseDecisionOfSelectedLetters.approval,
      //       ulipYn: this.policyTypeUlipYN,
      //   //    policyStatusAtDoe: this.policyStatusAtDoe
      //     }
      //     break;
      //   case 'paymentRPU':
      //     //url = 'paymentletterrpu'
      //     body = {
      //       claimsDetailId:this.claimDetailId,
      //       dcsnCode:this.baseDecisionOfSelectedLetters.approval,
      //  //     policyStatusAtDoe: this.policyStatusAtDoe
      //     }
      //     break;
      //   case 'paymentCI':
      //    // url ='paymentletterrider'
      //     body = {
      //       claimsDetailId:this.claimDetailId,
      //       dcsnCode:this.baseDecisionOfSelectedLetters.approval,
      //     }
      //     break;
      //   case 'paymentULIP':
      //  // url = 'paymentletterulip'
      //   body = {
      //     claimsDetailId:this.claimDetailId,
      //     dcsnCode:this.baseDecisionOfSelectedLetters.approval,
      //     ulipYn: this.policyTypeUlipYN
      //   }
      //   break;
      case 'lapsedWOPay':
        corCode = "LAPSED_WITHOUT_PAYLETTER"
        body = {
          claimsDetailId: this.claimDetailId
        }
        body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
        body['dcsnReason'] = this.baseDecisionOfSelectedLetters.reason
        break;
      case 'lapsedWithPay':
        corCode = ""
        body = {
          claimsDetailId: this.claimDetailId,
          dcsnCode: this.baseDecisionOfSelectedLetters.approval,
          policyStatusAtDoe: this.policyStatusAtDoe
        }
        break;
      case 'showClaimRequirementLetter':
        corCode = "CLAIMS_REQUIREMENT_LETTER"
        body = {
          claimsDetailId: this.claimDetailId
        }
        break;
      case 'showClaimRequirementLetterForCI':
        corCode = "CLAIMS_REQUIREMENT_LETTER_RIDER_CI_DISABILITY"
        body = {
          claimsDetailId: this.claimDetailId
        }
        break;
      case 'ndaletter':
        corCode = 'NDA_LETTER'
        body={
          claimsDetailId: this.claimDetailId
        }
        body['dcsnCode'] = this.baseDecisionOfSelectedLetters.approval
        break;
      default:
        flag = false;
    }
    if (flag) {
      finalBody = {
        "claimsDetailId": this.claimDetailId,
        "corCode": corCode,
        "dataJson": body
      }
      console.log(finalBody)
      this.allCommonService.submitLetterInputtoDB(finalBody).subscribe(
        (res: any) => {
          if (res.status == "SUCCESS") {
            this.matDialogService.openCommonDialog("Details Saved Successfully")
          }
          else {
            this.matDialogService.openAlertDialog(res['status'])
          }

        }
      )
    }
  }

  enablePreviewButton(url:string){
    switch (url) {
      case 'suicideletter':
        this.submitSucidePreview = true
        break;
      case 'repudiationletterpreviousinsurance':
        this.submitPreviousInsuranceNonDisclosure = true
        break;
      case 'repudiationlettermedical' :
        this.submitMedicalNonDisclosure = true
        break;
        case 'deathbeforercd' :
          this.submitDeathBeforeRCD = true
          break;
        case 'lapsedwithoutpayletter':
          this.submitLapsedWOPay = true
          break;
        case 'ndaletter':
          this.submitNDAletter = true
          break;
      default:
        console.log("submit button not available for given url")
        break;
    }
  }

  onCloseTask(data) {

    var data = data;
    // if(this.appCode ==)
    this.allCommonService.commonSubmit();
    this.allCommonService.docValidation();
    // this.allCommonService.checkRemarkValidation();
    var getDocData = JSON.parse(localStorage.getItem('docData') || '{}');
    console.log("docData is", getDocData);
    if (Object.keys(getDocData).length != 0) {
      this.allCommonService.checkRemarkValidation();
      var filterdData = getDocData.filter(x => { return x.lookupCd == "DOC_STATUS_RECEIVED" });
      var checkDocStatusRecived = filterdData.some(x => { return x.lookupCd == "DOC_STATUS_RECEIVED" });
      console.log("checkDocStatusRecived", checkDocStatusRecived);
      var checkDocUploaded = filterdData.some(x => { return x.upldDt != null });
      console.log("checkDocUploaded", checkDocUploaded);
      if (checkDocStatusRecived == true && checkDocUploaded == false ) {
        this.allCommonService.docUploadCheck();
      } else {
        this.onColseSucessCall(data);
      }
    } else {
      this.onColseSucessCall(data);
      // var isNomneeValidated = this.allCommonService.getNomineeValidate();
      // this.submitted = true
      // console.log('datadatatat', data);
      // console.log(this.coverageForm.value.remark);
      // console.log(this.coverageForm)
      // console.log(this.coverageData.value)
      // data.coverage.forEach((element: any) => {
      //   element.approval = element.approval
      //   this.approval = element.approval
      //   console.log('element.approval', element.approval)

      // });
      // let flag = true
      // data.coverage.forEach( (ele) => {
      //   if(ele.approval == "ASM_REPUDIATE" || ele.approval == "ASM_INVALID_CLM" || ele.approval == "ASM_ROP" ||
      //      ele.approval == "ASM_REJECT"){
      //       if(ele.coverageType == null || ele.suspicious == null || ele.reason == null || ele.evidenceType == null ){
      //         flag = false
      //       }
      //   }
      //   else{
      //     if( ele.suspicious == null ){
      //       flag = false
      //     }

      //   }
      // }
      // )
      // console.log("this.coverageForm.value.remark",this.coverageForm.value.remark)
      // if(!this.coverageForm.value.remark){
      //   flag = false
      // }
      // var payloadArray = Array();
      // var documentAdded = localStorage.getItem('documentAddedManually');
      // this.checkDOcStatus = localStorage.getItem('checkDOcStatus');
      // this.statusDocChange = localStorage.getItem('docChange');
      // this.cancelStatus = localStorage.getItem('cancelStatus');
      // this.regSave = localStorage.getItem('regSave');
      // if (this.appCode == 'AS' && isNomneeValidated && this.checkDOcStatus=='true' && documentAdded!='true'&&this.statusDocChange!='true' && this.cancelStatus!='true' && this.regSave == 'true') {

      //   // data.coverage.forEach((element: any) => {
      //   // for (let coverage of this.coverageDetails) {
      //   data.coverage.forEach((element: any) => {
      //     this.payload = {
      //       "claimDetailId": this.allCommonService.getClaimsDetailId(),
      //       "coverageCode": element.coverageCode,
      //       "coverageType": element.coverageType,
      //       "coverageDetailId": element.coverageDetailId,
      //       "taskBpmId": this.allCommonService.getTskBpmId(),
      //       "dcsnId": "3",
      //       "dcsnCode": element.approval,
      //       "dcsn_date": "2022-03-02",
      //       "dcsnBy": 3,
      //       "dcsnRsnCode": element.reason,
      //       "suspiciousYn": element.suspicious,
      //       "dcsnEvdnCode": element.evidenceType,
      //       "dcsnRmrks": this.coverageForm.value.remark,
      //     }
      //     payloadArray.push(this.payload);
      //     // }; 
      //   })
      //   // }


      //   var payloadForAS = {
      //     "tskDcsn": this.newDecisionCode?this.newDecisionCode:this.setAccessorDecision,
      //     "coverageSavingInput": payloadArray,
      //     "referralList": null ,
      //     "taskBpmId": this.allCommonService.getTskBpmId(),
      //   }
      //   console.log('coverageSavingInput',payloadForAS)

      //   if(flag){

      //   this.tabDetailsService.closetask(payloadForAS).subscribe((res: any) => {
      //     console.log("response of close taskis::", res);
      //     localStorage.removeItem('nomineeDetails');
      //     if (res.status == 'success' || res.status == 'SUCCESS') {
      //       this.matDialogService.openCommonDialog(res['errorMessages'].toString())
      //       this.router.navigate(['/claims-assessment']);

      //     }
      //     else {
      //       this.matDialogService.openCommonDialog(res['errorMessages'].toString())
      //     }
      //   });
      //   }
      //   else{
      //     this.matDialogService.openCommonDialog(this.commonMessage)
      //   }
      // }

      // else if (this.appCode == 'AP') {

      //   // const payload = {
      //   //   "tskInstncId": this.allCommonService.getTtskInstncId(),
      //   //   "taskBpmId": this.allCommonService.getTskBpmId(),
      //   //   "tskDcsnCode": "APPR_ACCEPT",
      //   //   "tskDcsnRmrks": this.coverageForm.value.remark,
      //   //   "tskDcsnRsnId": ''
      //   // }
      //   data.coverage.forEach((element: any) => {
      //     this.payload = {
      //       "claimDetailId": this.allCommonService.getClaimsDetailId(),
      //       "coverageCode": element.coverageCode,
      //       "coverageType": element.coverageType,
      //       "coverageDetailId": element.coverageDetailId,
      //       "taskBpmId": this.allCommonService.getTskBpmId(),
      //       // "dcsnId": "3",
      //       "dcsnCode": element.approval,
      //       "dcsn_date": "2022-03-02",
      //       "dcsnBy": 3,
      //       "dcsnRsnCode": element.reason,
      //       "suspiciousYn": element.suspicious,
      //       "dcsnEvdnCode": element.evidenceType,
      //       "dcsnRmrks": this.coverageForm.value.remark,
      //     }
      //     payloadArray.push(this.payload);
      //     // }; 
      //   })
      //   var payload = {
      //     "coverageSavingInput": payloadArray
      //   }
      //   if(flag){
      //     console.log('herere');

      //   this.commonService.Approvalclosetask(payload).subscribe((res: any) => {
      //     console.log("response of close approval task is::", res);
      //     if (res.status == 'success' || res.status == 'SUCCESS') {
      //       this.matDialogService.openCommonDialog(res['errorMessages'].toString())
      //       this.router.navigate(['/claims-approval']);

      //     }
      //     else {
      //       this.matDialogService.openCommonDialog(res['errorMessages'].toString())
      //     }
      //   })
      // }
      //   else{
      //     this.matDialogService.openCommonDialog(this.commonMessage)
      //   }
      // }

      // else if (this.appCode == 'PO') {
      //   // this.allCommonService.commonSubmit();
      //   const payload = {
      //     "tskInstncId": this.allCommonService.getTtskInstncId(),
      //     "taskBpmId": this.allCommonService.getTskBpmId(),
      //     "tskDcsnCode": "PAY_APP_ACCEPT",
      //     "tskDcsnRmrks": this.coverageForm.value.remark,
      //     "tskDcsnRsnId": ''
      //   }
      //   if(flag){
      //   this.commonService.Payoutclosetask(payload).subscribe((res: any) => {
      //     console.log("response of close payout task is::", res);
      //     if (res.status == 'success' || res.status == 'SUCCESS') {
      //       this.matDialogService.openCommonDialog(res['errorMessages'].toString())
      //       this.router.navigate(['/claims-payout']);

      //     }
      //   })
      // }
      // else{
      //   this.matDialogService.openCommonDialog(this.commonMessage)
      // }



      // }
    }
  }

  
  // onClose task API call for AS and non AS if doc is already uploaded
  onColseSucessCall(data){
      var isNomneeValidated = this.allCommonService.getNomineeValidate();
      this.submitted = true
      console.log('datadatatat', data);
      console.log(this.coverageForm.value.remark);
      console.log(this.coverageForm)
      console.log(this.coverageData.value)
      data.coverage.forEach((element: any) => {
        element.approval = element.approval
        this.approval = element.approval
        console.log('element.approval', element.approval)
  
      });
      let flag = true
      data.coverage.forEach( (ele) => {
        if(ele.approval == "ASM_REPUDIATE" || ele.approval == "ASM_INVALID_CLM" || ele.approval == "ASM_ROP" ||
           ele.approval == "ASM_REJECT"){
            if(ele.coverageType == null || ele.suspicious == null || ele.reason == null || ele.evidenceType == null ){
              flag = false
            }
        }
        else{
          if( ele.suspicious == null ){
            flag = false
          }
  
        }
      }
      )
      console.log("this.coverageForm.value.remark",this.coverageForm.value.remark)
      if(!this.coverageForm.value.remark){
        flag = false
      }
      var payloadArray = Array();
      var documentAdded = localStorage.getItem('documentAddedManually');
      this.checkDOcStatus = localStorage.getItem('checkDOcStatus');
      this.statusDocChange = localStorage.getItem('docChange');
      this.cancelStatus = localStorage.getItem('cancelStatus');
      this.regSave = localStorage.getItem('regSave');
      if (this.appCode == 'AS' && isNomneeValidated && this.checkDOcStatus=='true' && documentAdded!='true'&&this.statusDocChange!='true' && this.cancelStatus!='true' && this.regSave == 'true') {
       
        // data.coverage.forEach((element: any) => {
        // for (let coverage of this.coverageDetails) {
        data.coverage.forEach((element: any) => {
          this.payload = {
            "claimDetailId": this.allCommonService.getClaimsDetailId(),
            "coverageCode": element.coverageCode,
            "coverageType": element.coverageType,
            "coverageDetailId": element.coverageDetailId,
            "taskBpmId": this.allCommonService.getTskBpmId(),
            "dcsnId": "3",
            "dcsnCode": element.approval,
            "dcsn_date": "2022-03-02",
            "dcsnBy": 3,
            "dcsnRsnCode": element.reason,
            "suspiciousYn": element.suspicious,
            "dcsnEvdnCode": element.evidenceType,
            "dcsnRmrks": this.coverageForm.value.remark,
          }
          payloadArray.push(this.payload);
          // }; 
        })
        // }
  
  
        var payloadForAS = {
          "tskDcsn": this.newDecisionCode?this.newDecisionCode:this.setAccessorDecision,
          "coverageSavingInput": payloadArray,
          "referralList": null ,
          "taskBpmId": this.allCommonService.getTskBpmId(),
        }
        console.log('coverageSavingInput',payloadForAS)
        
        if(flag){
  
        this.tabDetailsService.closetask(payloadForAS).subscribe((res: any) => {
          console.log("response of close taskis::", res);
          localStorage.removeItem('nomineeDetails');
          if (res.status == 'success' || res.status == 'SUCCESS') {
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
            this.router.navigate(['/claims-assessment']);
  
          }
          else {
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          }
        });
        }
        else{
          this.matDialogService.openCommonDialog(this.commonMessage)
        }
      }
  
      else if (this.appCode == 'AP') {
  
        // const payload = {
        //   "tskInstncId": this.allCommonService.getTtskInstncId(),
        //   "taskBpmId": this.allCommonService.getTskBpmId(),
        //   "tskDcsnCode": "APPR_ACCEPT",
        //   "tskDcsnRmrks": this.coverageForm.value.remark,
        //   "tskDcsnRsnId": ''
        // }
        data.coverage.forEach((element: any) => {
          this.payload = {
            "claimDetailId": this.allCommonService.getClaimsDetailId(),
            "coverageCode": element.coverageCode,
            "coverageType": element.coverageType,
            "coverageDetailId": element.coverageDetailId,
            "taskBpmId": this.allCommonService.getTskBpmId(),
            // "dcsnId": "3",
            "dcsnCode": element.approval,
            "dcsn_date": "2022-03-02",
            "dcsnBy": 3,
            "dcsnRsnCode": element.reason,
            "suspiciousYn": element.suspicious,
            "dcsnEvdnCode": element.evidenceType,
            "dcsnRmrks": this.coverageForm.value.remark,
          }
          payloadArray.push(this.payload);
          // }; 
        })
        // var payload = {
        //   "coverageSavingInput": payloadArray
        // }
        var payload = {
          "tskDcsn": "APPR_ACCEPT",
          "coverageSavingInput": payloadArray,
          "referralList": null ,
          "taskBpmId": this.allCommonService.getTskBpmId(),
        }
        if(flag){
          console.log('herere', payload);
          
        this.commonService.Approvalclosetask(payload).subscribe((res: any) => {
          console.log("response of close approval task is::", res);
          if (res.status == 'success' || res.status == 'SUCCESS') {
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
            this.router.navigate(['/claims-approval']);
  
          }
          else {
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          }
        })
      }
        else{
          this.matDialogService.openCommonDialog(this.commonMessage)
        }
      }
  
      else if (this.appCode == 'PO') {
        // this.allCommonService.commonSubmit();
        const payload = {
          "tskInstncId": this.allCommonService.getTtskInstncId(),
          "taskBpmId": this.allCommonService.getTskBpmId(),
          "tskDcsnCode": "PAY_APP_ACCEPT",
          "tskDcsnRmrks": this.coverageForm.value.remark,
          "tskDcsnRsnId": ''
        }
        if(flag){
        this.commonService.Payoutclosetask(payload).subscribe((res: any) => {
          console.log("response of close payout task is::", res);
          if (res.status == 'success' || res.status == 'SUCCESS') {
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
            this.router.navigate(['/claims-payout']);
  
          }
        })
      }
      else{
        this.matDialogService.openCommonDialog(this.commonMessage)
      }
  
  
  
      }
    
  }

  referBack() {
     if (this.appCode == "PO" || this.appCode == "AP") {
      this.referBackButton = true;
      this.requirementhidden = false;
      this.decisionhidden = false;
    }
  }
  onCancelReferBack() {
    this.referBackButton = false;
  }
  onReferBackDecision() {
    console.log('decisionForm', this.referBackDecisionForm.value,)
    console.log(this.referBackDecisionForm.value.referBackDecision);
    this.referBackDecisionForm.markAllAsTouched();

    if (this.appCode == 'PO') {
      const payload = {
        "tskInstncId": this.allCommonService.getTtskInstncId(),
        "taskBpmId": this.allCommonService.getTskBpmId(),
        "tskDcsnCode": this.referBackDecisionForm.value.referBackDecision,
        "tskDcsnRmrks": this.referBackDecisionForm.value.remark,
        "tskDcsnRsnId": ''
      }
      if(this.referBackDecisionForm.valid){
          console.log(payload, 'payload in referBack PO');
          this.commonService.Payoutclosetask(payload).subscribe((res: any) => {
            console.log("response of close payout task is::", res);
            if (res.status == 'success' || res.status == 'SUCCESS') {
              this.matDialogService.openCommonDialog(res['errorMessages'].toString())
              this.router.navigate(['/claims-payout']);
            }
          })
      }else {
        this.matDialogService.openCommonDialog('Please select the radio button and enter remarks')
      }
    }else if (this.appCode == 'AP') {
        const payload = {
        "tskInstncId": this.allCommonService.getTtskInstncId(),
        "taskBpmId": this.allCommonService.getTskBpmId(),
        "tskDcsnCode": "SEND_BACK",
        "tskDcsnRmrks": this.referBackDecisionForm.value.remark,
        "tskDcsnRsnId": ''
      }
      if (this.referBackDecisionForm.get('remark')?.valid) {
        console.log(payload, 'payload in referBack AP');

        this.commonService.referBack(payload).subscribe((res: any) => {
          console.log("response of refer back task is::", res);
          if (res.status == 'success' || res.status == 'SUCCESS') {
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
            this.router.navigate(['/claims-approval']);
          }else{
            this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          }
        });
      } else {
        this.matDialogService.openCommonDialog(this.commonMessage);
      }
    }
  }

  getDecision() {
    this.loockUpService.getDecision().subscribe((res: any) => {
      this.decisionlist = res;
    })
  }
  getEvdnce() {
    this.loockUpService.getEvdnce().subscribe((res: any) => {
      this.evdncelist = res.content;
    })
  }


  getReason() {
    this.loockUpService.getReason().subscribe((res: any) => {
      this.reasonlist = res.content;
    })
  }

  getdecisionRequirement() {
    this.loockUpService.getdRequirementList().subscribe((res: any) => {
      this.decisionReList = res.content;
    })
  }

  getReferralOpinionList() {
    this.loockUpService.fetchBySetName("REFERRAL_TYPE").subscribe((data: any) => {
      console.log('REFERRAL_TYPE',data );
      data.content.forEach( ele => {
        ele['showRemark']= true;
        
        this.addReferralData(ele);
        }
      )
      this.referrals = data.content;
      console.log(this.referrals)
    })
  }

    userChange(user){
      this.selectUser = user;
    }

    showremark(value:any,i){
      // let loginId = this.referFormGroups.controls[i].get('user')?.value

      
      this.referrals.forEach(ele => {
        if(this.getReferralFlag){
          this.commonService.getReferralUsers(ele.lookupCd).subscribe((res)=>{
            // 'REFERRAL_TYPE_LEGAL_OPINION'
            this.referralUsers.push(res)
            console.log(res)
            this.getReferralFlag = false
            
          });
        }
        if(ele.lookupCd == value){

          if(ele.showRemark == false){
            //this.removeReferralData(i)
            const index = this.selectedCheckBox.indexOf(value);
            if (index > -1) { // only splice array when item is found
              this.selectedCheckBox.splice(index, value); // 2nd parameter means remove one item only
            }
            this.referFormGroups.controls[i].get('remarks')?.removeValidators(Validators.required)
            this.referFormGroups.controls[i].get('user')?.removeValidators(Validators.required)
            this.referFormGroups.controls[i].updateValueAndValidity()
            console.log(this.selectedCheckBox)

          }else{  //this.addReferralData(ele);
          this.referFormGroups.controls[i].get('remarks')?.addValidators(Validators.required)
          this.referFormGroups.controls[i].get('user')?.addValidators(Validators.required)
          this.referFormGroups.controls[i].updateValueAndValidity()
          console.log(this.referFormGroups)
          this.selectedCheckBox.push(value)
          }
          ele.showRemark = !ele.showRemark;
          console.log(this.selectedCheckBox)
          if(this.selectedCheckBox.length <= 0){
            this.isRefButtonDisable = true
          }
          else{
            this.isRefButtonDisable = false
          }

        }
    })
  }

  beforeSubmitAPICall(covFormValue, refFormValue?,decisionCode?) {
    // console.log(this.decisionRequirementForm.value);
    // console.log(this.decisionRequirementForm.value.remark);    
    this.decisionRequirementForm.markAllAsTouched();
    // this.tabDetailsService.checkTaskDetails('1234').subscribe()
    console.log('decisionCodes', decisionCode);
    this.newDecisionCode = decisionCode;
    console.log(this.setAccessorDecision)
    console.log(covFormValue)
    let decision = ""
    if ((this.taskCode == 'ASSESSMENT_TSK' || this.taskCode == 'AWAIT_ASSESSMENT_REQ') && this.appCode=="AS") {
      if (!this.setAccessorDecision) {
        this.matDialogService.openAlertDialog("Kindly Select your decision")
        return;
      }
      else {
        if (this.setAccessorDecision == "ASM_ACCEPT") {
          decision = covFormValue.coverage[0].approval
        }else if(this.setAccessorDecision == "SEND_TO_AWAIT"){
          // console.log('send to await is working without validations');
          // console.log(this.setAccessorDecision);
          this.onAwaitCloseTask(this.decisionRequirementForm.value);
        }
        else {
          decision = this.setAccessorDecision
        }
      }
      console.log(decision)
      if ((this.taskCode == 'ASSESSMENT_TSK' || this.taskCode == 'AWAIT_ASSESSMENT_REQ')) {
            this.tabDetailsService.checkTaskDetails(this.claimDetailId, decision).subscribe((res: any) => {
              if (res.status == "SUCCESS") {
                console.log(res)
                this.onSuubmitFunctionCall(covFormValue, refFormValue) 
              }
              else {
                // this.dialogCommonRef = this.dialog.open(CommonAlertComponent, {
                //   width: '600px',
                //   height: 'auto',
                //   panelClass: 'confirmpopup',
                //   disableClose: true,
                //   data: {
                //     message: res['statusMsg'],
                //     type: 'editNomineeForm'

                //   },
                // });
                // this.dialogCommonRef.afterClosed().subscribe(data => {
                //   if (data == "Yes") {
                //     console.log("yes")
                //    //this.onSuubmitFunctionCall(covFormValue, refFormValue) 
                //   }
                // })
                this.matDialogService.openAlertDialog(res['statusMsg'])
              }
            })
      }
      else{
        this.onSuubmitFunctionCall(covFormValue, refFormValue)
      }
    }
    else {
      // this.matDialogService.openAlertDialog("IN ELSE")
      this.onSuubmitFunctionCall(covFormValue, refFormValue)
    }
  }
  
  onSuubmitFunctionCall(covFormValue, refFormValue?) {
    if (this.appCode == 'AS') {
      // if (this.taskCode == 'AWAIT_ASSESSMENT_REFERRAL') {
      //   this.matDialogService.openCommonDialog(this.commonMessageForAwait)
      // }
      // else 
      // console.log(" console.log('decisionCodes', decisionCode)", this.setAccessorDecision);
      if (this.setAccessorDecision == "ASM_RE_REG") {
        this.onCloseReRegestration(this.reRegestrationForm.controls['reRegestrationRemark'].value);
      }
      else if (this.referralOnlyTaskDisplay()) {
        this.onCloseReferralOpinion();
       
      }
      else {
        if (this.setAccessorDecision == "ASM_ACCEPT") {

          this.onCloseTask(covFormValue);
        }

        else if (this.setAccessorDecision == "ASM_REFERRAL") {
          this.onClosereferral(covFormValue, refFormValue);
        }
      }
    }else if(this.appCode == 'AP' && this.taskCode == 'CRC_TSK'){
      // payLoad generation for crc
      console.log('its payLoad working for CRC_TSK');
      console.log(this.newDecisionCode,'decisionCode');
      this.onCrcCloseTask();
      
    }
    else {
      this.onColseSucessCall(covFormValue);
    }
  }

  onCloseReferralOpinion() {

    this.payload = {
      "claimsDetailId": this.allCommonService.getClaimsDetailId(),
      "tskInstncId": this.allCommonService.getTtskInstncId(),
      "taskBpmId": this.allCommonService.getTskBpmId(),
      "tskDcsnCode": this.refDict[this.taskCode],
      "tskDcsnRmrks": this.referralOpinionForm.value.referralRemark
    }
    console.log('referralOpinion', this.payload)
    if(this.referralOpinionForm.valid){
    console.log('referralOpinion', this.payload)


    this.tabDetailsService.referralOpinionCloseTask(this.payload).subscribe((res: any) => {
      console.log("response of close taskis::", res);
      localStorage.removeItem('nomineeDetails');
      if (res.status == 'success' || res.status == 'SUCCESS') {
        this.matDialogService.openCommonDialog(res['errorMessages'].toString())
        this.router.navigate(['/claims-assessment']);

      }
      else {
        this.matDialogService.openCommonDialog(res['errorMessages'].toString())
      }
    });
  }
  else{
    this.matDialogService.openCommonDialog(this.commonMessage)
  }
  }


  onClosereferral(data, referralData){
    console.log('its working formcontrolname coverage', data)
    console.log('its a referralData', referralData)
    this.allCommonService.commonSubmit();
    this.allCommonService.docValidation();
    var isNomneeValidated = this.allCommonService.getNomineeValidate();
    this.submitted = true
    this.referralFormsValue = referralData;
    this.referFormGroups.status
    
    var payloadArray = Array();
    var payloadArrayReferral = Array();
    if (this.appCode == 'AS' && isNomneeValidated ) {
      
      // data.coverage.forEach((element: any) => {
      // for (let coverage of this.coverageDetails) {
      data.coverage.forEach((element: any) => {
        this.payload = {
          "claimDetailId": this.allCommonService.getClaimsDetailId(),
          "coverageCode": element.coverageCode,
          "coverageType": element.coverageType,
          "coverageDetailId": element.coverageDetailId,
          "taskBpmId": this.allCommonService.getTskBpmId(),
          "dcsnId": "3",
          "dcsnCode": element.approval,
          "dcsn_date": "2022-03-02",
          "dcsnBy": 3,
          "dcsnRsnCode": element.reason,
          "suspiciousYn": element.suspicious,
          "dcsnEvdnCode": element.evidenceType,
          "dcsnRmrks": this.coverageForm.value.remark,
        }
        payloadArray.push(this.payload);
        // }; 
      })
      console.log(this.selectedCheckBox);
      
      referralData.referralsFormArray.forEach((element:any) => {
        console.log(element)
        
        if(this.selectedCheckBox.includes(element.referralType)){
        this.payloadReferral = {
           "claimsDetailId": this.allCommonService.getClaimsDetailId(),
            "referralType":element.referralType,
            "refUser":element.user,
            "asmRemarks":element.remarks
        }
        payloadArrayReferral.push(this.payloadReferral);  
      }     
      });
      // }
    
      var payloadAssessment = {
        "tskDcsn": this.newDecisionCode?this.newDecisionCode:this.setAccessorDecision,
        "coverageSavingInput": payloadArray,
        "referralList": payloadArrayReferral,
        "taskBpmId": this.allCommonService.getTskBpmId(),
      }
    
      console.log('Assessment Payload',payloadAssessment)
      if(!(this.referralForm.invalid || this.isRefButtonDisable)){
        console.log('here')
      this.tabDetailsService.closetask(payloadAssessment).subscribe((res: any) => {
        console.log("response of close taskis::", res);
        localStorage.removeItem('nomineeDetails');
        if (res.status == 'success' || res.status == 'SUCCESS') {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          this.router.navigate(['/claims-assessment']);

        }
        else {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
        }
      });
    }
    else{
      this.matDialogService.openCommonDialog(this.commonMessage)
    }
      }
    
    }

    reRegestration(){
      this.reRegestrationVisible = true;
      this.requirementhidden = false;
      this.decisionhidden = false;
      this.decisionRequirementShow=false;
      this.setAccessorDecision = "ASM_RE_REG";
      console.log(this.setAccessorDecision);
      console.log(this.reRegestrationVisible);
      console.log('its reRegestration')
    }

    onCloseReRegestration(remark){
      var payloadForAS = {
        "tskDcsn": this.setAccessorDecision,
        "coverageSavingInput": null,
        "referralList": null,
        "taskBpmId": this.allCommonService.getTskBpmId(),
        "tskDcsnRemarks": remark,
      }
      if(this.reRegestrationForm.valid){
      console.log('reRegestration',payloadForAS);
      this.tabDetailsService.closetask(payloadForAS).subscribe((res: any) => {
        console.log("response of close taskis::", res);
        localStorage.removeItem('nomineeDetails');
        if (res.status == 'success' || res.status == 'SUCCESS') {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          this.router.navigate(['/claims-assessment']);
        }
        else {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
        }
      });
    }
  }

  onAwaitCloseTask(formValue){
    console.log('its await task closing', formValue);
    this.payload = {
      "awaitAction": formValue.decisionRequirement,
      "tskDcsn": this.setAccessorDecision,
      "coverageSavingInput": [],
      "referralList": [],
      "taskBpmId": this.allCommonService.getTskBpmId(),
      "tskDcsnRemarks": formValue.decisionrequirementRemark
    }
    
    console.log('this is payLoad for awaitCloseTask', this.payload);
    if(this.decisionRequirementForm.valid){

      this.tabDetailsService.closetask(this.payload).subscribe((res: any) => {
        console.log("response of close taskis::", res);
        localStorage.removeItem('nomineeDetails');
        if (res.status == 'success' || res.status == 'SUCCESS') {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          this.router.navigate(['/claims-assessment']);
        }
        else {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
        }
      });
    }
    else{
      this.matDialogService.openCommonDialog(this.commonMessage)
    }
      
  }

  onCrcCloseTask(){
    console.log(this.taskCode);
    
    this.payload = {
      "claimsDetailId": this.allCommonService.getClaimsDetailId(),
      "tskInstncId": this.allCommonService.getTtskInstncId(),
      "taskBpmId": this.allCommonService.getTskBpmId(),
      "tskDcsnCode": this.newDecisionCode,
      "tskDcsnRmrks": this.referralOpinionForm.value.referralRemark
    }
    // console.log('crcOpinionPayLoad', this.payload)
    if(this.referralOpinionForm.valid){
     console.log('crcOpinionPayLoad', this.payload)
      this.tabDetailsService.crcCloseTask(this.payload).subscribe((res:any) => {
        console.log('crcCloseTask response from api');
        localStorage.removeItem('nomineeDetails');
        if (res.status == 'success' || res.status == 'SUCCESS') {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
          this.router.navigate(['/claims-assessment']);

        }
        else {
          this.matDialogService.openCommonDialog(res['errorMessages'].toString())
        }
      });
  }
  else{
    this.matDialogService.openCommonDialog(this.commonMessage)
  }
  }

    onYesClick(){
      this.reRegestrationRemark = true;
    }

    onNoClick(){
      this.reRegestrationRemark = false;
      this.reRegestrationVisible = false;
    }

    onCancelButton(){
      this.allCommonService.onCancelButton();
    }
}                                                                              
