
import { AbstractControl, ValidationErrors, ValidatorFn, Validator, NG_VALIDATORS, FormControl } from '@angular/forms'

import { Directive, OnInit, forwardRef, Input, Injectable } from '@angular/core';
// import { ClaimEventValidationService } from "../../../views/registration/services/claim-event-details-validation/claim-event-validation.service";
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { Dialog } from '@angular/cdk/dialog';
// import { ClaimEventDetailsComponent } from "../../registration/claim-event-details/claim-event-details.component";

@Injectable({
    providedIn: 'root',
})
export class ClaimDetailsValidator implements OnInit {

    submitted: boolean = false;
    myForm: any
    Doechanged:boolean=false;
    claimDetails: any = {};
    appCode:any
    constructor() {

    }
    ngOnInit(): void {
        this.appCode = localStorage.getItem('appcode')

    }


    // hospitalName: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

    //     const PlaceDeath = control.get('PlaceDeath');
    //     const hospitalName = control.get('hospitalName');


    //     // if (PlaceDeath?.value === "PLACE_OF_DEATH_HOSPITAL" && (hospitalName?.value !== undefined && hospitalName?.value.length > 0))

    //     if (PlaceDeath?.value === "PLACE_OF_DEATH_HOSPITAL" && (hospitalName?.value == undefined || hospitalName?.value.length === 0)) {

    //         return { hostipalName: true };
    //     } else {

    //         return null;
    //     }

    // }

    hospital_Name: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

        const PlaceDeath = control.get('PlaceDeath');
        const hospitalName = control.get('hospitalName');

