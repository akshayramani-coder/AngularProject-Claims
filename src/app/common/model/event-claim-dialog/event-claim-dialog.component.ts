import { Component, OnInit, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn, NgForm,FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { MatDialogService } from 'src/app/views/registration/services/mat-service/mat-dialog.service';
import { LookupService } from 'src/app/views/registration/services/lookup/lookup.service';
import { PolicyService } from 'src/app/views/registration/services/common-service/policy.service';
import { IntimationService } from 'src/app/views/registration/services/common-service/intimation.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {AllCommonService } from './../../../views/registration/services/common-service/all-common.service'
import { ClaimDetailsValidator } from 'src/app/views/registration/validators/claim-details-validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { SaveeventDetailsDialogueComponent } from '../saveevent-details-dialogue/saveevent-details-dialogue.component';
import { CrossFieldErrorMatcherforDateOfAccident, CrossFieldErrorMatcherforDateOfEvent, CrossFieldErrorMatcherforClaimEvent,CrossFieldErrorMatcherforHospitalName, CrossFieldErrorMatcherforLateIntemation, CrossFieldErrorMatcherforPlaceOfDeath, CrossFieldErrorMatcherforRemark, CrossFieldErrorMatcherforSecondaryCauseOfEvent } from 'src/app/views/registration/ErrorStateMatcher/ErrorStatematcherValidators-claim-event';
import { RoleDetailsService } from 'src/app/views/registration/services/common-service/role-details.service';
/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // var controlDirty=control?.['dirty']||false;
    var formStatus=form?.form.status;
    // return controlDirty && formStatus=="INVALID";
    return formStatus=="INVALID";
  };
}
@Component({
  selector: 'app-event-claim-dialog',
  templateUrl: './event-claim-dialog.component.html',
  styleUrls: ['./event-claim-dialog.component.scss']
})
export class EventClaimDialogComponent implements OnInit {
  eventAndClaimForm!: FormGroup;
  submitted: boolean = false;
  isDeath:Boolean=false;
  isCriticalIllness:Boolean=true;
  isDisability:Boolean=false;
  test:any;
  

  isDisableDateOfAccident:Boolean=false;
  trackClaim:boolean=false;
  errorMatcher = new CrossFieldErrorMatcher();
  errorMatcherForPlaceOfDeath = new CrossFieldErrorMatcherforPlaceOfDeath()
  errorMatcherForDateOfEvent = new CrossFieldErrorMatcherforDateOfEvent()
  errorMatcherForDateOfAccident = new CrossFieldErrorMatcherforDateOfAccident()
  errorMatcherForLateIntemation = new CrossFieldErrorMatcherforLateIntemation()
  errorMatcherforHospitalName= new CrossFieldErrorMatcherforHospitalName();
  errorMatcherforRemark = new CrossFieldErrorMatcherforRemark();
  errorMatcherforSecondaryCauseOfEvent = new CrossFieldErrorMatcherforSecondaryCauseOfEvent();
  errorMatcherForClaimEvent = new CrossFieldErrorMatcherforClaimEvent();
  isDisabled:boolean=false
  myForm!: FormGroup;
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
  death:any=[];
  disability:any=[];
  criticalIllness:any=[];
  reasonforlateInt:any=[];
  claimSource: any=[];
  source:any;

  dropdownvalue:any=[];
  claimDetailsId:any;
  // claimType:any=[];

  realationLifeAssured: any = [];
  claimDetails: any = {};
  appCode: any;
  eventDetails: any;
  claimTypeDisp: any;
  onlyRead: any ;
  showHosptitalDetails:Boolean = false;
  isReadonly:any;
  breCall: any;
  // showClaimIntemationDate:boolean = true
  // showClaimIntemationTime:boolean = true
  // showDateofEvent:boolean = true
  constructor(
    private matDialogService: MatDialogService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lookupService: LookupService,
    private policyService: PolicyService,
    private roleService: RoleDetailsService,
    private intimationService: IntimationService,
    public dialog: MatDialog,
    private allCommonService: AllCommonService,
    private dialogRef: MatDialogRef<EventClaimDialogComponent>,
    private claimDetailsValidator: ClaimDetailsValidator,
    @Inject(MAT_DIALOG_DATA) private data: any,) {


  }
  clientId: any;
  ngOnInit(): void {
    console.log("data>>>>>",this.data)
    this.appCode = localStorage.getItem('appcode')
    this.onlyRead = this.allCommonService.getEditable()
    console.log(this.onlyRead,'readonly value')

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
    this.createForm();

    this.getSource()
    
    this.min_Date.setMonth(this.max_Date.getMonth() - 600);

    this.registerEvents();


    if (this.onlyRead == true){
      console.log(this.onlyRead)
      this.isReadonly=true
    }else if (this.onlyRead == false){
      console.log(this.onlyRead)
      this.isReadonly=false
    }

    
    if(this.appCode =='CR' || this.appCode=='AS'){
      this.patchEventAndClaimDetails();
      // this.isReadonly=false;
      if (this.onlyRead == true){
        console.log(this.onlyRead)
        this.isReadonly=true
        if(this.trackClaim){
          this.isReadonly=true
        }
    
      }else if (this.onlyRead == false){
        console.log(this.onlyRead)
        this.isReadonly=false
      }
    }else if(this.appCode =='AP' || this.appCode=='PO'){
      this.patchEventAndClaimDetails();
      this.isReadonly=true
    }
    this.trackClaim=this.allCommonService.getTrackClaim();

    if(this.trackClaim){
      this.isReadonly=true
    }
  }
  
