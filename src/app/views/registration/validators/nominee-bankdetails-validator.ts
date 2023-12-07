
import { AbstractControl, ValidationErrors, ValidatorFn, Validator, NG_VALIDATORS, FormControl, } from '@angular/forms'
import { FormGroup } from '@angular/forms';
import { Directive, OnInit, forwardRef, Input, Injectable } from '@angular/core';
// import { ClaimEventValidationService } from "../../../views/registration/services/claim-event-details-validation/claim-event-validation.service";
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
// import { ClaimEventDetailsComponent } from "../../registration/claim-event-details/claim-event-details.component";

@Injectable({
    providedIn: 'root',
})
export class NomineeValidator implements OnInit {

    submitted: boolean = false;
    myForm: any
    formGroup:any
    appCode:any;
    constructor() {

    }
    ngOnInit(): void {
      this.appCode  = localStorage.getItem('appcode')
    }



//--------------------Nomineee Validation --------------------------------

accountnumber:ValidatorFn=(control:AbstractControl):ValidationErrors|null =>{
  
    const ALPHA_NUMERIC_REGEX = /^[0-9]*$/;

    const accountNumber=control.get('accountNumber')?.value;
   //  console.log("Account Number",accountNumber)
   
    if(ALPHA_NUMERIC_REGEX.test(accountNumber)&&(accountNumber?.value == undefined || accountNumber?.value.length == 0)){
       return null;
    }
    return {account_Number:true}
      
   }
   pin_code:ValidatorFn=(control:AbstractControl):ValidationErrors|null =>{
  
      const ALPHA_NUMERIC_REGEX = /^[0-9]*$/;
  
      const pinNumber=control.get('pincode')?.value;
     
      if(ALPHA_NUMERIC_REGEX.test(pinNumber)&&(pinNumber?.value == undefined || pinNumber?.value.length == 0)){
         return null;
      }
      return {validPin:true}
        
     }

   re_enter_accountnumber:ValidatorFn=(control:AbstractControl):ValidationErrors|null =>{
  
    const ALPHA_NUMERIC_REGEX = /^[0-9]*$/;

    const accountNumber=control.get('reAccountNumber')?.value;
   //  console.log("Account Number",accountNumber)
   
    if(ALPHA_NUMERIC_REGEX.test(accountNumber)&&(accountNumber?.value == undefined || accountNumber?.value.length == 0)){
       return null;
    }
    return {Reeneter_account_Number:true}
      
   }
   
   ifsc_code:ValidatorFn=(control:AbstractControl):ValidationErrors | null =>{
       
       const ifsc = control.get('ifscCode')?.value;
      //  console.log("IFSC Code",ifsc)
       const regExp = /^[A-Z]{4}[0][A-Z0-9]{6}$/;
      
       
   
       if (regExp.test(ifsc) &&(ifsc?.value==undefined || ifsc?.value.length==0)){
        return null
       }
       return {ValidIfsc:true}
       
   }

   bankName:ValidatorFn=(control:AbstractControl):ValidationErrors |null =>{
          
    const ALPHA_NUMERIC_REGEX = /^[a-zA-Z\s-, ]*$/;
     var bankName =control.get('bankName')?.value;

     if(ALPHA_NUMERIC_REGEX.test(bankName)&& (bankName?.value==undefined || bankName?.value.length==0)){
        return null;
     }
     return{albhabetsonly:true}
    
}

branchName:ValidatorFn=(control:AbstractControl):ValidationErrors |null =>{
          
    const ALPHA_NUMERIC_REGEX = /^[a-zA-Z\s-, ]*$/;
     var branchName =control.get('branchName')?.value;

     if(ALPHA_NUMERIC_REGEX.test(branchName)&& (branchName?.value==undefined || branchName?.value.length==0)){
        return null;
     }
     return{albhabet_sonly:true}
    
}

micrCode:ValidatorFn=(control:AbstractControl):ValidationErrors |null =>{
          
      const micrCode=control.get('micrCode')?.value;
      const ifscCode=control.get('ifscCode')?.value;


     if((ifscCode?.value==undefined || ifscCode?.value.length==0)||(micrCode?.value==undefined|| micrCode?.value.length==0)){
       
        return{Allowed_micrCode:true} 
     }
     
     return null
    
}

mobileNumber:ValidatorFn=(control:AbstractControl):ValidationErrors|null =>{
  
    const ALPHA_NUMERIC_REGEX = /^[0-9]*$/;

    const mobileNumber=control.get('mobileNo')?.value;
   //  console.log(control)
   //  console.log(control.parent)
    // console.log("Account Number",accountNumber)
   
    if(ALPHA_NUMERIC_REGEX.test(mobileNumber)&&(mobileNumber?.value== undefined || mobileNumber?.value.length== 0)){
       return null;
    }
    return {valid_mobile_Number:true}
      
   }

   telephoneNumber:ValidatorFn=(control:AbstractControl):ValidationErrors|null =>{
  
    const ALPHA_NUMERIC_REGEX = /^[0-9]*$/;
      // console.log(control)
    const telephoneNumber=control.get('landlineno')?.value;
    // console.log("Account Number",accountNumber)
   
    if(ALPHA_NUMERIC_REGEX.test(telephoneNumber)&&(telephoneNumber?.value == undefined || telephoneNumber?.value.length == 0)){
       return null;
    }
    return {valid_telephoneNumber_Number:true}
      
   }

   remark: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        
    const relation = control.get('relationWithLife');
    const remark = control.get('remark');
     
    if (relation?.value === "RELATION_WITH_LA_OTHR" && (remark?.value == undefined || remark?.value.length === 0)) {

        return { valid_remark: true };
    } else {

        return null;

    }

}

Account_holder_name:ValidatorFn=(control:AbstractControl):ValidationErrors |null =>{
          
    const ALPHA_NUMERIC_REGEX = /^[a-zA-Z\s-, ]*$/;
     var accountName =control.get('accountName')?.value;

     if(ALPHA_NUMERIC_REGEX.test(accountName)&& (accountName?.value==undefined || accountName?.value.length==0)){
        return null;
     }
     return{Valid_account_name:true}
    
}

percentage:ValidatorFn = (control: AbstractControl | any ): ValidationErrors | null =>{
    let sum = 0
   const valueArray = control?.controls?.arr.getRawValue()
   // console.log("valueArray",valueArray)
   if(valueArray){
      sum = 0
   valueArray.forEach(element =>{
      // console.log(element.nimineePercentage)
      
      if(element.roleCode == "BN"){
      sum+=element.nimineePercentage ? Number(element.nimineePercentage) : 0
      } 
   
   })
   //  console.log(sum)
   // console.log(typeof(sum))
   }
   if(sum < 100 || sum > 100){
     return {invalid_percentage:true}
   }
   
   return null
}

//    return null
// }

// percentage:ValidatorFn = (control: AbstractControl ): ValidationErrors | null => {
//     let sum = 0
//     const nominee = control.get('nimineePercentage');
//     console.log("shfcuks",nominee)

//     this.formGroup.get('arr')['controls'].valueChanges.subscribe((newVal)=>{
//         this.formGroup.get('total').patchValue(
//             this.formGroup.get('arr').value.reduce((acc,curr)=>{
//                 return acc + curr.v;
//             },0)
//         )
//     })
    
//     // if ( sum += group.get([a]).value;) {

//     //     return { valid_remark: true };
//     // } else {

//     return null;

//     // }

}


