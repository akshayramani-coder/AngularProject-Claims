import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { AllCommonService } from '../services/common-service/all-common.service';
import { SnackbarService } from '../../core/snackbar.service';
import { RoleDetailsService } from '../services/common-service/role-details.service';
@Component({
  selector: 'app-claim-profile-details',
  templateUrl: './claim-profile-details.component.html',
  styleUrls: ['./claim-profile-details.component.scss']
})
export class ClaimProfileDetailsComponent implements OnInit {
  userprofile: any;
  riderProfile: any;
  claimData: any;
  impsCheck: any;
  isIMPSenable: any;
  claimDetails: any;
  policyDetails: any;
  nomineeData: any;
  claimPolicyId: any;
  fetchNomineeData: any;
  isSubmitEnable: any;
  CheckList: any;
  policyNumber: any;
  newArr: any;
  selectedDocData: any;
  docList: any = [];
  docID: any = [];
  uploadDocId: any;
  checkData: any;
  earlyNonEarly: any;
  newArrDoc:any;
  constructor(private router: Router, private policyService: PolicyService,
    private intimationService: IntimationService,
    private matDialogService: MatDialogService,
    private allCommonService: AllCommonService,
    private snackBar: SnackbarService,
    private roleService: RoleDetailsService) {

  }
  impsValidate: any;
  docValidate:any;
  ngOnInit(): void {
    this.claimData = this.policyService.getClaimData()
    console.log("this.claimData", this.claimData);
    this.isIMPSenable = false;
    this.userprofile = this.claimData;
    this.impsValidate = this.allCommonService.getImpsStatus();
    this.docValidate = this.allCommonService.getDocStatusValidate();
    this.nomineeData = JSON.parse(localStorage.getItem('nomineeDetails') || '{}');
    this.selectedDocData = JSON.parse(localStorage.getItem('selectedDocData') || '{}');
    this.uploadDocId = JSON.parse(localStorage.getItem('uploadDoc') || '{}')
    console.log("uploadDocId", this.uploadDocId);
    console.log("this.nomineeData::", this.nomineeData)
    console.log("this.selectedDocData", this.selectedDocData)
    this.policyNumber = this.allCommonService.getProfileData()
    if (this.impsValidate != undefined) {
      for (var policyid in this.nomineeData) {
        var array = this.nomineeData[policyid].data;
        //  var nomineeList =   array.filter(x => { return x.clientRole === 'Beneficiary' });
        //   if (nomineeList.length != 0) {
        var filteredPolicyNo = this.userprofile.filter(x => { return x.policyNumber === this.policyNumber });
        console.log("filteredPolicyNo", filteredPolicyNo);
        const newArr2 = filteredPolicyNo.map(v => Object.assign(v, { impsStatus: this.impsValidate }))
        this.newArr = newArr2
        this.isSubmitEnable = true;
        console.log('this.userprofile???', this.newArr)
        // }
      }      
      console.log("array is", array);

      // if ((array.every(item => item.impsStatus === 'DIRECT_MATCH' || item.impsStatus == 'PARTIAL_MATCH'))) {
      //   this.isSubmitEnable = true;
      //   this.isIMPSenable = true;
      // } else {
      //   this.isSubmitEnable = false;
      //   this.isIMPSenable = false;
      //   let content = 'Please Validate the Nomniee details'
      //   let action = 'close'
      //   this.snackBar.success(content, action)
      // }
    }
    if (this.docValidate != undefined) {
      for (var policyid in this.selectedDocData) {
        var array = this.selectedDocData[policyid];
        //  var nomineeList =   array.filter(x => { return x.clientRole === 'Beneficiary' });
        //   if (nomineeList.length != 0) {
        var filteredPolicyNoDoc = this.userprofile.filter(x => { return x.policyNumber === this.policyNumber });
        console.log("filteredPolicyNo", filteredPolicyNoDoc);
        const newArrDoc2 = filteredPolicyNoDoc.map(v => Object.assign(v, { docStatus : this.docValidate }))
        this.newArrDoc = newArrDoc2
        this.isSubmitEnable = true;
        console.log('this.userprofile???', this.newArrDoc)
      }      
      console.log("array is", array);
    }
    // this.impsCheck = localStorage.getItem('validationResponse');
    // if (this.impsCheck == 'DIRECT_MATCH' || this.impsCheck == 'PARTIAL_MATCH') {
    //   this.isIMPSenable = true;
    //   localStorage.removeItem('validationResponse')
    // } else {
    //   this.isIMPSenable = false;
    // }
    // this.allCommonService.intimationDocBreSubjct.subscribe(data => {
    //   this.earlyNonEarly = data.claimDuration;
    //   console.log("earlyNonEarly",this.earlyNonEarly)
    // });
  }
  selectclientId() {

  }
  backToClaimProfile() {
    this.router.navigate(['/claims-intimation/claim-details']);

  }