  registerEvents() {
    
    this.eventAndClaimForm.get('claimType')?.valueChanges.subscribe(value => {
      this.claimTypeChange(value, "EVENT");
    });

    this.eventAndClaimForm.get('eventCause')?.valueChanges.subscribe(value => {
      this.CauseofeventChange(value);
    });

  }

  createForm() {
    this.eventAndClaimForm = this.fb.group({
      // clientId: this.clientId,
      claimSource: ['',Validators.required],
      claimType: [''],
      ClaimDate: [''],
      ReenterClaimDate: [''],
      intimationTime: [''],
      ReenterIntimationTime: [''],
      eventCause: ['',Validators.required],
      PlaceDeath: [''],
      DateAccident: [''],
      eventDate: [''],
      ReenterDate: [''],
      reason_for_late_Intimation: [''],
      Organ: [''],
      hospitalName: [''],
      secondary_event_Cause: [''],
      IntimatedBy: [''],
      Relation: [''],
      payoutOption: [''],
      remark: [''],
      relationWithLaRemarks: [''],
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
          this.claimDetailsValidator.reasonforlateIntimation,
          this.claimDetailsValidator.Date_Accident,
          this.claimDetailsValidator.remark_Intimated,
          this.claimDetailsValidator.SecondaryCauseEvent,
          this.claimDetailsValidator.hospital_Name,
          this.claimDetailsValidator.placeofDeath,
          this.claimDetailsValidator.dateofaccident_lessthan_claimintimation,
          this.claimDetailsValidator.dateofevent,
          this.claimDetailsValidator.alphabets,
          this.claimDetailsValidator.murder_Selection,
          this.claimDetailsValidator.doe_Changed,
          this.claimDetailsValidator.claimTypeChanged,
          this.claimDetailsValidator.coeNotIntimation,
        ]
      }
    );

  }
  claimTypeChange(value, stage) {
    console.log("claimTypeChange AA " + value);
    
    this.isDeath = false;
    this.isCriticalIllness = false;
    this.isDisability = false;

    if (value == 'CLAIM_TYPE_DEATH') {

      this.dropdownvalue = this.death;

      this.isDeath = true;
      this.eventAndClaimForm.controls['eventCause'].setValue(null)

    }
    else if (value == 'CLAIM_TYPE_CI') {
      this.dropdownvalue = this.criticalIllness;
      this.isCriticalIllness = true;
      this.eventAndClaimForm.controls['eventCause'].setValue(null)

    }
    else if (value == 'CLAIM_TYPE_DISABILITY') {
      this.dropdownvalue = this.disability;
      this.isDisability = true;
      this.eventAndClaimForm.controls['eventCause'].setValue(null)
    }
    console.log("claimTypeChange AA length" + this.dropdownvalue.length);
    if (stage === "INIT") {
      this.eventAndClaimForm.patchValue({
        eventCause: this.claimDetails.eventDetailsDto.deathCause
      });
    }

    this.eventAndClaimForm.setErrors(this.claimDetailsValidator.causeofEvent)
    this.eventAndClaimForm.controls['eventCause'].updateValueAndValidity()
  }

  // claimIntemationDateChange(){
  //   this.showClaimIntemationDate = false
  // }
  // dateofEventChange(){
  //   this.showDateofEvent = false
  //   this.eventAndClaimForm.controls['remark'].setValue(null)
  // }


  CauseofeventChange(value) {
    console.log("CauseofeventChange AA " + value);

    this.isDisableDateOfAccident = false;

    if (value == 'EVENT_CAUSE_MURDER' || value == 'EVENT_CAUSE_ACIDENT') {
      this.isDisableDateOfAccident = true;
    }

  }


  get f(): { [key: string]: AbstractControl } {
    return this.eventAndClaimForm.controls;
  }
  claimType: any
  // Patch Registration Event Details and Claim Details  
  patchEventAndClaimDetails() {
      this.claimDetails = this.data;
      this.eventAndClaimForm.patchValue({
        claimType: this.claimDetails.transClaimDetailsDto.claimTypeCd,
        ClaimDate: this.claimDetails.transClaimDetailsDto.intimationDate,
        ReenterClaimDate:this.claimDetails.transClaimDetailsDto.intimationDate,
        intimationTime: this.claimDetails.transClaimDetailsDto.intimationTime,
        ReenterIntimationTime: this.claimDetails.transClaimDetailsDto.intimationTime,
        claimSource:this.claimDetails.transClaimDetailsDto.claimSource,
        // event Details PAtch Value 
        // eventType: this.claimDetails.eventDetailsDto.eventType,
        eventCause: this.claimDetails.eventDetailsDto.deathCause,
        PlaceDeath: this.claimDetails.eventDetailsDto.deathPlace,
        DateAccident: this.claimDetails.eventDetailsDto.accidentDt,
        eventDate: this.claimDetails.eventDetailsDto.eventDt,
        ReenterDate: this.claimDetails.eventDetailsDto.eventDt,
        Organ: this.claimDetails.eventDetailsDto.eventOrganImpacted,
        hospitalName: this.claimDetails.eventDetailsDto.hospitalName,
        secondary_event_Cause: this.claimDetails.eventDetailsDto.secondaryEventCause,
        IntimatedBy: this.claimDetails.eventDetailsDto.initiatedBy,
        Relation: this.claimDetails.eventDetailsDto.relationWithLifeAssured,
        payoutOption: this.claimDetails.eventDetailsDto.payoutOption,
        relationWithLaRemarks: this.claimDetails.eventDetailsDto.relationWithLaRemarks,
        remark:this.claimDetails.eventDetailsDto.remarks ? this.claimDetails.eventDetailsDto.remarks: ' ',
        reason_for_late_Intimation:this.claimDetails.eventDetailsDto.reasonForLateInt,
        hospitalLocation:this.claimDetails.eventDetailsDto.hospitalLoc,
        doctorName:this.claimDetails.eventDetailsDto.doctorName,
        treatmentDetails:this.claimDetails.eventDetailsDto.treatmntDtl,
        hospitalAddress:this.claimDetails.eventDetailsDto.hospitalAddr
        // "hospitalLoc":this.claimDetails.hospitalLocation,
        // "doctorName":this.claimDetails.doctorName,
        // "treatmntDtl":this.claimDetails.treatmentDetails,
        // "hospitalAddr": this.claimDetails.hospitalAddress,
      })
      let placeofDeath =  this.eventAndClaimForm.get('PlaceDeath')?.value
      // console.log(placeofDeath)
      if(placeofDeath == 'PLACE_OF_DEATH_HOSPITAL') {
       this.showHosptitalDetails = true
      }
      localStorage.setItem("Remark",this.eventAndClaimForm.value.remark)
  }
  

  // save Event Details and Claim Details 
  saveEventAndClaimDetails() {
    this.submitted = true;
    this.eventAndClaimForm.markAllAsTouched();
    this.claimDetailsId = this.allCommonService.getClaimsDetailId()
    // console.log(this.eventAndClaimForm)
    this.breApiCall();
    var payload = {
      "eventDetailsDto": {
        "eventDetailId": this.claimDetails.eventDetailsDto.eventDetailId,
        "claimsDetailId": this.claimDetails.eventDetailsDto.claimsDetailId,
        // "eventType":  this.eventAndClaimForm.value.eventType,
        "deathCause": this.eventAndClaimForm.value.eventCause,
        "deathPlace": this.eventAndClaimForm.value.PlaceDeath,
        "accidentDt": this.eventAndClaimForm.value.DateAccident,
        "eventDt": this.eventAndClaimForm.value.eventDate,
        "ReenterDate": this.eventAndClaimForm.value.ReenterDate,
        "reasonForLateInt": this.eventAndClaimForm.value.reason_for_late_Intimation,
        "eventOrganImpacted": this.eventAndClaimForm.value.Organ,
        "hospitalName": this.eventAndClaimForm.value.hospitalName,
        "secondaryEventCause": this.eventAndClaimForm.value.secondary_event_Cause,
        "initiatedBy": this.eventAndClaimForm.value.IntimatedBy,
        "relationWithLifeAssured": this.eventAndClaimForm.value.Relation,
        "payoutOption": this.eventAndClaimForm.value.payoutOption,
        "relationWithLaRemarks": this.eventAndClaimForm.value.relationWithLaRemarks,
        "remarks": this.eventAndClaimForm.value.remark?  this.eventAndClaimForm.value.remark: ' ',
        "hospitalLocation":this.eventAndClaimForm.value.hospitalLocation,
        "doctorName":this.eventAndClaimForm.value.doctorName,
        "treatmentDetails":this.eventAndClaimForm.value.treatmentDetails,
        "hospitalAddress":this.eventAndClaimForm.value.hospitalAddress
      },
      "claimIntimationDetails": {
        "claimsDetailId": this.claimDetails.eventDetailsDto.claimsDetailId,
        "claimType": this.eventAndClaimForm.value.claimType,
        "intimationDate": this.eventAndClaimForm.value.ClaimDate,
        "intimationTime": this.eventAndClaimForm.value.intimationTime,
        "claimSource":this.eventAndClaimForm.value.claimSource,
      }

    }

    if (this.eventAndClaimForm.valid) {
      setTimeout(() => {
        console.log("Success")
        this.policyService.saveEventClaimDetails(payload).subscribe((res: any) => {
          if (res) {
          // localStorage.removeItem('Remark')
            const dialogRef = this.dialog.open(SaveeventDetailsDialogueComponent, {
              width: '80%',
              height: '500px',
              data: res,

            });
            this.dialogRef.close();
          } else {
            console.log("Error")
          }

        })
      }, 600);
    }

   
  }

  // onViewClick(): void {
  //   const dialogRef = this.dialog.open(SaveeventDetailsDialogueComponent, {
  //     width: '93%',
  //     height: '600px',
  //     data: this.data,

  //   });
  //   dialogRef.afterClosed().subscribe((result) => { });
  // }
