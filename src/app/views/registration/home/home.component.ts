import { Component, OnInit } from '@angular/core';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl,ValidationErrors, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { SnackbarService } from '../../core/snackbar.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { __values } from 'tslib';
import { ClaimDetailsValidator } from '../validators/claim-details-validator';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // var controlDirty=control?.['dirty']||false;
    var formStatus=form?.form.status;
    // return controlDirty && formStatus=="INVALID";
    if(form?.touched && (control?.touched || control?.dirty)){
      return formStatus=="INVALID"
      }
      return false;
  };
}

export class CrossFieldErrorMatcherNew implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
  const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  };

}


export interface PeriodicElement {

  
  claimAck: string;
  policy: string;
  nameOfInsured: string;
  ownerName: string;
  dateOfEvent: string;
  claimType: string;
  intimationDate: string;
  claimStatus: string;
  intimatingBranch: string;
  case: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { claimAck: '002962321', policy: '002962321', nameOfInsured: 'Mr Sachin', ownerName: 'Mr Satish Kumar', dateOfEvent: '13-02-2022', claimType: 'Rider', intimationDate: '03-06-2022', claimStatus: 'Submitted', intimatingBranch: '033', case: 'Individual Life' },
  { claimAck: '002962321', policy: '002962321', nameOfInsured: 'Mr Sachin', ownerName: 'Mr Satish Kumar', dateOfEvent: '13-02-2022', claimType: 'Death', intimationDate: '03-06-2022', claimStatus: 'Submitted', intimatingBranch: '033', case: 'Individual Life' },
  { claimAck: '002962321', policy: '002962321', nameOfInsured: 'Mr Sachin', ownerName: 'Mr Satish Kumar', dateOfEvent: '13-02-2022', claimType: 'Rider', intimationDate: '03-06-2022', claimStatus: 'Submitted', intimatingBranch: '033', case: 'Individual Life' },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();
  trackclientForm!:FormGroup
  formGroup!: FormGroup;
  clientForm!: FormGroup;
  id: any;
  submitted: Boolean = false;
  trackFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  displayedColumns: string[] = ['claimAck', 'policy', 'nameOfInsured', 'ownerName', 'dateOfEvent', 'claimType', 'intimationDate', 'claimStatus', 'intimatingBranch', 'case'];
  dataSource = ELEMENT_DATA;
  errorMatcherNew = new CrossFieldErrorMatcherNew()
  currentDate: any = new Date();
  startingdate1: any = new Date(this.currentDate.setDate(this.currentDate.getDate()));
  startingdate2: any = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));

  // endDate: any = new Date()
  // enddate1: any = new Date(this.endDate.setDate(this.endDate.getDate() ));

  minDate: any;
  minDateToFinish = new Subject<string>();
  user: any;
  constructor(private matDialogService: MatDialogService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private policyService: PolicyService,
    private intimationService: IntimationService,
    private snackBar: SnackbarService,
    private claimDetailsValidator: ClaimDetailsValidator,
    ) {

    this.minDateToFinish.subscribe(r => {
      this.minDate = new Date(r);
      // this.enddate1 = new Date(this.enddate1.setDate(this.minDate.getDate()));
    })

  }

  // craeteForm(){
    
  //   this.trackFormGroup=this.fb.group({

  //     clientID:['',[Validators.required, Validators.minLength(10),Validators.maxLength(10), alphaNumericValidator]],
  //   })
  // }



  ngOnInit(): void {
    this.id = this.route.snapshot.params['policyNo']
    this.createForm();
  }

  createForm() {
    this.formGroup = this.fb.group({
      policyNo: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(8)]]

    }
    );

    this.clientForm = this.fb.group({
      clientID: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(8)]]
    }
    );


    this.trackFormGroup = this.fb.group({
      policyNo: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(8)]],
      
    }
    
    );

    this.trackclientForm=this.fb.group({
      clientID: ['',[Validators.required,Validators.pattern('[a-zA-Z0-9]+'),Validators.maxLength(8)]]
    });

    this.searchFormGroup = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      policyNo: ['', Validators.required],
    }
    
    );
  }

//   alphaNumeric_policyNo_Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

//     const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;

//      var policyNo =control.get('policyNo')?.value;
//     if (ALPHA_NUMERIC_REGEX.test(policyNo)   && (policyNo ?.value == undefined || policyNo ?.value.length === 0)) {
//       return null;
      
//   } else {

    
//     return { policyNo: true };
     

//   }
// }

//   alphaNumeric_clientId_Validator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

//     const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9_]*$/;

//      var clientID =control.get('clientID')?.value;
//     if (ALPHA_NUMERIC_REGEX.test(clientID)   && (clientID?.value == undefined || clientID?.value.length === 0)) {
//       return null;
      
//   } else {

    
//     return { clientID: true };
     

//   }
   

