import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class CrossFieldErrorMatcherNew implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  };

}


export class CrossFieldErrorMatcherforPlaceOfDeath implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && form.hasError('PlaceDeath')
      }
      return false;
    };
  }

 export class CrossFieldErrorMatcherforDateOfAccident implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && ( form.hasError('dateofaccident_lessthan_claimintimation') || form.hasError('Date_Accident') || form.hasError('murder_Selected') || form.hasError('date_of_accident'))
      }
      return false;
    };
  }

 export class CrossFieldErrorMatcherforDateOfEvent implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && (form.errors != null && ( form.hasError('date_of_intimation')) || ( control && control.invalid))
      }
      return false;
    };
  }

  export class CrossFieldErrorMatcherforLateIntemation implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && form.hasError('reasonRequiredLateIntimation')
      }
      return false;
    };
  }

  export class CrossFieldErrorMatcherforHospitalName implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && (form.hasError('hospitalName') || form.hasError('albhabetsonly'))
      }
      return false;
    };
  }

  export class CrossFieldErrorMatcherforSecondaryCauseOfEvent implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && form.hasError('secondary_event_Cause')
      }
      return false;
    };
  }


  export class CrossFieldErrorMatcherforRemark implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && (form.hasError('Doechanged') || form.hasError('claimtypeChanged'))
      }
      return false;
    };
  }
  export class CrossFieldErrorMatcherforRemarkInt implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      // var controlDirty=control?.['dirty']||false;
      var formStatus=form?.form.status;
      // return controlDirty && formStatus=="INVALID";
      if(form?.touched && (control?.touched || control?.dirty)){
        return formStatus=="INVALID" && form.errors != null && (form.hasError('remark'))
      }
      return false;
    };
  }
    export class CrossFieldErrorMatcherforClaimEvent implements ErrorStateMatcher {
      isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        // var controlDirty=control?.['dirty']||false;
        var formStatus=form?.form.status;
        // return controlDirty && formStatus=="INVALID";
        if(form?.touched && (control?.touched || control?.dirty)){
          return formStatus=="INVALID" && form.errors != null && (form.hasError('CauseofEvent')|| (control && control.invalid))
        }
        return false;
      };
  }

//   export class CrossFieldErrorMatcherforClaimType implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//       // var controlDirty=control?.['dirty']||false;
//       var formStatus=form?.form.status;
//       // return controlDirty && formStatus=="INVALID";
//       if(form?.touched && (control?.touched || control?.dirty)){
//         return formStatus=="INVALID" && form.errors != null && (form.hasError('CauseofEvent')|| (control && control.invalid))
//       }
//       return false;
//     };
// }




  