import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { SnackbarService } from '../../core/snackbar.service';
import { ClaimDetailsValidator } from '../validators/claim-details-validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { CrossFieldErrorMatcherNew } from '../home/home.component';


/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // var controlDirty=control?.['dirty']||false;
    var formStatus=form?.form.status;
    // return controlDirty && formStatus=="INVALID";
    return formStatus=="INVALID";
  };
}


// import { Con }
@Component({
  selector: 'app-new-claim-intimation',
  templateUrl: './new-claim-intimation.component.html',
  styleUrls: ['./new-claim-intimation.component.scss']
})
export class NewClaimIntimationComponent implements OnInit {

  errorMatcher = new CrossFieldErrorMatcher();
  formGroup!: FormGroup;
  clientForm!: FormGroup;
  submitted: boolean = false
  id: any;
  errorMatcherNew = new CrossFieldErrorMatcherNew();
  data:any;
  constructor(private matDialogService: MatDialogService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private policyService: PolicyService,
    private intimationService: IntimationService,
    private snackBar: SnackbarService,
    private claimDetailsValidator: ClaimDetailsValidator,
    ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['policyNo']
    this.createForm();
  }
  createForm() {
    this.formGroup = this.fb.group({
      policyNo: ['',[Validators.required,Validators.pattern('[A-Za-z0-9]+'),Validators.maxLength(8)]]

    }
    );
    this.clientForm = this.fb.group({
      clientID: ['',[Validators.required,Validators.pattern('[0-9]+'),Validators.maxLength(8)]]

    }
    );

  }
  get f(): { [key: string]: AbstractControl } {
    return this.formGroup.controls;
  }
  get c(): { [key: string]: AbstractControl } {
    return this.clientForm.controls;
  }
  cancel() {
    // this.matDialogService.openCommonDialog(
    //   "Are you sure to clear the data?"
    // );
    this.submitted = false;
    this.formGroup.controls['policyNo'].setValue('')
    this.clientForm.controls['clientID'].setValue('')

  }

  searchIntimation() {
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
        // else{
        //   let content = 'Data Not Found successfully' 
        //   let action = 'close'
        //   // this.snackBar.error(content, action)
        //   // alert('Policy No is invalid')

        //   this.matDialogService.openAlertDialog('Policy Number Is Invalid')
        // }

      }, error => {
        if (error.status === 400) {
          console.log("error error error")
          this.matDialogService.openAlertDialog('Policy Number Is Invalid')
        } else {
          this.matDialogService.openAlertDialog('Service Unavailable')

        }

      })
    } else if (this.clientForm.valid) {
      this.intimationService.getClientID(this.clientForm.value.clientID).subscribe((res: any) => {
        console.log(this.clientForm.value.clientID)
        this.data = res 
        console.log('this', this.data.objList)
        if (this.data.status === "SUCCESS") {
          this.intimationService.setClientId(this.data.objList);
          this.intimationService.setClaimList(this.clientForm.value.clientID);
          console.log('this', res)
          this.router.navigate(['/claims-intimation/claim-list']);
          let content = 'Data Found successfully'
          let action = 'close'
          // this.snackBar.success(content, action);
        } else{
          this.matDialogService.openAlertDialog(this.data.statusMsg) 
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
  }
}
