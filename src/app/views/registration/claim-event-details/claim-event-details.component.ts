import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { LookupService } from '../services/lookup/lookup.service';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { ClaimDetailsValidator } from '../validators/claim-details-validator';
import { MatDialog } from '@angular/material/dialog';
import { ErrorStateMatcher } from '@angular/material/core';
import { RoleDetailsService } from '../services/common-service/role-details.service';
import { AllCommonService } from '../services/common-service/all-common.service';
import { CrossFieldErrorMatcherforDateOfAccident, CrossFieldErrorMatcherforDateOfEvent, CrossFieldErrorMatcherforHospitalName, CrossFieldErrorMatcherforLateIntemation, CrossFieldErrorMatcherforPlaceOfDeath, CrossFieldErrorMatcherforRemarkInt, CrossFieldErrorMatcherforSecondaryCauseOfEvent,CrossFieldErrorMatcherforClaimEvent,CrossFieldErrorMatcherNew } from '../ErrorStateMatcher/ErrorStatematcherValidators-claim-event';


/** Error when the parent is invalid */

class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // var controlDirty=control?.['dirty']||false;
    var formStatus=form?.form.status;
    console.log(control)
    // return controlDirty && formStatus=="INVALID";
    if(form?.touched && (control?.touched || control?.dirty)){
      return formStatus=="INVALID" && form.errors != null
    }
    return false;
  };
}
@Component({
  selector: 'app-claim-event-details',
  templateUrl: './claim-event-details.component.html',
  styleUrls: ['./claim-event-details.component.scss']
})
export class ClaimEventDetailsComponent implements OnInit {

  isDeath: Boolean = false;
  isCriticalIllness: Boolean = true;
  isDisability: Boolean = false;
  reEnterIntimationTimeHasData = false;

  isDisableDateOfAccident: Boolean = false;
  errorMatcherNew = new CrossFieldErrorMatcherNew
  errorMatcherForPlaceOfDeath = new CrossFieldErrorMatcherforPlaceOfDeath()
  errorMatcherForDateOfEvent = new CrossFieldErrorMatcherforDateOfEvent()
  errorMatcherForDateOfAccident = new CrossFieldErrorMatcherforDateOfAccident()
  errorMatcherForLateIntemation = new CrossFieldErrorMatcherforLateIntemation()
  errorMatcherforHospitalName= new CrossFieldErrorMatcherforHospitalName();
  errorMatcher = new CrossFieldErrorMatcher();
  errorMatcherforRemarkInt = new CrossFieldErrorMatcherforRemarkInt();
  errorMatcherforSecondaryCauseOfEvent = new CrossFieldErrorMatcherforSecondaryCauseOfEvent();
  errorMatcherForClaimEvent = new CrossFieldErrorMatcherforClaimEvent();
  isDisabled: boolean = false
  myForm!: FormGroup;
  eventAndClaimForm!: FormGroup;
  submitted: boolean = false;
  max_Date = new Date()
  min_Date = new Date();
  claimList: any = [];
  claimListClone: any = [];
  claimDeath: any = [];
  eventType: any = [];
  causeofDeath: any = [];
  placeofDeath: any = [];
  organImpact: any = [];
  secondary_event_Cause: any = [];
  intimatedBy: any = [];
  payoutOption: any = [];
  death: any = [];
  disability: any = [];
  criticalIllness: any = [];