// }


  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;

  }
  get c(): { [key: string]: AbstractControl } {
    return this.clientForm.controls;
  }


  get t(): { [key: string]: AbstractControl } {
    return this.trackFormGroup.controls;
  }
  get s(): { [key: string]: AbstractControl } {
    return this.trackclientForm.controls;
  }
  get w(): { [key: string]: AbstractControl } {
    return this.searchFormGroup.controls;
  }
  cancel() {
    // alert("Are you sure to clear the data?");
    this.matDialogService.openCommonDialog(
      "Are you sure to clear the data?"
    );
  }
  searchNewClaim(): any {
    this.submitted = true;


    if (this.formGroup.valid) {
      this.intimationService.getPolicyNo(this.formGroup.value.policyNo).subscribe((res: any) => {
        console.log(this.formGroup.value.policyNo)
        if (res) {
          this.intimationService.setPolicyno(res);
          this.router.navigate(['/claims-intimation/search-intimation']);
          let content = 'Data Found successfully'
          let action = 'close'
          this.snackBar.success(content, action);
        } 
       

      }, error => {
        if(error.status === 400){
          console.log("error error error")
          this.matDialogService.openAlertDialog('Policy Number Is Invalid')
        }else{
          this.matDialogService.openAlertDialog('Service Unavailable')
        
        }
      })
    } else if (this.clientForm.valid) {
      this.intimationService.getClientID(this.clientForm.value.clientID).subscribe((res: any) => {
        console.log(this.clientForm.value.clientID)
        if (res.status === "SUCCESS") {
          this.intimationService.setClientId(res.objList);
          this.intimationService.setClaimList(this.clientForm.value.clientID);
          this.router.navigate(['/claims-intimation/claim-list']);
          let content = 'Data Found successfully'
          let action = 'close'
          // this.snackBar.success(content, action);
        } else{
          this.matDialogService.openAlertDialog(res.statusMsg) 

        }

      }, error => {
        if (error.status === 400) {
          console.log("error error error")
          this.matDialogService.openAlertDialog('Client ID Is Invalid') 
        } else {
          this.matDialogService.openAlertDialog('Service Unavailable')

        }

      })
    }
    else if((this.formGroup.value.policyNo.length===0 && this.clientForm.value.clientID.length===0)){
      this.matDialogService.openAlertDialog('Please Enter Policy No. / Client ID')
    }
      localStorage.removeItem('ClaimDetails');
      localStorage.removeItem('eventDetails');
      // localStorage.removeItem('allTabCIData');
      localStorage.removeItem('validationResponse');
      localStorage.removeItem('nomineeDetails');
      localStorage.removeItem('savedNomineeData');
      localStorage.removeItem('finalPolicySubmitres');

  }
  trackClaim():any {
    this.submitted = true;

    if (this.trackFormGroup.valid) {
      this.intimationService.getPolicyNo(this.trackFormGroup.value.policyNo).subscribe((res: any) => {
        console.log(this.trackFormGroup.value.policyNo)
        if (res) {
          this.intimationService.setPolicyno(res);
          this.router.navigate(['/claims-intimation/track-claim-list']);
          let content = 'Data Found successfully'
          let action = 'close'
          this.snackBar.success(content, action);
        } 
       

      }, error => {
        if(error.status === 400){
          console.log("error error error")
          this.matDialogService.openAlertDialog('Policy Number Is Invalid')
        }else{
          this.matDialogService.openAlertDialog('Service Unavailable')
        
        }
      })
    } else if (this.trackclientForm.valid) {
      this.intimationService.getClientID(this.trackclientForm.value.clientID).subscribe((res: any) => {
        console.log(this.trackclientForm.value.clientID)
        if (res.status === "SUCCESS") {
          this.intimationService.setClientId(res.objList);
          this.intimationService.setClaimList(this.trackclientForm.value.clientID);
          this.router.navigate(['/claims-intimation/get-track-claim-list']);
          let content = 'Data Found successfully'
          let action = 'close'
        } else{
          this.matDialogService.openAlertDialog(res.statusMsg)
        }

      }, error => {
        if (error.status === 400) {
          console.log("error error error")
          this.matDialogService.openAlertDialog('Client ID Is Invalid') 
        } else {
          this.matDialogService.openAlertDialog('Service Unavailable')

        }

      })
    }
    else if((this.trackFormGroup.value.policyNo.length===0 && this.trackclientForm.value.clientID.length===0)){
      this.matDialogService.openAlertDialog('Please Enter Policy No. / Client ID')
    }

    localStorage.removeItem('ClaimDetails');
    localStorage.removeItem('eventDetails');
    // localStorage.removeItem('allTabCIData');
    localStorage.removeItem('validationResponse');
    localStorage.removeItem('nomineeDetails');
    localStorage.removeItem('savedNomineeData');
    localStorage.removeItem('finalPolicySubmitres');

  }
  searchWork() {
    this.submitted = true;

    if (this.searchFormGroup.valid) {
      this.router.navigate(['/claims-intimation/new-claim-intimation']);
      
    }
  }
  clearData(){
    this.formGroup.reset()
    this.submitted = false;
    this.formGroup.controls['policyNo'].setValue('')
    this.clientForm.controls['clientID'].setValue('')
  }

  clearDataTrackClaim(){
    this.trackFormGroup.reset()
    this.submitted = false;
    this.trackFormGroup.controls['policyNo'].setValue('')
    this.trackclientForm.controls['clientID'].setValue('')
  }

  dateChange(e: any) {
    this.minDateToFinish.next(e.value.toString());

  }




}
