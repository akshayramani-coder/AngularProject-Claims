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
    return formStatus=="INVALID";
  };
}

/** Error when the parent is invalid */
@Component({
  selector: 'app-track-claim',
  templateUrl: './track-claim.component.html',
  styleUrls: ['./track-claim.component.scss']
})
export class TrackClaimComponent implements OnInit {
  errorMatcher = new CrossFieldErrorMatcher();
  formGroup!: FormGroup;
  clientForm!: FormGroup;
  id: any;
  submitted: Boolean = false;
  trackFormGroup!: FormGroup;
  searchFormGroup!: FormGroup;
  
  constructor(private matDialogService: MatDialogService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private policyService: PolicyService,
    private intimationService: IntimationService,
    private snackBar: SnackbarService,
    private claimDetailsValidator: ClaimDetailsValidator,
    ) {



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
      policyNo: ['']

    },
    {
      validators: [
        this.claimDetailsValidator.alphaNumeric_policyNo_Validator,
      ]
    }
    );

    this.clientForm = this.fb.group({
      clientID: ['']

    },
    {
      validators: [
        this.claimDetailsValidator.alphaNumeric_clientId_Validator,
      ]
    }
    );


    this.trackFormGroup = this.fb.group({
      policyNo: ['', Validators.required],
      clientID: [''],
    }
    
    );
    this.searchFormGroup = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      policyNo: ['', Validators.required],
    }
    
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
    return this.clientForm.controls;
  }
  get c(): { [key: string]: AbstractControl } {
    return this.clientForm.controls;
  }


  get t(): { [key: string]: AbstractControl } {
    return this.trackFormGroup.controls;
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

  trackClaim():any {
    this.submitted = true;

    if (this.trackFormGroup.valid) {
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
        if (res) {
          this.intimationService.setClientId(res);
          this.intimationService.setClaimList(this.clientForm.value.clientID);
          this.router.navigate(['/claims-intimation/track-claim-list']);
          let content = 'Data Found successfully'
          let action = 'close'
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

    localStorage.removeItem('ClaimDetails');
    localStorage.removeItem('eventDetails');
    // localStorage.removeItem('allTabCIData');
    localStorage.removeItem('validationResponse');
    localStorage.removeItem('nomineeDetails');
    localStorage.removeItem('savedNomineeData');
    localStorage.removeItem('finalPolicySubmitres');

  }

  clearData(){
    
  }


}