  dropdownvalue: any = [];
  source: any;
  response: any;
  // claimType:any=[];
  showHosptitalDetails:Boolean = false
  realationLifeAssured: any = [];
  claimDetails: any = {};
  appCode: any;
  eventDetails: any;
  claimTypeDisp: any
  claimSource: any=[];
  // showClaimIntemationDate:boolean = true
  // showClaimIntemationTime:boolean = true
  // showDateofEvent:boolean = true
  selectUser;
  constructor(
    private matDialogService: MatDialogService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private policyService: PolicyService,
    private intimationService: IntimationService,
    public dialog: MatDialog,
    private claimDetailsValidator: ClaimDetailsValidator,
    private tabDetailsService: RoleDetailsService,
    private allCommonService: AllCommonService,
    private roleService:RoleDetailsService

  ) {


  }
  clientId: any;
  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode')
    var val = localStorage.getItem("ClaimDetails");
    this.clientId = this.intimationService.getClientId()
    console.log('this.clientId::::', this.clientId)
    var policy = this.intimationService.getPolicyno();
    console.log("policyno>>>>",policy)
    this.createForm();
    this.registerEvents();
   
    if (this.appCode == "CI") { // NOT CR TO CI
      this.getAllCLaimList();
      this.getAllDeathClaim();
      this.getAlleventType();
      this.getAllcauseofDeath();
      this.getAllplaceofDeath();
      this.getAllorganImpact();
      this.getAllsecondaryEvent();
      this.getAllintimatedBy();
      this.getAllrealationLifeAssured();
      this.getpayoutOption();
      this.getcriticalIllness();
      this.getDisability();
      this.getDeath();
      this.getSource();
    }
    this.min_Date.setMonth(this.max_Date.getMonth() - 600);
    this.patchData();
    // this.fetchTabDataService();
  }
  // fetchTabDataService() {
  //   this.tabDetailsService.getroleDetails().subscribe((res: any) => {
  //     console.log(res);
  //     this.response = res;
  //     this.allCommonService.setAllTabData(res)
  //     this.allCommonService.passValue(this.response);
  //     localStorage.setItem('allTabCIData', JSON.stringify(this.response));
  //   })
  // }

  // maskedInput(){
  //   if(this.myForm.get('intimationTime')?.value != ""){
  //     this.reEnterIntimationTimeHasData = true;
  //     return
  //   }
  //   this.reEnterIntimationTimeHasData = false;
  // }


  registerEvents() {
    
    this.myForm.get('claimType')?.valueChanges.subscribe(value => {
      this.claimTypeChange(value, "EVENT");
    });

    this.myForm.get('eventCause')?.valueChanges.subscribe(value => {
      this.CauseofeventChange(value);
    });

  }
 
  createForm() {
    this.myForm = this.fb.group({
      clientId: this.clientId,
      claimSource: ['',Validators.required],
      claimType: [''],
      // deathClaim: ['',Validators.required],
      currentPolicy: [''],
      ClaimDate: [''],
      ReenterClaimDate: ['',Validators.required],
      intimationTime: ['',Validators.required],
      ReenterIntimationTime: ['',Validators.required],
      // EventType: ['',Validators.required],
      eventCause: ['',Validators.required],
      PlaceDeath: [''],
      DateAccident: [''],
      eventDate: ['',Validators.required],
      ReenterDate: ['',Validators.required],
      reason_for_late_Intimation: [''],
      Organ: [''],
      hospitalName: [''],
      secondary_event_Cause: [''],
      IntimatedBy: [''],
      Relation: [''],
      payoutOption: [''],
      remark: [''],
      hospitalLocation:[''],
      doctorName:[''],
      treatmentDetails:[''], 
      hospitalAddress: ['']
    },
      {
        validators: [
          this.mustMatch('ClaimDate', 'ReenterClaimDate'),
          this.mustMatch('eventDate', 'ReenterDate'),
          this.MustMatchTime('intimationTime', 'ReenterIntimationTime')
          ,
          this.claimDetailsValidator.reasonforlateIntimation
          , this.claimDetailsValidator.Date_Accident
          , this.claimDetailsValidator.remark_Intimated,
          this.claimDetailsValidator.SecondaryCauseEvent,
          this.claimDetailsValidator.hospital_Name,
          this.claimDetailsValidator.placeofDeath,
          this.claimDetailsValidator.dateofaccident_lessthan_claimintimation,
          this.claimDetailsValidator.dateofevent,
          this.claimDetailsValidator.alphabets,
          this.claimDetailsValidator.murder_Selection,
          this.claimDetailsValidator.doe_Changed,
         // this.claimDetailsValidator.causeofEvent,
          // this.claimDetailsValidator.dateofevent_accident,
        ]
      }
    );

  }
  claimTypeChange(value, stage) {

    console.log(value);
    this.isDeath = false;
    this.isCriticalIllness = false;
    this.isDisability = false;
    if (value == 'CLAIM_TYPE_DEATH') {
      this.dropdownvalue = this.death;
      this.isDeath = true;
      this.myForm.controls['eventCause'].setValue(null)
    }
    else if (value == 'CLAIM_TYPE_CI') {
      this.dropdownvalue = this.criticalIllness;
      this.isCriticalIllness = true;
      this.myForm.controls['eventCause'].setValue(null)
    }
    else if (value == 'CLAIM_TYPE_DISABILITY') {
      this.dropdownvalue = this.disability;
      this.isDisability = true;
      this.myForm.controls['eventCause'].setValue(null)
    }
    if (stage === "INIT") {
      this.myForm.patchValue({
        eventCause:  this.claimDetails.eventCause
      });
    }
    
    this.myForm.setErrors(this.claimDetailsValidator.causeofEvent)
    this.myForm.controls['eventCause'].updateValueAndValidity()
  }

  // claimIntemationDateChange(){
  //   this.showClaimIntemationDate = false
  // }
  // dateofEventChange(){
  //   this.showDateofEvent = false
  // }

  CauseofeventChange(value) {

    console.log("Form Values before",this.myForm.get('DateAccident')?.value)

    this.isDisableDateOfAccident = false;
    this.myForm.controls["DateAccident"].removeValidators(Validators.required);

    if (value == 'EVENT_CAUSE_MURDER' || value == 'EVENT_CAUSE_ACIDENT') {
      this.myForm.controls["DateAccident"].setValidators(Validators.required);
      this.isDisableDateOfAccident = true;
    }
    else{
      let val = this.myForm.get('DateAccident')?.value
      if(!(val in ['',undefined,null])){
      this.myForm.controls['DateAccident'].setValue('')
      // this.myForm.controls['DateAccident'].markAsTouched();
      // this.myForm.controls['DateAccident'].markAsDirty();
      this.myForm.controls['DateAccident'].updateValueAndValidity();
      }
    }
    console.log("Form Values after",this.myForm.get('DateAccident')?.value)

  }

  patchData() {
    var val = localStorage.getItem("ClaimDetails");
    var claimDetails;
    if (val != null) {
      claimDetails = JSON.parse(val);
      this.claimDetails=claimDetails;
      if(this.claimDetails.PlaceDeath == 'PLACE_OF_DEATH_HOSPITAL'){
        this.showHosptitalDetails = true
      }
      this.myForm.patchValue({
        clientId: this.clientId,

        claimSource: claimDetails.claimSource,
        claimType: claimDetails.claimType
        , deathClaim: claimDetails.deathClaim
        , currentPolicy: claimDetails.currentPolicy
        , ClaimDate: claimDetails.ClaimDate
        , ReenterClaimDate: claimDetails.ReenterClaimDate
        , intimationTime: claimDetails.intimationTime
        , ReenterIntimationTime: claimDetails.ReenterIntimationTime
        , EventType: claimDetails.EventType
        , eventCause: claimDetails.eventCause
        , PlaceDeath: claimDetails.PlaceDeath
        , DateAccident: claimDetails.DateAccident
        , eventDate: claimDetails.eventDate
        , ReenterDate: claimDetails.ReenterDate
        , reason_for_late_Intimation: claimDetails.reason_for_late_Intimation
        , Organ: claimDetails.Organ
        , hospitalName: claimDetails.hospitalName
        , secondary_event_Cause: claimDetails.secondary_event_Cause
        , IntimatedBy: claimDetails.IntimatedBy
        , Relation: claimDetails.Relation
        , payoutOption: claimDetails.payoutOption
        , remark: claimDetails.remark
        ,hospitalLocation:claimDetails.hospitalLocation
        ,doctorName:claimDetails.doctorName
        ,treatmentDetails:claimDetails.treatmentDetails
        ,hospitalAddress:claimDetails.hospitalAddress
      })

    } else {
      this.claimDetails={
        claimType:""
      }
    }

  }



  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      // set error on matchingControl if validation fails
      if (moment(control.value).format('DD/MM/YYYY') !== moment(matchingControl.value).format('DD/MM/YYYY')) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    }
  }


  MustMatchTime(controlTime: string, matchingControltime: string) {
    return (formGroup: FormGroup) => {
      const Timecontrol = formGroup.controls[controlTime];
      const timematchingControl = formGroup.controls[matchingControltime];

      if (timematchingControl.errors && !timematchingControl.errors['MustMatchTime']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (Timecontrol.value !== timematchingControl.value) {
        timematchingControl.setErrors({ MustMatchTime: true });
      } else {
        timematchingControl.setErrors(null);
      }
    }

  }


  // onChnageOfStartDate() {
  //   this.myForm.controls['ReenterClaimDate'].setValue(this.myForm.controls['ClaimDate'].value)
  // }


  // onChnageOfStartDate1() {
  //   this.myForm.controls['ReenterDate'].setValue(this.myForm.controls['eventDate'].value)
  // }

  onChnageOfClaimeTime() {
  //  this.showClaimIntemationTime = false
  //  this.myForm.controls['ReenterIntimationTime'].setValue(this.myForm.controls['intimationTime'].value)
  }





  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }
  clearData() {
    this.reEnterIntimationTimeHasData = false;
    // this.showClaimIntemationDate = true
    // this.showClaimIntemationTime =true
    // this.showDateofEvent = true

  }

  // onSelected(){


  //  if ('CLAIM_TYPE_DEATH'==this.death){

  //    this.dropdownvalue = this.death;
  //  }
  //  else if(this.claimDetails.CLAIM_TYPE_CI==this.criticalIllness){
  //      this.dropdownvalue=this.criticalIllness;
  //  }
  //  else if(this.claimDetails.CLAIM_TYPE_DISABILITY==this.disability)
  //  {
  //      this.dropdownvalue = this.disability;
  //  }

  // //  this.claimDetails.criticalIllness==this.criticalIllness
  // }

  // onSelect(claimList){

  //   console.log("Selected Type of claim",claimList.target.value);
  //   // console.log('------');
  //   // // send selected value
  //   // this.seletedValue.emit('');

  // }


  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
    var payload = {
      "eventDate": this.myForm.value.eventDate,
      "eventCause": this.myForm.value.eventCause,
      "claimType": this.myForm.value.claimType,
      "clientId": this.clientId,
      // "claimSource":this.myForm.value.source,
    }
    //  if (this.myForm.valid) {
    // this.policyService.getprofiledata(payload).subscribe((res: any) => {
    //   this.policyService.setClaimData(res);
    //   localStorage.setItem('eventDetails',JSON.stringify(res));
    //   // this.router.navigate(['/claims-intimation/claim-profile']);

    // })
    //  }

    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      console.log("Success")
      this.policyService.getprofiledata(payload).subscribe((res: any) => {
        if(res){
          // this.getDocDettails()
        }
        this.policyService.setClaimData(res);
        localStorage.setItem('eventDetails', JSON.stringify(res));
        this.router.navigate(['/claims-intimation/claim-profile']);

      })
    }
    else {
      console.log("Error")
    }

    // this.claimDetails =Object.assign(this.claimDetails, this.myForm.value);
    localStorage.setItem('ClaimDetails', JSON.stringify(this.myForm.value));
    this.claimDetails;

  }

  // getDocDettails(){
  //   var policyId = localStorage.getItem('policyId');
  //   console.log("policyId",policyId)
  //   var reqParam = {
  //     "policyNumber": policyId,
  //     "policyStatus": "123",
  //     "claimType": this.myForm.value.claimType,
  //     "causeType": this.myForm.value.eventCause,
  //     "dateOfEvent": this.myForm.value.eventDate
  //   }
  //   this.roleService.getDocData(reqParam).subscribe((res: any) => {
  //     console.log("res::::",res)
  //     this.allCommonService.setDocDetailsData(res)
  //   });
  // }
  getAllCLaimList() {
    this.lookupService.getClaimlist().subscribe((data: any) => {
      this.claimList = data.content
      // localStorage.removeItem('nomineeDetails');
      // console.log("Type of Claim ", this.claimList)
      // return this.claimList;
    })
  }
 
  claimType(user){
    this.selectUser = user;
    localStorage.removeItem('nomineeDetails');
    localStorage.removeItem('selectedDocData');
  }

  getAllDeathClaim() {
    this.lookupService.getClaimdeath().subscribe((data: any) => {
      this.claimDeath = data.content
    })
  }

  getAlleventType() {
    this.lookupService.geteventType().subscribe((data: any) => {
      this.eventType = data.content

    })
  }

  getAllcauseofDeath() {
    this.lookupService.getcauseofDeath().subscribe((data: any) => {
      this.causeofDeath = data.content
    }
    )
  }

  getAllplaceofDeath() {
    this.lookupService.getplaceofDeath().subscribe((data: any) => {
      this.placeofDeath = data.content
    }
    )
  }

  getAllorganImpact() {
    this.lookupService.getorganImpact().subscribe((data: any) => {
      this.organImpact = data.content
    }
    )
  }

  getAllsecondaryEvent() {
    this.lookupService.getsecondaryEvent().subscribe((data: any) => {
      this.secondary_event_Cause = data.content
    })
  }

  getAllintimatedBy() {
    this.lookupService.getintimatedBy().subscribe((data: any) => {
      this.intimatedBy = data.content
    }
    )
  }

  getAllrealationLifeAssured() {
    this.lookupService.getrealationlifeAssured().subscribe((data: any) => {
      this.realationLifeAssured = data.content
    }
    )
  }

  getpayoutOption() {
    this.lookupService.getpayoutOption().subscribe((data: any) => {
      this.payoutOption = data.content
    })
  }


  getcriticalIllness() {
    this.lookupService.fetchBySetName("CLAIM_TYPE_CI").subscribe((data: any) => {
      this.criticalIllness = data.content;
      this.claimTypeChange(this.claimDetails.claimType, "INIT");
    })
  }

  getDeath() {
    this.lookupService.fetchBySetName("CLAIM_TYPE_DEATH").subscribe((data: any) => {
      this.death = data.content;
      this.claimTypeChange(this.claimDetails.claimType, "INIT");
    })
  }

  getDisability() {
    this.lookupService.fetchBySetName("CLAIM_TYPE_DISABILITY").subscribe((data: any) => {
      this.disability = data.content;
      this.claimTypeChange(this.claimDetails.claimType, "INIT");
    })
  }

  getSource() {
    this.lookupService.fetchBySetName("SOURCE_OF_CLAIM").subscribe((data: any) => {
      this.source = data.content
    })
  }

  checkPlaceofDeath(){
    let placeofDeath =  this.myForm.get('PlaceDeath')?.value
    console.log(placeofDeath)
    if(placeofDeath == 'PLACE_OF_DEATH_HOSPITAL') {
     this.showHosptitalDetails = true
    //  this.myForm.controls["hospitalName"].setValidators(Validators.required);
    //  this.myForm.controls["hospitalName"].setErrors({'hospitalName': true});
    }
    else{
     this.showHosptitalDetails = false
    //  this.myForm.controls["hospitalName"].removeValidators(Validators.required);
    }
   }


}