        if (PlaceDeath?.value === "PLACE_OF_DEATH_HOSPITAL" && (hospitalName?.value == undefined || hospitalName?.value.length === 0)) {

            return { hospitalName: true };
        } else {

            return null;

        }

    }
    stringValid(stringValue): boolean {
        if (typeof stringValue != "undefined" && stringValue) {
            return true;
        }
        return false;
    }
    //  -----------  Date Function ----------------
    // public yearsDif() {
    //     const field = this.myForm.get("eventDate").value;

    //     let diff = new Date().getFullYear() - new Date(field).getFullYear();

    //     if (diff < 1) {

    //         return { reasonforlateIntimation: true };

    //     }else{

    //      return null;
    //     }

    //  }

    // reasonforlateIntimation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    //     //     const selecteddateofEvent = control.get('eventDate');
    //     //     const currentDate =  ;
    //     const reason_for_late_Intimation = control.get('reason_for_late_Intimation');


    //     if (!this.stringValid(reason_for_late_Intimation?.value)) {

    //         return { reason_for_late_Intimation: true };
    //     } else {
    //         return null;
    //     }

    //     // return { eventDate: true };
    // }


    Date_Accident: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const eventCause = control.get('eventCause');
        const DateAccident = control.get('DateAccident');

        if (eventCause?.value === "EVENT_CAUSE_ACIDENT" && (DateAccident?.value == undefined || DateAccident?.value.length === 0)) {
            return { Date_Accident: true };
        } else {

            return null;

        }
    }

    murder_Selection: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const eventCause = control.get('eventCause');
        const DateAccident = control.get('DateAccident');

        if (eventCause?.value === "EVENT_CAUSE_MURDER" && (DateAccident?.value == undefined || DateAccident?.value.length === 0)) {
            return {murder_Selected: true };
        } else {

            return null;

        }
    }

    remark_Intimated: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

        const Relation = control.get('Relation');
        const remark = control.get('remark');

        if (Relation?.value === "RELATION_WITH_LA_OTHR" && (remark?.value == undefined || remark?.value.length === 0)) {

            return { remark: true };
        } else {


            return null;

        }

    }
 
    

    set isDisabled(value: boolean) {
        this.isDisabled = value;
        if(value) {
         this.myForm.controls['secondary_event_Cause'].disable();
        } else {
           this.myForm.controls['secondary_event_Cause'].enable();
         }
       }

    SecondaryCauseEvent: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        
        const claimType = control.get('claimType');
        const secondary_event_Cause = control.get('secondary_event_Cause');
        // console.log("secondary cause event",control)
         
        if (claimType?.value === "CLAIM_TYPE_DEATH" && (secondary_event_Cause?.value == undefined || secondary_event_Cause?.value.length === 0)) {

            return { secondary_event_Cause: true };
        } else {

            return null;

        }

    }

    placeofDeath: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        
        const claimType = control.get('claimType');
        const PlaceDeath = control.get('PlaceDeath');
         
        if (claimType?.value === "CLAIM_TYPE_DEATH" && (PlaceDeath?.value == undefined || PlaceDeath?.value.length === 0)) {

            return { PlaceDeath: true };
        } else {

            return null;

        }

    }

    // notNullCheck(){
    //     if( ){

    //     }
    //     return null
    // }


    reasonforlateIntimation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

        const selecteddateofEvent = control.get('eventDate')?.value;
        // console.log("*******************", selecteddateofEvent)


        var selectedDate = new Date(selecteddateofEvent);

        // const formattedDate = moment(momentDate).format("dd/mm/yyyy");
        // console.log("selectedDate" + selectedDate);
        var myCurrentDate = new Date();

        var myPastDate = new Date();
        // console.log("myPastDate1  " + myPastDate);
        myPastDate.setDate(myPastDate.getDate() - 366);//myPastDate is now 8 days in the past
        // console.log("myPastDate2 " + myPastDate);

        const value = control.get('reason_for_late_Intimation')?.value;


    
        if (selectedDate < myPastDate &&
            (value == undefined || value.length == 0)) {
            return { reasonRequiredLateIntimation: true };
        }
        return null;

    }


    // if (!this.stringValid(reasonforlate_Intimation?.value)) {

    //     return { reason_for_late_Intimation: true };
    // } else {
    //    return null;
    // }

    // return { eventDate: true };
    // }


    // ----- operation for Policy Number and Client Id Special Character Not Allowed -----///

    alphaNumeric_policyNo_Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

        const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
    
         var policyNo =control.get('policyNo')?.value;
        if (ALPHA_NUMERIC_REGEX.test(policyNo)   && (policyNo ?.value == undefined || policyNo ?.value.length === 0)) {
          return null;
          
      } else {
    
        
        return { policyNo: true };
         
    
      }
    }
    
      alphaNumeric_clientId_Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    
        const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;
    
         var clientID =control.get('clientID')?.value;
        if (ALPHA_NUMERIC_REGEX.test(clientID)   && (clientID?.value == undefined || clientID?.value.length === 0)) {
          return null;
          
      } else {
    
        
        return { clientID: true };
         
    
      }
       
    
    }

    //---------Date of accident less than date of claim Intimation -----------------//

    dateofaccident_lessthan_claimintimation:ValidatorFn=(control:AbstractControl):ValidationErrors|null =>{
       
        const dateofaccident = control.get('DateAccident')?.value;
        const dateofintimation =control.get('ClaimDate')?.value;

        // console.log("date of accident"+dateofaccident)
        // console.log("date of intimation" +dateofintimation)

        if(dateofintimation< dateofaccident ){
            return {dateofaccident_lessthan_claimintimation:true}
        }

       return null;
    }

    dateofevent:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
       
        const dateof_event = new Date(control.get('eventDate')?.value);
        const dateofintimation=new Date(control.get('ClaimDate')?.value);
        const dateofaccident=new Date(control.get('DateAccident')?.value);
        console.log("date of event",dateof_event)
        console.log("date of accident",dateofaccident)
        console.log(dateofintimation)
        if(dateofintimation<dateof_event){

            return{date_of_intimation:true}
        }
        if(dateofaccident>dateof_event){
            
            return{date_of_accident:true}
        }

        return null;
    }

    alphabets:ValidatorFn=(control:AbstractControl):ValidationErrors |null =>{
          
        const ALPHA_NUMERIC_REGEX = /^[a-zA-Z\s-, ]*$/;
         var hospitalName =control.get('hospitalName')?.value;
         return null; // to remove alphabet only validation
         if(ALPHA_NUMERIC_REGEX.test(hospitalName)&& (hospitalName?.value==undefined || hospitalName?.value.length==0)){
            return null;
         }
         return{albhabetsonly:true}
        
    }

    doe_Changed:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
        //debugger 
        // var val = localStorage.getItem("ClaimDetails");
        // this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');
        this.appCode = localStorage.getItem('appcode')
    // if(this.appCode != "CI"){
     var eventDate =localStorage.getItem('eventDate');
       
     const doedateSecond =control.get('eventDate')?.value;
     const remark = control.get('remark')?.value;

    //  var 
    //  const Remarks=localStorage.getItem('Remark')
    //  console.log("RRRRRRRRRRRRRRRRR",Remarks)

    //  console.log(remark)
    //    debugger
    //  if(doedateSecond!=eventDate && doedateSecond!=null &&( remark ==null|| remark !=null) ){
    //     if(doedateSecond!=eventDate){
         
    //         return{Doechanged:true};     
           
    //  }else{
        
    //     return null
       
    //  }
    // }
    // else{      
    //     return null
    // }
    
    if(doedateSecond!=eventDate && doedateSecond!=null && remark ==null ){
          
        return{claimtypeChanged:true};
          
   }else{
      
    return null
     
   }
       
    }

    causeofEvent:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
     
        this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');
        console.log(this.claimDetails)
        var getclaimType = this.claimDetails.claimType
        const claimType =control.get('claimType')?.value
  
        const eventCause =control.get('eventCause')?.value
        console.log(eventCause)

        if(claimType!=getclaimType && claimType!=null  && getclaimType!=null && (eventCause == null || eventCause == '' )){
       
            return{CauseofEvent:true};
       
       }else{
          
        return null
         
       }
    }

    claimTypeChanged:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
     
        // this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');
        var claimTypeDisp =localStorage.getItem('claimTypeDisp');
        console.log("**************",claimTypeDisp)

        const claimType =control.get('claimType')?.value
  
        // const eventCause =control.get('eventCause')?.value
        // console.log(eventCause)

        const remark = control.get('remark')?.value;

        console.log(remark)
       
        if(claimType!=claimTypeDisp && claimType!=null && remark ==null ){
          
             return{claimtypeChanged:true};
               
        }else{
           
         return null
          
        }
    }

    coeNotIntimation:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
     
        var claimTypeDisp =localStorage.getItem('claimTypeDisp');
    
        const claimType =control.get('claimType')?.value
  
        const eventCause =control.get('eventCause')?.value
        console.log(eventCause)

        if(claimType!=claimTypeDisp && claimType!=null  && claimTypeDisp!=null && (eventCause == null || eventCause == '' )){
       
            return{CauseofEvent:true};
       
       }else{
          
        return null
         
       }
    }

    

    



}