  onPolicyClick(data) {
    console.log("datat", data);
    this.allCommonService.setProfileData(data.policyNumber);
    this.allCommonService.setPolicydata(data);
    this.allCommonService.setTrackClaim(false);
    this.getDocDettails(data);
    this.router.navigate(['/claims-intimation/nominee-details']);
    // localStorage.removeItem('allTabCIData');
  }
  getDocDettails(data) {
    var policyId = localStorage.getItem('policyId');
    this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');

    var reqParam = {
      "policyNumber": data.policyNumber,
      "policyStatus": "123",
      "claimType": this.claimDetails.claimType,
      "causeType": this.claimDetails.eventCause,
      "dateOfEvent": this.claimDetails.eventDate,
      "claimsDetailId": null
    }
    this.roleService.getDocData(reqParam).subscribe((res: any) => {
      console.log("res::::", res)
      this.allCommonService.breDocCall(res);
      localStorage.setItem('callDuration', res.claimDuration)


      // this.allCommonService.setDocDetailsData(res)
    });
  }

  processPolicies() {

    var policyList: any = [];

    for (let policy of this.policyDetails) {
      var nomineeDetails = this.processnominee(policy.policyNumber);
      var nomineeList = nomineeDetails.nomineeList;
      var policyValidated = nomineeDetails.policyValidated;

      var checkDetails = this.checkList(policy.policyNumber)
      var checkList = checkDetails.checkList;
      var policyValidatedCheck = checkDetails.policyValidatedCheck;
    
      var docListData = this.processDocDetails(policy.policyNumber);
      var reqList = docListData.reqList;
      var policyValidatedReqList= docListData.policyValidatedReqList;
      var docIdList = this.processDocId(policy.policyNumber);
      var docList = docIdList.docList;
      var policyValidatedDocList = docIdList.policyValidatedDocList;
      console.log("docList", docList);
      var allPolicyValidated  =  policyValidated && policyValidatedCheck && policyValidatedReqList && policyValidatedDocList
      this.earlyNonEarly = localStorage.getItem('callDuration')
      var newPolicy = {
        "policyId": policy.policyNumber,
        "xtrnlCallId": null,
        "validated": allPolicyValidated,
        "claimDuration": this.earlyNonEarly,
        "nomineeDetails": nomineeList,
        "checkList": checkList,
        "reqList": reqList,
        "docList": docList,
        "policyDetail": {
          "policyNumber": policy.policyNumber,
          "clientName": policy.clientName,
          "clientId": policy.clientId,
          "pan": policy.pan,
          "proposerCustomerId": policy.proposerCustomerId,
          "productCode": policy.productCode,
          "policyStatusOnIntimation": policy.policyStatusOnIntimation,
          "policyStatusOnEvent": policy.policyStatusOnEvent,
          "rcdDate": policy.rcdDate,
          "sumAssured": policy.sumAssured,
          "paidToDate": policy.paidToDate,
          "riderDetails": [
            {
              "riderName": policy.riderName,
              "riderCode": policy.riderCode,
              "riderStatusOnIntimation": policy.riderStatusOnIntimation,
              "riderStatusOnEvent": policy.riderStatusOnEvent,
              "claimAllowed": false,
              "claimAllowedReason": null
            }
          ],
          "claimAllowed": policy.claimAllowed,
          "claimAllowedReason": policy.claimAllowedReason
        },



      };

      policyList.push(newPolicy);
    }

    return policyList;
  }