breApiCall(){
  var policyId = this.allCommonService.getCRClaimData();
  // this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');

  var reqParam = {
    "policyNumber": policyId,
    "policyStatus": "123",
    "claimType": this.eventAndClaimForm.value.claimType,
    "causeType": this.eventAndClaimForm.value.eventCause,
    "dateOfEvent": this.eventAndClaimForm.value.eventDate,
    "claimsDetailId" : this.claimDetailsId
}
   this.roleService.getDocData(reqParam).subscribe((response: any) => {
    console.log("res::::",response)
    this.allCommonService.breDocCall(response);
    localStorage.removeItem('breCall');
    localStorage.setItem('breCall',response.claimDuration)
    this.breCall = response.claimDuration;
    // console.log("This " + element_id + " comes from api.change_val");
    this.allCommonService.change_val(this.breCall);

    // this.allCommonService.setDocDetailsData(res)
  });
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

  dateofEventChange(){
    this.eventAndClaimForm.controls['remark'].setValue(null)
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





  onChnageOfClaimeTime() {
    // this.showClaimIntemationTime = false
    //this.eventAndClaimForm.controls['ReenterIntimationTime'].setValue(this.eventAndClaimForm.controls['intimationTime'].value)
  }

  clearData(){
    this.eventAndClaimForm.reset();
  }


  getAllCLaimList() {
    this.lookupService.getClaimlist().subscribe((data: any) => {
      this.claimList = data.content

      // console.log("Type of Claim ", this.claimList)
      // return this.claimList;
    })
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
      this.causeofDeath = data.content;
    }
    );
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
      if (this.claimDetails.eventDetailsDto.initiatedByDisp) {
        this.eventAndClaimForm.patchValue({
          initiatedBy: parseInt(this.claimDetails.eventDetailsDto.initiatedByDisp),
        });
      }
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
      this.claimTypeChange(this.claimDetails.transClaimDetailsDto.claimTypeCd, "INIT");
    })
  }

  getDeath() {
    this.lookupService.fetchBySetName("CLAIM_TYPE_DEATH").subscribe((data: any) => {
      this.death = data.content;
      this.claimTypeChange(this.claimDetails.transClaimDetailsDto.claimTypeCd, "INIT");
    })
  }

  getDisability() {
    this.lookupService.fetchBySetName("CLAIM_TYPE_DISABILITY").subscribe((data: any) => {
      this.disability = data.content;
      this.claimTypeChange(this.claimDetails.transClaimDetailsDto.claimTypeCd, "INIT");
    })
  }

  getSource() {
    this.lookupService.fetchBySetName("SOURCE_OF_CLAIM").subscribe((data: any) => {
      this.source = data.content
    })
  }
  checkPlaceofDeath(){
    let placeofDeath =  this.eventAndClaimForm.get('PlaceDeath')?.value
    console.log(placeofDeath)
    if(placeofDeath == 'PLACE_OF_DEATH_HOSPITAL') {
     this.showHosptitalDetails = true
    }
    else{
     this.showHosptitalDetails = false
    }
   }

}




