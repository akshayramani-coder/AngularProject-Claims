import { Component, OnInit, Inject, Input, SimpleChanges } from '@angular/core';
import { Data, Router, TitleStrategy } from '@angular/router';
import { formatDate } from '@angular/common';
// import { MustMatch } from 'src/app/services/must-match-validator.service';
import { MustMatch } from '../../services/mat-service/must-match-validator.service';
import { LifeAssuredDetailsComponent } from '../../life-assured-details/life-assured-details.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  AbstractControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { RoleDetailsService } from '../../services/common-service/role-details.service';
import { PolicyService } from '../../services/common-service/policy.service';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { LookupService } from '../../services/lookup/lookup.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { PanDetails, ThirdPartyCalls } from '../../services/common-service/third-party-calls';
import { MatDialogService } from '../../services/mat-service/mat-dialog.service';
import { IntimationService } from '../../services/common-service/intimation.service';
import { CommonAlertComponent } from '../../common-popup/common-alert/common-alert.component';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NomineeValidator } from '../../validators/nominee-bankdetails-validator';
import { ErrorStateMatcher } from '@angular/material/core';
import { CrossFieldErrorMatcherForNominee, CrossFieldErrorMatcherNew } from '../../ErrorStateMatcher/ErrorStateMatcher-nominee-Bank-details';
import { transformMenu } from '@angular/material/menu';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // var controlDirty=control?.['dirty']||false;
    var formStatus = form?.form.status;
    // return controlDirty && formStatus=="INVALID";
    // console.log("form errors",form?.errors)
    if (form?.touched && (control?.touched || control?.dirty)) {
      return formStatus == "INVALID";
    }
    return false;
  };
}
@Component({
  selector: 'app-nominee-and-bank-details',
  templateUrl: './nominee-and-bank-details.component.html',
  styleUrls: ['./nominee-and-bank-details.component.scss']
})
export class NomineeAndBankDetailsComponent implements OnInit {
  dialogCommonRef!: MatDialogRef<CommonAlertComponent>;
  trackClaim: boolean = false;
  errorMatcherNew = new CrossFieldErrorMatcherNew();
  errorMatcher = new CrossFieldErrorMatcher();
  errorMatcherNominee = new CrossFieldErrorMatcherForNominee()
  appCode: any;
  pushedData: any;
  validationResponse: any;
  userData: any;
  dateValue: any;
  formGroup!: FormGroup;
  experienceList: any;
  filterData: any;
  arr!: FormArray;
  NomineeDetails: any;
  submitArray: any;
  nomineeListdata: any;
  isNomineeAdded: any;
  submitted = false;
  data: any;
  policyNo: any;
  savedData: any;
  isApoointee: any;
  saveEnable: any;
  allData: any;
  claimDetailId: any;
  realationLifeAssured: any;
  events: string[] = [];
  date: any;
  age: any;
  prefix: any;
  nationalist: any;
  legalhairlist: any;
  payoutoptionelist: any;
  statelist: any;
  genderlist: any;
  clientId: any;
  impsStatus: any;
  imps: any;
  panstatus: any;
  claimDetails: any;
  claimType: any;
  clientRole: any;
  ageData: any;
  visibleAppointee;
  isAppointee;
  newArrayOfObj: any;
  policyNum: any;
  nomineeBankDetails: any;
  regClaimType: any;
  isReadonly: any;
  nomineeFormData: any;
  roleCode: any;
  isPnaValidated: any;
  saveValidation: any
  isformValidated: any;
  updateObj: any;
  isClientId: boolean = false;
  saveClientId: any;
  nomineeDatas: any;
  impsValidate: any;
  max_Date = new Date();
  isPanContainsSpecialCharacters = false;
  form60 = false;
  isBankDetailsEdited: any;
  panvalidation: any
  banEditValue: any;
  booleanValue: boolean = false
  nriFlags: any;
  nomineeDetailsId: any;
  lengthData: any;
  taskCode: any;
  isEditedCicked: any;
  policyNumber: any;
  maxDob: Date;
  form60Check: any;
  isPanValidated: any;
  isPnaValidatedInput: any;
  constructor(private route: Router,
    public dialog: MatDialog,
    private lookupService: LookupService,
    private policyService: PolicyService,
    private router: Router,
    private allCommonService: AllCommonService,
    private commonService: AllCommonService,
    private fb: FormBuilder,
    private nomineedetailsservice: RoleDetailsService,
    private thirdPartyCalls: ThirdPartyCalls,
    private matDialogService: MatDialogService,
    private intimationService: IntimationService,
    private nomineeValidator: NomineeValidator,
    private RoleDetailsService: RoleDetailsService,
  ) {
    const today = new Date();
    this.maxDob = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );
  }

  @Input() callFetchData;

  ngOnchanges(changes: SimpleChanges) {
    console.log(changes)
    if (changes['callFetchData']) {
      if (this.appCode == "AS") {

        this.onNomineeFetchData()
      }
    }
  }

  get nomineeData(): FormArray {
    return <FormArray>this.formGroup.get('arr');
  }

  ngOnInit(): void {
    console.log('here')
    this.clientId = this.intimationService.getClientId()
    this.regClaimType = this.allCommonService.getElementData();
    this.taskCode = this.allCommonService.getTaskCode();
    console.log("regClaimType", this.regClaimType);
    this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');
    this.claimType = this.claimDetails.claimType;
    if (this.claimType == "CLAIM_TYPE_CI" || this.claimType == "CLAIM_TYPE_DISABILITY" || this.regClaimType == 'CLAIM_TYPE_CI' || this.regClaimType == 'CLAIM_TYPE_DISABILITY') {
      this.claimType = false;
    }
    else {
      this.claimType = true
    }
    this.appCode = localStorage.getItem('appcode')
    this.formGroup = this.fb.group({
      arr: this.fb.array([])
    }, { validator: [this.nomineeValidator.percentage] });
    if (this.appCode == 'CI') {
      this.isReadonly = false; // NOT CR TO CI
      this.booleanValue = false
      var claimData = this.commonService.getProfileData();
      console.log('>?>?>?>>??>>>>>>', claimData)
      this.policyNo = claimData;
      this.onNomineeFetchData();
      console.log("policyNo is::::::", this.policyNo)
    } else if (this.appCode == 'AP' || this.appCode == 'PO') {
      this.isReadonly = true;
      this.policyNo = this.commonService.getCRClaimData();
      console.log("policyNo is::::::", this.policyNo);
      this.onNomineeFetchData();
    } else {
      this.isReadonly = false;
      this.booleanValue = true
      this.policyNo = this.commonService.getCRClaimData();
      console.log("policyNo is::::::", this.policyNo);
      this.onNomineeFetchData();
    }
    this.getAllrealationLifeAssured();
    this.getPrefixlist();
    this.getnationalityxlist();
    this.getlegallist();
    this.getpayoutoptionelist();
    this.getstatelist();
    this.getgenderlist();

    // this.readOnlyFormCI()
    this.trackClaim = this.allCommonService.getTrackClaim();
    if (this.trackClaim) {
      this.formGroup.disable();
    }
    
   
  }
  addNomineeData(contact: any, nomineeType?: any) {
    if (nomineeType) {
      this.nomineeData.push(this.nomineeForm(contact, nomineeType));
    }
    else {
      this.nomineeData.push(this.nomineeForm(contact));
    }

  }

  nationalityFlag(value, index) {
    console.log("country is:::::::::", value);
    if (value == 'NATIONALITY_INDIA') {
      // this.nriFlags = "N"
      this.userFormGroups.controls[index].patchValue(
        {
          nriFlag: "N"

        }
      );
    } else {
      console.log("Here")
      // this.nriFlags = "Y"
      this.userFormGroups.controls[index].patchValue(
        {
          nriFlag: "Y"

        }
      );
    }
  }

  form60Flag(value, i) {
    if (value == 'N') {
      console.log()
      this.form60Check = true;
      // this.userFormGroups.controls[i].get('form60Yn')?.setValidators(Validators.required)
      this.userFormGroups.controls[i].get('pan')?.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]);
    } else {
      this.form60Check = false;
      // this.userFormGroups.controls[i].get('form60Yn')?.setValidators(Validators.required)
      this.userFormGroups.controls[i].get('pan')?.clearValidators();
    }
    this.userFormGroups.controls[i].get('pan')?.updateValueAndValidity();
    // this.userFormGroups.controls[i].get('form60Yn')?.updateValueAndValidity();
  }

  // to check the age of user
  addEvent(type: string, event: MatDatepickerInputEvent<Date>, index, formGroup) {
    console.log(formGroup)
    console.log("isclicked>>>", this.isEditedCicked)
    this.events.push(`${type}: ${event.target.value}`);
    console.log("date is:::::::::", event.target.value);
    this.dateValue = event.target.value?.toString();
    this.onAgeCalculation(this.dateValue);
    this.agePrint(index);
    console.log("age is:::", this.age)
    console.log("nominee??????", this.nomineeListdata);
    // this.nomineeListdata = this.nomineeData.value;
    console.log("nominee", this.nomineeListdata);
    console.log("", this.formGroup.getRawValue());
    if (this.appCode != 'CI') {
      this.nomineeListdata = formGroup.getRawValue().arr;
    } else {
      this.nomineeListdata = this.nomineeData.value;
    }
    // console.log(this.nomineeListdata);
    var boolVar = this.nomineeListdata.some(value => { return value.clientRole == "Apointee" });
    // To check and remove apointee if benificary age is major start
    var nomineeList = this.nomineeListdata.filter(value => { return value.clientRole != "Apointee" });
    console.log("nomineeList", nomineeList)
    var checkAge;
    for (let list of nomineeList) {
      if (list.dateOfEvent > 18 && list.dateOfEvent != "" && list.clientRole != "Apointee") {
        checkAge = true
      } else {
        checkAge = false
        break;
      }
    }
    console.log("checkAge", checkAge)
    var apoointeeIndex = this.nomineeListdata.findIndex(value => { return value.clientRole == "Apointee" });
    console.log("apoointeeIndex", apoointeeIndex)
    if (boolVar == true && this.age > 18 && checkAge == true) {
      console.log("Hi", boolVar);
      this.arr = this.formGroup.get('arr') as FormArray;
      console.log('i', apoointeeIndex);
      console.log('<::::', this.arr);
      this.arr.removeAt(apoointeeIndex);
      if (apoointeeIndex < this.lengthData) {
        this.lengthData -= 1
      }
      console.log('::::>', this.arr);
      // To check and remove apointee if benificary age is major end
    } else if (boolVar == false) {
      this.onApointeeAdd();
      var filterdApointeeData = this.nomineeListdata.filter(function (el) {
        return el.clientRole == "Apointee";
      }
      );
      console.log("hi", filterdApointeeData)
      var nomineeArr = filterdApointeeData;
      // if (nomineeArr.length> 1) {
      nomineeArr.forEach(element => {
        this.nomineeBankDetails = {
          "nomineeBankDetails": { "nomineeBankId": "", "nomineeDetailId": "", "claimsDetailId": "", "beneficiaryName": " ", "accountNo": "1", "ifscCode": "AAAB0000000", "bankName": " ", "impsStatus": "", "branchName": "A", "micrCode": "000000000" }
        }
        var nomineeData = element;
        this.data = Object.assign(this.nomineeBankDetails, nomineeData);
        console.log("this.dateValue ", this.dateValue);
        this.dateValue = '';
        this.onAgeCalculation(this.dateValue);
        this.addNomineeData(this.data);
      });
      console.log("hgcdfgs", this.nomineeListdata);
      // }
    }


  }

  onAgeCalculation(value) {
    console.log("value is::", value)
    this.date = value;
    var dob = new Date(this.date);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    this.age = Math.abs(year - 1970);
    //display the calculated age  
    if (isNaN(this.age)) {
      this.age = '';
    }
    // console.log("Age of the date entered: " + this.age + " years");
  }

  passAgeValue(data) {
    console.log("DOB is", data);
    this.ageData = data;
    this.onAgeCalculation(this.ageData);
    this.onApointeeAdd();
  }
  //Add Apointee if age is less than 18
  onApointeeAdd() {
    //For adding apointee if age is less than 18

    // console.log('this.addNomineeData', this.addNomineeData(this.data))
    // this.nomineeListdata.forEach((element, index) => { 
    //   element[index].ageValue = this.age;
    // });

    this.nomineeListdata.forEach(object => {
      object.ageValue = this.age;
    });
    var findClientRole = this.nomineeListdata.every(item => item.clientRole != 'Appointee');
    console.log("findClientRole", findClientRole);
    console.log("nomineeArray::", this.nomineeListdata);
    if (findClientRole == true) {

      if (this.age < 18 && this.nomineeListdata.length != 0) {
        const result = this.nomineeListdata.find(({ ageValue }) => ageValue < 18);
        console.log("result is:::", result);
        const validation = this.nomineeListdata.every(item => item.firstName || item.firstName == null && item.lastName || item.lastName == null && item.clientRole != 'Appointee');
        console.log("validation is::", validation);
        var isEmpty = Object.keys(result).length === 0;
        console.log("isEpmty value", isEmpty);
        if (isEmpty == false && result != undefined && validation == true) {
          // this.booleanValue = false

          var emptyObj = {
            clientRole: "Apointee",
            roleCode: "AP",
            clientRolwCode: "AP",
            ageValue: "",
            clientId: 0,
            impsStatus: 'DIRECT_MATCH',
            intimationSource: 'INT_SRC_BRNCH'
          };
          this.nomineeListdata.push(emptyObj);
        } else {
        }
        console.log("res", this.nomineeListdata);
      } else if (this.nomineeListdata.length == 0) {
        this.booleanValue = false

        var emptyObj = {
          clientRole: "Apointee",
          roleCode: "AP",
          clientRolwCode: "AP",
          ageValue: ""
          , clientId: 0,
          impsStatus: 'DIRECT_MATCH',
          intimationSource: 'INT_SRC_BRNCH'
        };
        this.nomineeListdata.push(emptyObj);

      }
      console.log("res", this.nomineeListdata);
    }
  }
  // Set LocalStorage Data in Claim Intimation only
  onLocalstorageFetchDataCI() {// Set LocalStorage Data in Claim Intimation only
    if (this.appCode === 'CI') {
      this.nomineeDatas = JSON.parse(localStorage.getItem('nomineeDetails') || '{}');
      // for (var policyid in this.nomineeDatas) {
      let policyid = this.policyNum
      this.nomineeListdata = this.nomineeDatas[policyid].data
      console.log('this.nomineeData????????', this.nomineeListdata)
      const newArrayOfObj = this.nomineeListdata.map(({
        dob: dateOfBirth, roleCode: clientRolwCode, mobileNo: contactNo, emailid: emailAddress, address1: cltaddr01, address2: cltaddr02, country: country,
        city: cltaddr03, pincode: cltpcode, prefix: salutaion, nriYn: nriFlag, sameAsProposers: sameasProposer, Nationality: nationality, relationWithLife: relationshipWithLifeAssured,
        nimineePercentage: shareAmount, accountName: beneficiaryName, accountNumber: accountNo,
        reAccountNumber: reAccountNumber, bankName: bankName, branchName: branchName, ifscCode: ifscCode,
        micrCode: micrCode, landlineno: phoneNumber, ...rest
      }) => ({
        dateOfBirth, contactNo, emailAddress, country, clientRolwCode, nationality, cltaddr01, cltaddr02, cltaddr03, nriFlag, cltpcode, salutaion, relationshipWithLifeAssured, shareAmount,
        beneficiaryName, accountNo, branchName, ifscCode, micrCode, bankName, phoneNumber,
        ...rest
      }));
      this.nomineeBankDetails = {
        "nomineeBankDetails": {
          "nomineeBankId": "",
          "nomineeDetailId": "",
          "claimsDetailId": "",
          "beneficiaryName": "",
          "accountNo": "",
          "ifscCode": "",
          "bankName": "",
          "impsStatus": "",
          "branchName": "",
          "micrCode": "",
        }
      }
      this.nomineeListdata = newArrayOfObj;
      if (this.claimType == true) {
        this.nomineeListdata.forEach(element => {
          var nomineeData = element;
          this.clientRole = nomineeData.clientRole;
          this.passAgeValue(element.dateOfBirth);
          this.data = Object.assign(this.nomineeBankDetails, nomineeData);
          this.addNomineeData(this.data);
        });
      } else {
        var nomineeCIList = this.nomineeDatas[policyid].data;
        this.nomineeListdata = nomineeCIList.slice(0, 1);
        this.nomineeListdata.forEach(element => {
          var nomineeData = element;
          this.data = Object.assign(this.nomineeBankDetails, nomineeData);
          this.addNomineeData(this.data)
        });
      }
      // }

    }
  }

  // Featch Data Nominee  For API 
  onNomineeFetchData() {
    if (this.appCode != 'CI') {

      this.nomineedetailsservice.getNomineeDetails().subscribe((res: any) => {
        if (this.appCode == "AS") {
          this.userFormGroups.clear()
        }
        this.allCommonService.setNomineeFeatchData(res);
        this.lengthData = res.length
        console.log('??????????', res)
        console.log("This.userformgroup", this.userFormGroups)
        const newArrayOfObj = res.map(({
          dob: dateOfBirth,
          mobile: contactNo,
          emailid: emailAddress,
          address1: cltaddr01,
          address2: cltaddr02,
          country: country,
          city: cltaddr03,
          pin: cltpcode,
          prefix: salutaion,
          nriYn: nriFlag,
          // sameAsProposer: sameasProposer,
          landlineno: phoneNumber,
          nationality: nationality,
          legalHeirCat: legalCategory,
          relationWithLa: relationshipWithLifeAssured,
          nominationPercentage: shareAmount,
          roleCode: clientRolwCode,
          impsStatus: impsStatus,
          intimationRemarks: intimationRemarks,
          registrationRemarks: registrationRemarks,
          assessorRemarks: assessorRemarks,
          ...rest }) => ({
            clientRolwCode, intimationRemarks, registrationRemarks, assessorRemarks, dateOfBirth, phoneNumber, contactNo, emailAddress, country, nationality, cltaddr01, cltaddr02, cltaddr03, nriFlag, cltpcode, salutaion, relationshipWithLifeAssured, shareAmount, legalCategory,
            ...rest,
          }));
        this.nomineeListdata = newArrayOfObj;
        console.log("resissssssss::::", this.nomineeListdata);
        this.regRiderAddData();
        this.nomineeListdata.forEach(element => {
          this.data = element;
          this.passAgeValue(element.dateOfBirth);
          this.addNomineeData(this.data)
        });
      });
    } else {
      
      this.nomineeDatas = JSON.parse(localStorage.getItem('nomineeDetails') || '{}');
      this.policyNum = this.allCommonService.getProfileData();
      let policyArray: any = []
      for (var policyId in this.nomineeDatas) {
        policyArray.push(this.nomineeDatas[policyId].policyid)
        console.log(':::::::::::::::::::', this.policyNumber)
        console.log('?>?>>?>?>?>?>?>??>?>', this.policyNum)
      }
      if (Object.keys(this.nomineeDatas).length != 0 && (policyArray.includes(this.policyNum))) {
        this.policyNumber = this.policyNum;
        this.onLocalstorageFetchDataCI();
      } else {
        this.allCommonService.stringSubject.subscribe(data => {
          console.log('next subscribed value: ' + data);
          this.nomineeBankDetails = {
            "nomineeBankDetails": {
              "nomineeBankId": "",
              "nomineeDetailId": "",
              "claimsDetailId": "",
              "beneficiaryName": "",
              "accountNo": "",
              "ifscCode": "",
              "bankName": "",
              "impsStatus": "",
              "branchName": "",
              "micrCode": "",
            }
          }
          var allTabData = data;
          this.nomineeListdata = allTabData.clientDetailsBenefeciary;
          this.regRiderAddData();
          if (this.claimType == true) {
            // var allTabData = data;
            // this.nomineeListdata = allTabData.clientDetailsBenefeciary;
            console.log("grgfsgfsjdddddddddddddddd", this.nomineeListdata);
            this.nomineeListdata.forEach(element => {
              var nomineeData = element;
              this.clientRole = nomineeData.clientRole;
              this.passAgeValue(element.dateOfBirth);
              console.log('::::::role', this.clientRole);
              this.data = Object.assign(this.nomineeBankDetails, nomineeData);
              console.log("ffjkfjdj", this.data)
              this.addNomineeData(this.data);
            });
          } else {
            var allTabData = data;
            var nomineeCIList = allTabData.clientDetailsBenefeciary;
            this.nomineeListdata = nomineeCIList.slice(0, 1);
            console.log("nomlist::", this.nomineeListdata);
            console.log("res", this.nomineeListdata);
            this.nomineeListdata.forEach(element => {
              var nomineeData = element;
              this.data = Object.assign(this.nomineeBankDetails, nomineeData);
              // this.data = element;
              this.addNomineeData(this.data)
            });
          }

        }
        );

      }

    }
  }


  // Nominee Data Binding 
  nomineeForm(data, nomineeType?: string): any {
    console.log(data)
    if (this.appCode == 'CI' && this.claimType == true && data.pan) {
      this.isPnaValidated = true;
    }else{
      this.isPnaValidated = false;
    }
  
    if (this.appCode === "CI") {
      let nomineeBankDetails = {}
      nomineeBankDetails["beneficiaryName"] = data.beneficiaryName ? data.beneficiaryName:  data.accountName ;
      nomineeBankDetails["accountNo"] = data.accountNo ?  data.accountNo : data.accountNumber;
      nomineeBankDetails["accountNo"] = data.accountNo ?  data.accountNo : data.accountNumber;
      nomineeBankDetails["bankName"] = data.bankName;
      nomineeBankDetails["branchName"] = data.branchName;
      nomineeBankDetails["ifscCode"] = data.ifscCode;
      nomineeBankDetails["micrCode"] = data.micrCode;
      nomineeBankDetails["impsStatus"] = data.impsStatus;
      data["nomineeBankDetails"] = nomineeBankDetails
    }
 

    if (data.nationality == "NATIONALITY_INDIA") {
      data.nri = "N"
    }
    else {
      if (data.nationality != null) {
        data.nri = "Y"
      }
    }

    let nomineeFormGroup = this.fb.group({
      title: ['abc'],
      //  nomineeDetailId: [data.nomineeDetailId],
      clientLaYn: [data.clientLaYn ? data.clientLaYn : ' '],
      ocmMatchYn: [data.ocmMatchYn ? data.ocmMatchYn : ' '],
      aprvdPayoutYn: [data.aprvdPayoutYn ? data.aprvdPayoutYn : 'N'],
      intimationSource: [data.intimationSource ? data.intimationSource : ' '],
      nomineeDetailId: [data.nomineeDetailId ? data.nomineeDetailId : ' '],
      clientId: [data.clientId ? data.clientId : 0],
      roleCode: [data.clientRolwCode],
      clientRole: [data.clientRole ? data.clientRole : ' '],
      prefix: [{ value: data.salutaion, disabled: this.booleanValue }, [Validators.required]],
      firstName: [{ value: data.firstName, disabled: this.booleanValue }, [Validators.required]],
      lastName: [{ value: data.lastName, disabled: this.booleanValue }, [Validators.required]],
      emailid: [{ value: data.emailAddress, disabled: this.booleanValue }, [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      dob: [{ value: data.dateOfBirth, disabled: this.booleanValue }, [Validators.required]],
      dateOfEvent: [{ value: this.age, disabled: this.booleanValue }, [Validators.required]],
      gender: [{ value: data.gender, disabled: this.booleanValue }, [Validators.required]],
      mobileNo: [{ value: data.contactNo, disabled: this.booleanValue }, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[0-9]{10}')]],
      landlineno: [{ value: data.phoneNumber, disabled: this.booleanValue }, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      address1: [{ value: data.cltaddr01, disabled: this.booleanValue }, [Validators.required]],
      address2: [{ value: data.cltaddr02, disabled: this.booleanValue }, [Validators.required]],
      nriFlag: [{ value: data.nri, disabled: this.booleanValue }],
      Nationality: [{ value: data.nationality, disabled: this.booleanValue }, [Validators.required]],
      country: [{ value: data.country, disabled: this.booleanValue }, [Validators.required]],
      state: [{ value: data.state, disabled: this.booleanValue }, [Validators.required]],
      city: [{ value: data.cltaddr03, disabled: this.booleanValue }, [Validators.required, Validators.pattern("^\\w+( \\w+)*$")]],
      pincode: [{ value: data.cltpcode, disabled: this.booleanValue }, [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
      relationWithLife: [{ value: data.relationshipWithLifeAssured, disabled: this.booleanValue }, [Validators.required]],
      nimineePercentage: [{ value: data.shareAmount ? data.shareAmount : '0', disabled: this.booleanValue }, [Validators.required, Validators.pattern('^0*$|^[1-9][0-9]?$|^100$')]],
      legalCategory: [{ value: data.legalCategory, disabled: this.booleanValue }, [Validators.required]],
      sameAsProposer: [{ value: data.sameAsProposer ? data.sameAsProposer : "", disabled: this.booleanValue }, [Validators.required]],
      payoutOption: [{ value: data.payoutOption, disabled: this.booleanValue }, [Validators.required]],
      form60Yn: [{ value: data.form60Yn, disabled: this.booleanValue }, [Validators.required]],
      // pan: [{ value: data.pan, disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]],
      accountName: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['beneficiaryName'], disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[a-zA-Z\\s-, ]*$')]], //Validators.pattern('^[a-zA-Z\s-, ]*$')
      accountNumber: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['accountNo'], disabled: this.booleanValue }, [Validators.required, Validators.pattern("^[0-9]+$")]],
      reAccountNumber: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['accountNo'], disabled: this.booleanValue }, [Validators.required, Validators.pattern("^[0-9]+$")]],
      bankName: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['bankName'], disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[a-zA-Z\\s-, ]*$')]],
      branchName: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['branchName'], disabled: this.booleanValue }, [Validators.required]],
      ifscCode: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['ifscCode'], disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[A-Z]{4}0[0-9]{6}$')]],
      micrCode: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['micrCode'], disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      impsStatus: [{ value: data.nomineeBankDetails == null ? "" : data.nomineeBankDetails['impsStatus'], disabled: this.booleanValue }],
      // payOut: [{ value: data.nomineeBankDetails == null ? " " : data.nomineeBankDetails['payOut'], disabled: this.booleanValue }, [Validators.required]],
      // intimationRemarks: [{ value: data.intimationRemarks, disabled: this.booleanValue }, [Validators.required]],
      // registrationRemarks: [{ value: data.registrationRemarks ? data.registrationRemarks : ' ', disabled: this.booleanValue }, [Validators.required]],
      // assessorRemarks: [{ value: data.assessorRemarks ? data.assessorRemarks : ' ', disabled: this.booleanValue }, [Validators.required]],

    }, {
      validator: [
        MustMatch('accountNumber', 'reAccountNumber'),
        //this.nomineeValidator.accountnumber,
        // this.nomineeValidator.re_enter_accountnumber,
        //this.nomineeValidator.ifsc_code,
        //this.nomineeValidator.bankName,
        // this.nomineeValidator.branchName,
        //this.nomineeValidator.micrCode,
        // this.nomineeValidator.mobileNumber,
        //this.nomineeValidator.telephoneNumber,
        //this.nomineeValidator.remark,
        //this.nomineeValidator.Account_holder_name,
        // this.nomineeValidator.percentage,
        //this.nomineeValidator.Account_holder_name,
        // this.nomineeValidator.pin_code,

      ]
    });
    if (this.appCode == "CI" && this.claimType == true && data.pan) {
      nomineeFormGroup.addControl('isPanValidated', new FormControl(this.isPnaValidated))
      nomineeFormGroup.addControl('pan', new FormControl({ value: data.pan, disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]));

    } else {
      nomineeFormGroup.addControl('isPanValidated', new FormControl(this.isPnaValidated))
      nomineeFormGroup.addControl('pan', new FormControl({ value: data.pan ? data.pan : ' ', disabled: this.booleanValue }));
    }
    if (data.form60Yn == "N") {
      nomineeFormGroup.addControl('pan', new FormControl({ value: data.pan, disabled: this.booleanValue }, [Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]));

    } else if (data.form60Yn == "Y") {
      nomineeFormGroup.addControl('pan', new FormControl({ value: data.pan ? data.pan : ' ', disabled: this.booleanValue }));
    }

    if (data.clientRole === "Beneficiary(OCM)" && data.ocmMatchYn === "N" && data.clientLaYn === "N") {
      nomineeFormGroup.addControl('aprvdLaUpdt', new FormControl(data.aprvdLaUpdt, [Validators.required]))

    }
    if (this.appCode == 'AP' || this.appCode == 'PO') {
      nomineeFormGroup.addControl('intimationRemarks', new FormControl({ value: data.intimationRemarks, disabled: this.booleanValue }, [Validators.required]))
      nomineeFormGroup.addControl('registrationRemarks', new FormControl({ value: data.registrationRemarks, disabled: this.booleanValue }, [Validators.required]))
      nomineeFormGroup.addControl('assessorRemarks', new FormControl({ value: data.assessorRemarks, disabled: this.booleanValue }, [Validators.required]))
    }
    if (this.appCode == "CI") {
      nomineeFormGroup.addControl('intimationRemarks', new FormControl({ value: data.intimationRemarks, disabled: this.booleanValue }, [Validators.required]))
    }
    else if (this.appCode == "CR") {
      console.log(' intemation Remark ', data.intimationRemarks)
      console.log(' nomineeType ', nomineeType)
      if (nomineeType != "new") {
        if (data.intimationRemarks != null) {
          nomineeFormGroup.addControl('intimationRemarks', new FormControl({ value: data.intimationRemarks, disabled: this.booleanValue }, [Validators.required]))
        }
      }
      nomineeFormGroup.addControl('registrationRemarks', new FormControl({ value: data.registrationRemarks, disabled: this.booleanValue }, [Validators.required]))
    }
    else if (this.appCode == "AS") {
      if (nomineeType != "new") {
        console.log(' intemation Remark ', data.intimationRemarks)
        console.log(' nomineeT ')
        if (data.intimationRemarks != null) {
          nomineeFormGroup.addControl('intimationRemarks', new FormControl({ value: data.intimationRemarks, disabled: this.booleanValue }, [Validators.required]))
        }
        if (data.registrationRemarks != null) {
          nomineeFormGroup.addControl('registrationRemarks', new FormControl({ value: data.registrationRemarks, disabled: this.booleanValue }, [Validators.required]))
        }
      }
      nomineeFormGroup.addControl('assessorRemarks', new FormControl({ value: data.assessorRemarks, disabled: this.booleanValue }, [Validators.required]))
    }
    return nomineeFormGroup
  }

  OnPanEnteredValue(value: string) {    //this is keyup event which passes dom value to function
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (format.test(value)) {
      this.isPanContainsSpecialCharacters = true
    }
    else {
      this.isPanContainsSpecialCharacters = false
    }
  }

  get f(): {} {
    return this.formGroup.controls;
  }
  getAllrealationLifeAssured() {
    this.lookupService.getrealationlifeAssured().subscribe((data: any) => {
      this.realationLifeAssured = data.content
    }
    )
  }

  // Add New Nominee 
  addNominee(): void {
    console.log(this.nomineeData);
    var clientRoleFind = this.nomineeData.value.filter(item => item.clientRole != "Beneficiary");
    if (clientRoleFind.length != 0) {
      this.validateNomineeLength()
    } else {
      if (this.nomineeData.length >= 5 && this.nomineeData.value[0].clientRole == "Beneficiary" && this.nomineeData.value[0].clientRole != undefined) {
        this.matDialogService.openAlertDialog('You Have Already 5 Nominee Add');
      } else if (this.nomineeData.length >= 5 && this.nomineeData.value[0].clientRole == undefined) {
        this.matDialogService.openAlertDialog('You Have Already 5 Nominee Add');
      } else if (this.nomineeData.length < 5 || this.nomineeData.length < 5 && this.clientRole == undefined) {
        this.isClientId = true;
        this.age = '';
        this.booleanValue = false;
        this.addNomineeData({
          firstName: null, lastName: null, mobileNo: null, address1: null, prefix: null,
          emailid: null, dob: null, dateOfEvent: null, gender: null, address2: null,
          city: null, pincode: null, state: null, landlineno: null, relationWithLife: null,
          nimineePercentage: null, Nationality: null, pan: null, country: null, form60Yn: null,
          accountName: null, accountNumber: null, reAccountNumber: null,
          ifscCode: null, payoutOption: null, impsStatus: null, nriFlag: null, legalCategory: null,
          // intimationRemarks: null, registrationRemarks: null, assessorRemarks: null,
          sameAsProposer: null, bankName: null, branchName: null, micrCode: null, roleCode: "BN", clientId: 0, clientRole: "Beneficiary", intimationSource: "INT_SRC_BRNCH",
          clientRolwCode: "BN",
          nomineeBankDetails: {
            "nomineeBankDetails": {
              "nomineeBankId": '', "nomineeDetailId": '', "claimsDetailId": '', "beneficiaryName": '', "accountNo": '', "ifscCode": '',
              "bankName": '', "impsStatus": '', "branchName": '', "micrCode": ''
            }
          },

        });
      }
    }
  }

  // For apointee added to check the length
  validateNomineeLength() {
    if (this.nomineeData.length >= 6 && this.nomineeData.value[0].clientRole == "Beneficiary" && this.nomineeData.value[0].clientRole != undefined) {
      this.matDialogService.openAlertDialog('You Have Already 5 Nominee Add');
    } else if (this.nomineeData.length >= 6 && this.nomineeData.value[0].clientRole == undefined) {
      this.matDialogService.openAlertDialog('You Have Already 5 Nominee Add');
    } else if (this.nomineeData.length < 6 || this.nomineeData.length < 6 && this.clientRole == undefined) {
      this.isClientId = true;
      this.age = '';
      this.booleanValue = false;
      this.addNomineeData({
        firstName: null, lastName: null, mobileNo: null, address1: null, prefix: null,
        emailid: null, dob: null, dateOfEvent: null, gender: null, address2: null,
        city: null, pincode: null, state: null, landlineno: null, relationWithLife: null,
        nimineePercentage: null, Nationality: null, pan: null, country: null, form60Yn: null,
        accountName: null, accountNumber: null, reAccountNumber: null,
        ifscCode: null, payoutOption: null, impsStatus: null, nriFlag: null, legalCategory: null,
        // intimationRemarks: null, registrationRemarks: null, assessorRemarks: null,
        sameAsProposer: null, bankName: null, branchName: null, micrCode: null, roleCode: "BN", clientId: 0, clientRole: "Beneficiary", intimationSource: "INT_SRC_BRNCH",
        clientRolwCode: "BN",
        nomineeBankDetails: {
          "nomineeBankDetails": {
            "nomineeBankId": '', "nomineeDetailId": '', "claimsDetailId": '', "beneficiaryName": '', "accountNo": '', "ifscCode": '',
            "bankName": '', "impsStatus": '', "branchName": '', "micrCode": ''
          }
        },

      });
    }
  }

  regRiderAddData() {
    if (this.claimType == false && this.nomineeListdata.length == 0) {
      this.addNomineeData({
        firstName: null, lastName: null, mobileNo: null, address1: null, prefix: null,
        emailid: null, dob: null, dateOfEvent: null, gender: null, address2: null,
        city: null, pincode: null, state: null, landlineno: null, relationWithLife: null, form60Yn: null,
        nimineePercentage: null, Nationality: null, pan: null, country: null, payoutOption: null,
        accountName: null, accountNumber: null, reAccountNumber: null,
        // intimationRemarks: null,registrationRemarks: null, assessorRemarks: null,
        ifscCode: null, impsStatus: null, nriFlag: null, legalCategory: null,
        sameAsProposer: null, bankName: null, branchName: null, micrCode: null, clientId: 0, clientRole: "Beneficiary", intimationSource: "INT_SRC_BRNCH",
        nomineeBankDetails: {
          "nomineeBankDetails": {
            "nomineeBankId": '', "nomineeDetailId": '', "claimsDetailId": '', "beneficiaryName": '', "accountNo": '', "ifscCode": '',
            "bankName": '', "impsStatus": '', "branchName": '', "micrCode": ''
          }
        }
      });
    }
  }

  get userFormGroups(): FormArray {
    return this.formGroup.get('arr') as FormArray;
  }

  // Nominee All Feild Enable 
  nomineeEnable(indNo) {
    this.userFormGroups.controls[indNo].get('firstName')?.enable();
    this.userFormGroups.controls[indNo].get('prefix')?.enable();
    this.userFormGroups.controls[indNo].get('lastName')?.enable();
    this.userFormGroups.controls[indNo].get('mobileNo')?.enable();
    this.userFormGroups.controls[indNo].get('address1')?.enable();
    this.userFormGroups.controls[indNo].get('emailid')?.enable();
    this.userFormGroups.controls[indNo].get('dob')?.enable();
    this.userFormGroups.controls[indNo].get('dateOfEvent')?.enable();
    this.userFormGroups.controls[indNo].get('gender')?.enable();
    this.userFormGroups.controls[indNo].get('address2')?.enable();
    this.userFormGroups.controls[indNo].get('city')?.enable();
    this.userFormGroups.controls[indNo].get('pincode')?.enable();
    this.userFormGroups.controls[indNo].get('state')?.enable();
    this.userFormGroups.controls[indNo].get('landlineno')?.enable();
    this.userFormGroups.controls[indNo].get('relationWithLife')?.enable();
    this.userFormGroups.controls[indNo].get('nimineePercentage')?.enable();
    this.userFormGroups.controls[indNo].get('Nationality')?.enable();
    this.userFormGroups.controls[indNo].get('pan')?.enable();
    this.userFormGroups.controls[indNo].get('form60Yn')?.enable();
    this.userFormGroups.controls[indNo].get('country')?.enable();
    this.userFormGroups.controls[indNo].get('accountName')?.enable();
    this.userFormGroups.controls[indNo].get('accountNumber')?.enable();
    this.userFormGroups.controls[indNo].get('reAccountNumber')?.enable();
    this.userFormGroups.controls[indNo].get('intimationRemarks')?.enable();
    this.userFormGroups.controls[indNo].get('registrationRemarks')?.enable();
    this.userFormGroups.controls[indNo].get('assessorRemarks')?.enable();
    this.userFormGroups.controls[indNo].get('ifscCode')?.enable();
    this.userFormGroups.controls[indNo].get('payoutOption')?.enable();
    this.userFormGroups.controls[indNo].get('impsStatus')?.enable();
    this.userFormGroups.controls[indNo].get('legalCategory')?.enable();
    this.userFormGroups.controls[indNo].get('sameAsProposer')?.enable();
    this.userFormGroups.controls[indNo].get('bankName')?.enable();
    this.userFormGroups.controls[indNo].get('branchName')?.enable();
    this.userFormGroups.controls[indNo].get('micrCode')?.enable();
  }

  editForm(data: any, indNo) {
    this.dialogCommonRef = this.dialog.open(CommonAlertComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'confirmpopup',
      disableClose: true,
      data: {
        message: "Do you want to edit details",
        type: 'editNomineeForm'

      },
    });
    this.dialogCommonRef.afterClosed().subscribe(data => {
      if (data == "Yes") {
        console.log("yes")
        this.nomineeEnable(indNo)
        this.isEditedCicked = true;
      }
    })

  }

  removeNomineeDetails(i: any) {
    console.log('::::>', this.arr);

    if (this.appCode != 'CI' && this.userFormGroups.controls[i].value.nomineeDetailId != ' ') {

      this.RoleDetailsService.removeNominee(this.userFormGroups.controls[i].value.nomineeDetailId).subscribe((res) => {
        console.log(res)
        this.data = res
        if (this.data.status === "SUCCESS") {
          this.arr = this.formGroup.get('arr') as FormArray;
          console.log('i', i);
          console.log('<::::', this.arr);
          // if (this.arr.length > 1) {
          this.arr.removeAt(i);
          if (i < this.lengthData) {
            this.lengthData -= 1
          }
          console.log('::::>', this.arr);
          this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
        } else {

        }
      })
    } else {
      this.arr = this.formGroup.get('arr') as FormArray;
      console.log('i', i);
      console.log('<::::', this.arr);
      // if (this.arr.length > 1) {
      this.arr.removeAt(i);
      if (i < this.lengthData) {
        this.lengthData -= 1
      }
      console.log('::::>', this.arr);
    }

  }




  onFormValidation(indNo) {
    if (this.claimType == true) {
      this.isformValidated = Object.values(this.userFormGroups.controls[indNo].value).some(value => {
        if (value === "" || value === null) {
          return true;
        }
        return false;
      });
    }
    else {
      if (this.userFormGroups.controls[indNo].value.accountNumber == "" || this.userFormGroups.controls[indNo].value.accountName == "" || this.userFormGroups.controls[indNo].value.bankName == ""
        || this.userFormGroups.controls[indNo].value.branchName == "" || this.userFormGroups.controls[indNo].value.ifscCode == "" || this.userFormGroups.controls[indNo].value.impsStatus == "" || this.userFormGroups.controls[indNo].value.micrCode == "" ||
        this.userFormGroups.controls[indNo].value.reAccountNumber == "") {
        this.isformValidated = true
      } else {
        this.isformValidated = false
      }
    }
  }
  // Nominee Data Save Local and API
  saveNomineeDetails(data: any, indNo) {
    // this.onFormValidation(indNo)
    console.log("isNullish", this.isformValidated);
    this.submitted = true;
    this.formGroup.markAllAsTouched();
    data.arr.forEach((element, index) => {
      // element.isPnaValidated = true
      console.log(`Current inde =x: ${index}`);
      console.log(element);
      element.formValid = this.formGroup.valid;
      if ((element.clientRole == 'Apointee' || element.clientRole == 'Appointee') && this.claimType == true) {
        element.accountName = 'AA';
        element.accountNumber = '1';
        element.branchName = 'AA';
        element.bankName = 'AA';
        element.ifscCode = 'AAAA0000000';
        element.impsStatus = 'DIRECT_MATCH';
        element.micrCode = '000000000';
        element.reAccountNumber = '1';
        // element.payOut = '1';
        // element.clientId = 0;
        element.sameAsProposer = 'N'
        element.nimineePercentage = '0'

      }
      this.onFormValidation(indNo);
      if (indNo == index) {
        element.isBankValidate = this.saveEnable;
        element.isPnaValidated = this.isPnaValidated;
        // element.isPnaValidatedInput = this.isPnaValidatedInput;
        element.claimType = this.claimType;
        element.saveValidation = true;
        element.formValidated = this.isformValidated;
        element.bankEdited = this.isBankDetailsEdited;
      }
    });
    var saveFormValidation = this.userFormGroups.controls[indNo].value.formValidated == false
    var formStatus = this.userFormGroups.controls[indNo].status
    console.log(this.userFormGroups.controls[indNo])
    console.log(this.claimType)
    let validForm = false
    if (this.claimType && (this.userFormGroups.controls[indNo].value.clientRole == 'Beneficiary' || this.userFormGroups.controls[indNo].value.clientRole == 'Beneficiary(OCM)')) {
      validForm = formStatus == "VALID" && this.formGroup.errors == null
      console.log("ValidForm")
    }
    else {
      validForm = saveFormValidation
    }

    if (validForm) {
      //   console.log("Success")
      // if(this.userFormGroups.controls[indNo].value.impsStatus === 'DIRECT_MATCH' || this.userFormGroups.controls[indNo].value.impsStatus == 'PARTIAL_MATCH'){
      //     this.impsValidate = true;
      // }else{
      //   this.impsValidate = false;
      // }

      this.submitArray = { policyid: this.policyNo, validationRes: 'DIRECT_MATCH', data: data.arr };
      console.log("data::::::::::::::", this.submitArray);
      // localStorage.setItem('nomineeDetails', JSON.stringify(this.submitArray));
      var localStorageGetItem = localStorage.getItem('nomineeDetails');
      var result;
      let panvalidationValue
      //  if(this.appCode == "CI"){
      this.isPnaValidated = this.userFormGroups.controls[indNo].get('isPanValidated')?.value
      //  }
      if ((this.isBankDetailsEdited == undefined || this.isBankDetailsEdited == false) && (this.isPnaValidated == undefined || this.isPnaValidated == false) && (this.form60Check == undefined || this.form60Check == false) && (this.userFormGroups.controls[indNo].value.impsStatus != "NO_MATCH")) {
        this.matDialogService.openCommonDialog('Nominee Details Saved Successfully')
      }
      // else if(this.isPnaValidatedInput == true && this.appCode == "CI"){
      //   this.matDialogService.openAlertDialog('Please validate the pan details')
      // }
      else if (this.isPnaValidated == true && this.appCode === 'CI') {
        this.matDialogService.openAlertDialog('Please validate the pan details')
      } else if (this.form60Check == true && this.appCode === 'CI') {
        this.matDialogService.openAlertDialog('Please validate the pan details')
      } else if (this.isBankDetailsEdited == true && this.appCode === 'CI') {
        this.matDialogService.openAlertDialog('Please validate the bank details')
      }

      if (localStorageGetItem) {
        result = JSON.parse(localStorageGetItem);
      } else {
        result = {};
        // this.matDialogService.openAlertDialog('Please complete all the fields')


      }
      result[this.policyNo] = this.submitArray;
      localStorage.setItem('nomineeDetails', JSON.stringify(result));

    } else if (this.isPnaValidated == true && this.appCode === 'CI') {
      this.matDialogService.openAlertDialog('Please validate the pan details')
    }
    else {
      this.matDialogService.openAlertDialog('Please complete all the fields')
    }

    if (this.appCode != 'CI') {
      if (this.isBankDetailsEdited == true) {
        this.matDialogService.openAlertDialog('Please validate the bank details')
      } else if (this.isPnaValidated == true) {
        this.matDialogService.openAlertDialog('Please validate the pan details')
      }
      // else if (this.isPnaValidatedInput == true) {
      //   this.matDialogService.openAlertDialog('Please validate the pan details')
      // }
      else if (this.form60Check == true) {
        this.matDialogService.openAlertDialog('Please validate the pan details')
      } else if (this.userFormGroups.controls[indNo].value.impsStatus == "NO_MATCH") {
        this.matDialogService.openAlertDialog('Please Check IPMS Status')
      }
      //  else if( panvalidationValue == true){
      //   this.matDialogService.openAlertDialog('Please validate the pan details')
      // }

      else {
        this.submitted = true;
        this.arr = this.formGroup.get('arr') as FormArray;
        // console.log("userFormGroup", this.userFormGroups.controls[indNo].value)
        this.submitArray = { policyid: this.policyNo, validationRes: 'DIRECT_MATCH', data: data.arr, };
        this.nomineeFormData = this.userFormGroups.controls[indNo].value;
        console.log(this.nomineeData)
        console.log("this.isClientId", this.isClientId)
        let nomineeDetailIdNew = this.userFormGroups.controls[indNo].value.nomineeDetailId
        if (this.userFormGroups.controls[indNo].value.nomineeDetailId == ' ') {
          let nomineeDetailIdObject = JSON.parse(localStorage.getItem('nomineeDetailsId') || '{}')
          if (nomineeDetailIdObject[indNo]) {
            nomineeDetailIdNew = nomineeDetailIdObject[indNo]
          }
        }
        if (this.isClientId) {
          this.saveClientId = null;
        } else {
          this.saveClientId = this.commonService.clientid

        }
        var payload = {
          "aprvdPayoutYn": this.nomineeFormData.aprvdPayoutYn,
          "ocmMatchYn": this.nomineeFormData.ocmMatchYn,
          "aprvdLaUpdt": this.nomineeFormData.aprvdLaUpdt,
          "intimationSource": this.nomineeFormData.intimationSource,
          "claimsDetailId": this.commonService.claimsDetailId,
          "clientId": this.nomineeFormData.clientId,
          "roleCode": this.nomineeFormData.roleCode,
          "nomineeDetailId": nomineeDetailIdNew,
          "prefix": this.nomineeFormData.prefix,
          "firstName": this.nomineeFormData.firstName,
          "middleName": this.nomineeFormData.middleName,
          "lastName": this.nomineeFormData.lastName,
          "dob": this.nomineeFormData.dob,
          "gender": this.nomineeFormData.gender,
          "address1": this.nomineeFormData.address1,
          "address2": this.nomineeFormData.address2,
          "city": this.nomineeFormData.city,
          "pin": this.nomineeFormData.pincode,
          "district": this.nomineeFormData.district,
          "state": this.nomineeFormData.state,
          "fax": this.nomineeFormData.fax,
          "mobile": this.nomineeFormData.mobileNo,
          "landlineno": this.nomineeFormData.landlineno,
          "emailid": this.nomineeFormData.emailid,
          "nominationPercentage": this.nomineeFormData.nimineePercentage,
          "clientLaYn": this.nomineeFormData.clientLaYn,
          "country": this.nomineeFormData.country,
          "nriYn": this.userFormGroups.controls[indNo].getRawValue().nriFlag,
          "nationality": this.nomineeFormData.Nationality,
          // "pan": this.nomineeFormData.pan == null ?  '' : this.nomineeFormData.pan.toUpperCase(),
          "pan": this.nomineeFormData.pan ? this.nomineeFormData.pan.toUpperCase() : '',
          "form60Yn": this.nomineeFormData.form60Yn,
          "sameAsProposer": this.nomineeFormData.sameAsProposer,
          "payoutOption": this.nomineeFormData.payoutOption,
          "legalHeirCat": this.nomineeFormData.legalCategory,
          "relationWithLa": this.nomineeFormData.relationWithLife,
          "intimationRemarks": this.nomineeFormData.intimationRemarks,
          "registrationRemarks": this.nomineeFormData.registrationRemarks,
          "assessorRemarks": this.nomineeFormData.assessorRemarks,
          "nomineeBankDetails": {
            "beneficiaryName": this.nomineeFormData.accountName,
            "accountNo": this.nomineeFormData.accountNumber,
            "ifscCode": this.nomineeFormData.ifscCode,
            "bankName": this.nomineeFormData.bankName,
            "impsStatus": this.nomineeFormData.impsStatus,
            "branchName": this.nomineeFormData.branchName,
            "micrCode": this.nomineeFormData.micrCode,
            // "payOut": this.nomineeFormData.payOut,
          }

        }

        console.log(payload)
        this.formGroup.markAllAsTouched();
        // if (formStatus == "VALID") {
        // console.log("Success")
        this.RoleDetailsService.saveNominee(payload).subscribe((res: any) => {
          this.RoleDetailsService.setnomineeData(res);
          let idObject = JSON.parse(localStorage.getItem('nomineeDetailsId') || '{}')
          idObject[indNo] = res.id
          localStorage.setItem('nomineeDetailsId', JSON.stringify(idObject));

        })
      }

      // }
      // else{
      //   console.log("Error")
      // }
      // });

    }

  }

  submitNomineeDetails(data: any) {

    // if (this.appCode != 'CI') { // TO CHANGE
    //   this.router.navigate(['/claims-registration']);
    // } else {    
    this.submitArray = { policyid: this.policyNo, validationRes: this.validationResponse.status, data: data.arr, };
    console.log("data::::::::::::::", this.submitArray);
    // localStorage.setItem('nomineeDetails', JSON.stringify(this.submitArray));
    var localStorageGetItem = localStorage.getItem('nomineeDetails');
    var result;
    if (localStorageGetItem) {
      result = JSON.parse(localStorageGetItem);
    } else {
      result = {};
    }
    result[this.policyNo] = this.submitArray;
    localStorage.setItem('nomineeDetails', JSON.stringify(result));
    if (this.appCode != 'CI') {
      this.router.navigate(['/claims-registration']);
    } else {
      this.router.navigate(['/claims-intimation/claim-profile']);
    }
    // }

  }

  // Bank Validated For Nominee Section 
  bankValidation(data: any, formValue: any, index: any) {
    console.log("validate data:::", data);
    console.log("formvalue is:::", formValue);
    console.log("index", index)
    let payload = {
      "name": data.accountName,
      "phone": data.mobileNo,
      "bankAccount": data.accountNumber,
      "ifsc": data.ifscCode,
      "claimsDetailId": this.policyNo,
      "claimNo": "565",
      "appCode": this.appCode
    }
    this.commonService.validateBankDetail(payload).subscribe((response: any) => {
      console.log("response is::::::", response.status)
      if (response.status == 'DIRECT_MATCH' || response.status == 'PARTIAL_MATCH') {
        this.imps = true;
        this.isBankDetailsEdited = false;
      } else {
        this.imps = false
      }
      if (this.userFormGroups.controls[index].value.impsStatus == 'DIRECT_MATCH' || this.userFormGroups.controls[index].value.impsStatus == 'PARTIAL_MATCH') {
        this.isBankDetailsEdited = false;
      }
      console.log("response is::::::", response)
      this.validationResponse = response;
      this.allCommonService.setBankValidation(response)
      this.impsStatusPrint(index);
      if (this.validationResponse) {
        var array = formValue;
        var filterdBenificaryData = array.arr.filter(function (el) {
          return (el.clientRole != "Apointee" || el.clientRole === null || el.clientRole != "Appointee");
        }
        );
        console.log("indexOfObjectdjh", filterdBenificaryData);
        var boolVar = filterdBenificaryData.some(value => { return value.accountNumber != "" && value.ifscCode != "" });
        if (boolVar == true) {
          this.saveEnable = true
        } else {
          this.saveEnable = false
        }
        this.matDialogService.openBankDetailsPopup(this.validationResponse.status);


      } else {
        this.matDialogService.openBankDetailsPopup(this.validationResponse.status);

      }
      localStorage.setItem('validationResponse', this.validationResponse.status);
    });

  }

  cancelCI() {
    this.router.navigate(['/claims-intimation/claim-profile']);
  }
  cancelCR() {
    this.router.navigate(['/claims-registration']);

  }
  getPrefixlist() {
    this.lookupService.fetchBySetName("TITLE").subscribe((res: any) => {
      console.log('prefix', res)
      this.prefix = res.content;
    })
  }

  getnationalityxlist() {
    this.lookupService.fetchBySetName("NATIONALITY").subscribe((res: any) => {
      // console.log('prefix',res)
      this.nationalist = res.content;
    })
  }

  getlegallist() {
    this.lookupService.fetchBySetName("LEGAL_HEIR_CAT").subscribe((res: any) => {
      // console.log('prefix',res)
      this.legalhairlist = res.content;
    })
  }



  getpayoutoptionelist() {
    this.lookupService.fetchBySetName("PAYOUT_OPTION").subscribe((res: any) => {
      // console.log('prefix',res)
      this.payoutoptionelist = res.content;
    })
  }

  getstatelist() {
    this.lookupService.fetchBySetName("STATE").subscribe((res: any) => {
      // console.log('prefix',res)
      this.statelist = res.content;
    })
  }

  getgenderlist() {
    this.lookupService.fetchBySetName("GENDER").subscribe((res: any) => {
      // console.log('prefix',res)
      this.genderlist = res.content;
    })
  }

  // Pan Number Validation For Nominee Section 
  callPan(indexNo) {
    var panNo = this.userFormGroups.controls[indexNo].get("pan")?.value.toUpperCase();
    this.thirdPartyCalls.validatePanDetails(this.clientId, panNo, '', '').subscribe((panDetails: PanDetails) => {
      console.log(panDetails);
      this.commonService.setPanResponse(panDetails)
      this.userFormGroups.controls[indexNo].patchValue(
        {
          panstatus: panDetails.panStatus
        }
      );
      this.matDialogService.openCommonSucessPopup(panDetails);
      if (panDetails.panStatus == 'E' || panDetails.panStatus == 'N') {
        // this.isPnaValidatedInput = false;
        this.isPnaValidated = false;
        this.userFormGroups.controls[indexNo].patchValue({
          'isPanValidated': this.isPnaValidated
        }
        )
        this.isPnaValidated = false;
        this.form60Check = false;
      }
    });

  }


  impsStatusPrint(index: any) {
    this.userFormGroups.controls[index].patchValue(
      {
        impsStatus: this.validationResponse.status

      }
    );
  }
  agePrint(index: any) {
    this.userFormGroups.controls[index].patchValue(
      {
        dateOfEvent: this.age

      }
    );
  }


  // to check the feild is edited or not
  sendTheNewValue(event) {
    // console.log(event.target.value) ;
    if (event.target.value) {
      this.isBankDetailsEdited = true;
    }

  }

  selectionChange(event) {
    if (event.value) {
      this.isBankDetailsEdited = true;
    }
  }

  sendThepanValue(event, i) {
    console.log("1", event.target.value != '')
    console.log("2", event.target.value != null)
    console.log("3", event.target.value)
    if (event.target.value != '' && event.target.value != null) {
      this.isPnaValidated = true
      console.log(this.isPnaValidated)
      this.userFormGroups.controls[i].patchValue({
        'isPanValidated': this.isPnaValidated
      })
    }
    else {
      this.isPnaValidated = false
      console.log(this.isPnaValidated)
      this.userFormGroups.controls[i].patchValue({
        'isPanValidated': this.isPnaValidated
      })
      this.userFormGroups.controls[i].patchValue({
        'pan': ' '
      })

    }
  }
  onchangePan(event, i) {
    console.log("4", event.target.value != '')
    console.log("5", event.target.value != null)
    if (event.target.value != '' && event.target.value != null) {
      this.isPnaValidated = true
      console.log(this.isPnaValidated)
      this.userFormGroups.controls[i].get('pan')?.setValidators([Validators.required, Validators.pattern('^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$')]);
      this.userFormGroups.controls[i].patchValue({
        'isPanValidated': this.isPnaValidated
      })

    }
    else {
      this.isPnaValidated = false
      console.log(this.isPnaValidated)
      this.userFormGroups.controls[i].get('pan')?.clearValidators();
      this.userFormGroups.controls[i].patchValue({
        'isPanValidated': this.isPnaValidated
      })
      this.userFormGroups.controls[i].patchValue({
        'pan': ' '
      })
    }
    this.userFormGroups.controls[i].get('pan')?.updateValueAndValidity();
  }


  onCancelButton() {
    this.allCommonService.onCancelButton();
  }

}