  checkList(policyNumber) {
    var checkList: any = [];
    var policyValidatedCheck = true;
    if (this.checkData[policyNumber] == undefined) {
      return { "checkList": [] , "policyValidatedCheck": false};
    }

    for (let list of this.checkData[policyNumber]) {
      checkList.push(list.transQuestionId);
    }
    return { 'checkList': checkList , "policyValidatedCheck": policyValidatedCheck };


  }
  processDocDetails(policyNumber) {
    var reqList : any = [];
    var policyValidatedReqList = true;
    if (this.selectedDocData[policyNumber] == undefined) {
      return  { 'reqList': [], "policyValidated": false}
    }
    for (let docData of this.selectedDocData[policyNumber]) {
      var docSelection = {
        "rqmtCode": docData.rqmtCode,
        "status": docData.lookupCd,
        "reqType": docData.rqmtType,
        "remarks": docData.remark,
        "mandatoryYn": docData.mandatory,
        "upldDt": docData.upldDt,
        "receivedDate": docData.receivedDate
      }
      reqList.push(docSelection);

    }
    return {'reqList': reqList  , "policyValidatedReqList": policyValidatedReqList}

  }

  processDocId(policyNumber) {
   var docList: any  = [];
    var policyValidatedDocList = true;
    if (this.uploadDocId[policyNumber] == undefined) {
      return { "docList": [], "policyValidated": false}
    }    
    for (let docDataID of this.uploadDocId[policyNumber]) {    
      docList.push(docDataID.documentId);
    }
    return  {"docList" : docList , "policyValidatedDocList": policyValidatedDocList }

  }

  processnominee(policyid) {

    var nomineeList: any = [];
    var policyValidated = true;
    var impsStatusList: any = [];
    if (this.nomineeData[policyid] == undefined) {
      return { "nomineeList": [], "policyValidated": false };
    }

    for (let nominee of this.nomineeData[policyid]?.data) {
      var newNominee = {
        // "nomineeDetails": {
        "nomineeDetailId": null,
        "claimsDetailId": null,
        "clientId": nominee.clientId,
        "prefix": nominee.prefix,
        "firstName": nominee.firstName,
        "middleName": null,
        "lastName": nominee.lastName,
        "dob": nominee.dob,
        "gender": nominee.gender,
        "houseNo": nominee.flatNo,
        "pan": nominee.pan,
        "form60Yn": nominee.form60Yn,
        "area": null,
        "landmark": nominee.landMark,
        "city": nominee.city,
        "address1": nominee.address1,
        "address2": nominee.address2,
        "country": nominee.country,
        "nriYn": nominee.nriFlag,
        "nationality": nominee.Nationality,
        "legalHeirCat": nominee.legalCategory,
        "sameAsProposer": nominee.sameAsProposer,
        "payoutOption": nominee.payoutOption,
        "pin": nominee.pincode,
        "district": nominee.district,
        "state": nominee.state,
        "fax": null,
        "mobile": nominee.mobileNo,
        "landlineno": nominee.landlineno,
        "emailid": nominee.emailid,
        "relationWithLa": nominee.relationWithLife,
        "nominationPercentage": nominee.nimineePercentage,
        "roleCode": nominee.roleCode,
        "intimationRemarks": nominee.intimationRemarks,
        "registrationRemarks": null,
        "assessorRemarks": null,
        "clientLaYn": null,
        "activeYn": null,
        "nomineeBankDetails": {
          "beneficiaryName": nominee.accountName,
          "accountNo": nominee.accountNumber,
          "ifscCode": nominee.ifscCode,
          "bankName": nominee.bankName,
          "branchName": nominee.branchName,
          "micrCode": nominee.micrCode,
          "impsStatus": nominee.impsStatus,

        },
        "panValidated": null
        // },

        // "policyid":policyid
      }
      impsStatusList.push(nominee.impsStatus);

      if (impsStatusList.length == 0) {
        policyValidated = false;
      }
      impsStatusList.forEach(element => {
        if (!(element == 'DIRECT_MATCH' || element == 'PARTIAL_MATCH')) {
          policyValidated = false;
        }
      });
      nomineeList.push(newNominee);

    }
    return { "nomineeList": nomineeList, "policyValidated": policyValidated };
  }

  submitDetails() {
    var intimationTime = new Date()
    this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');
    this.policyDetails = JSON.parse(localStorage.getItem('eventDetails') || '[]');
    this.nomineeData = JSON.parse(localStorage.getItem('nomineeDetails') || '{}');
    // this.uploadDocId = JSON.parse(localStorage.getItem('uploadDoc') || '{}')
    console.log('this.nomineeData', this.nomineeData)
    // var docListData = this.processDocDetails();
    this.checkData = JSON.parse(localStorage.getItem('CheckList') || '{}');
    console.log('this.nomineeData', this.nomineeData)
    // var checkList = this.checkList();
    var policyList = this.processPolicies();
    // var nomineeList = this.processnominee();

    console.log(this.claimDetails)
    var payload = {
      "claimIntimationId": null,
      "clientId": this.claimDetails.clientId,
      "claimIntimationDetails": {
        "claimType": this.claimDetails.claimType,
        "deathClaimType": this.claimDetails.deathClaim,
        "intimationDate": this.claimDetails.ClaimDate,
        "intimationTime": this.claimDetails.intimationTime,
        "claimSource": this.claimDetails.claimSource,
        "intimationSource": "INT_SRC_BRNCH"
      },
      "eventDetails": {
        "eventDetailId": null,
        "claimsDetailId": null,
        "eventType": this.claimDetails.EventType,
        "deathCause": this.claimDetails.eventCause,
        "deathPlace": this.claimDetails.PlaceDeath,
        "accidentDt": this.claimDetails.DateAccident,
        "eventDt": this.claimDetails.eventDate,
        "eventOrganImpacted": this.claimDetails.Organ,
        "reasonForLateInt": this.claimDetails.reason_for_late_Intimation,
        "hospitalName": this.claimDetails.hospitalName,
        "secondaryEventCause": this.claimDetails.secondary_event_Cause,
        "initiatedBy": this.claimDetails.IntimatedBy,
        "relationWithLifeAssured": this.claimDetails.Relation,
        "payoutOption": this.claimDetails.payoutOption,
        // "remarks": this.claimDetails.remark,
        "relationWithLaRemarks": this.claimDetails.remark,
        "hospitalLoc": this.claimDetails.hospitalLocation,
        "doctorName": this.claimDetails.doctorName,
        "treatmntDtl": this.claimDetails.treatmentDetails,
        "hospitalAddr": this.claimDetails.hospitalAddress,
        "activeYn": null
      },
      "policyDetailsReq": policyList,



    }
    this.intimationService.allDetails(payload).subscribe((data: any) => {
      if (data) {
        this.allCommonService.setImpsRes(data);
        this.router.navigate(['/claims-intimation/claim-acknowledgment']);
        localStorage.setItem('finalPolicySubmitres', JSON.stringify(data));
        // this.matDialogService.openCommonSucessPopup(data.message);
        localStorage.removeItem('nomineeDetails');
        localStorage.removeItem('CheckList');
        localStorage.removeItem('selectedDocData');
        localStorage.removeItem('eventDetails');
        localStorage.removeItem('validationResponse');
        localStorage.removeItem('allTabCIData');
        localStorage.removeItem('policyId');
        localStorage.removeItem('docData');
        localStorage.removeItem('docChange');
        localStorage.removeItem('uploadDoc');
        localStorage.removeItem('regSave');
        localStorage.removeItem('docStatus');
        localStorage.removeItem('docRecived');
        localStorage.removeItem('callDuration');
        localStorage.removeItem('docUplodeDate');
        localStorage.removeItem('checkDOcStatus');
        localStorage.removeItem('cancelStatus');


      }
    })

  }

}
