import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { environment } from 'src/environments/environment';
import { MatDialogService } from '../mat-service/mat-dialog.service';
import { Router } from '@angular/router';
import { isNgTemplate } from '@angular/compiler';
import { CheckListComponent } from '../../check-list/check-list.component';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AllCommonService {
  element_id; //here is the shared variable
  selectedMenu = new BehaviorSubject<any>('');
  regSave: any;
  uploadDateDoc:any;
  recivedStatusValidation:any;
  intimationSouce: any;
  trackClaim: boolean = false;
  claimsDetailId: any;
  taskData: any;
  allTabData: any;
  impsResponse: any;
  claimProfileData: any;
  ttskInstncId: any;
  tskBpmId: any;
  tskCode: any;
  panDetails: any;
  bankDetails: any;
  clientid: any;
  allRowData: any;
  nomineeData: any;
  nomineeList: any;
  policyid: any;
  appCode: any;
  raisedRequirements: any;
  isNomneeValidated: any;
  svaeValidation: any;
  checkApointee: any;
  editable: any;
  remark: any;
  impsStatus: any;
  DocData: any;
  documentRaisedData: any;
  docDetailsData: any;
  docReqmtCode: any;
  yourDate: any;
  nomineeListData: any;
  claimStatus: any;
  rcddoe: any;
  rcddoi: any;
  revivaldoe: any;
  claimStatusDesc: any;
  productCode: any;
  policyStatusAtDoe: any;
  claimNo: any;
  taskCode: any;
  claimDuation: any;
  claimDurationAS: any;
  documentAddedManually: any;
  checkDOcStatus: any;
  statusDocChange: any;
  cancelStatus: any;
  claimDuationPO: any;
  claimDuationAP: any;
  routingPath: any;
  claimStatusDisp: any;
  claimDuationIP: any;
  claimDuationCI: any;
  notification: any;
  impsStatusCheck: any;
  decisionSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  claimSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  docStatusSubject: BehaviorSubject<any> = new BehaviorSubject(null)
  policyTypeUlipYN: any
  requirementClsdDt: any;
  totalValue: any;

  constructor(private http: HttpClient, private matDialogService: MatDialogService, private router: Router,
    public dialog: MatDialog, private datePipe: DatePipe) {
    this.yourDate = this.datePipe.transform(new Date(), "dd-MM-yyyy")

    this.documentRaisedData = [
      {
        "requirmentId": 435,
        "claimsDetailId": 888,
        "masterRequirementId": 1,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "DEATH_CERTIFICATE",
        "rqmtName": "Death Certificate",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",

      },
      {
        "requirmentId": 436,
        "claimsDetailId": 888,
        "masterRequirementId": 2,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "CLAIM_FORM",
        "rqmtName": "Claim form",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",

      },
      {
        "requirmentId": 437,
        "claimsDetailId": 888,
        "masterRequirementId": 1,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "DEATH_CERTIFICATE",
        "rqmtName": "Death Certificate",
        "lookupCd": "DOC_STATUS_OPEN",
        "status": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": ""

      },
      {
        "requirmentId": 438,
        "claimsDetailId": 888,
        "masterRequirementId": 3,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "BANK_ACC_PROOF",
        "rqmtName": "Bank a/c proof",
        "lookupCd": "DOC_STATUS_OPEN",
        "status": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": ""

      },
      {
        "requirmentId": 439,
        "claimsDetailId": 888,
        "masterRequirementId": 4,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "ID_PROOF",
        "rqmtName": "Identity Proof",
        "lookupCd": "DOC_STATUS_OPEN",
        "status": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": ""

      },
      {
        "requirmentId": 440,
        "claimsDetailId": 888,
        "masterRequirementId": 5,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "RESIDENCE_PRF",
        "rqmtName": "Residence Proof",
        "lookupCd": "DOC_STATUS_OPEN",
        "status": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": ""

      },
      {
        "requirmentId": 441,
        "claimsDetailId": 888,
        "masterRequirementId": 6,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "ORGINAL_POLICY_BOND",
        "rqmtName": "Original Policy Bond",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",


      },
      {
        "requirmentId": 442,
        "claimsDetailId": 888,
        "masterRequirementId": 7,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "NOMINEE_PAN_FORM60",
        "rqmtName": "Nominee PAN card / Form 60",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",


      },
      {
        "requirmentId": 443,
        "claimsDetailId": 888,
        "masterRequirementId": 8,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "MEDICAL_CAUSE_OF_DEATH",
        "rqmtName": "Medical Cause of death",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",


      },
      {
        "requirmentId": 444,
        "claimsDetailId": 888,
        "masterRequirementId": 9,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "POST_MORTM_REPORT",
        "rqmtName": "Copy of Post Mortem Report",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",


      },
      {
        "requirmentId": 445,
        "claimsDetailId": 888,
        "masterRequirementId": 10,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "FIRST_INFO_REPORT",
        "rqmtName": "Copy of First Information Report",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",


      },
      {
        "requirmentId": 446,
        "claimsDetailId": 888,
        "masterRequirementId": 11,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "DOCTR_CERTIFICATE",
        "rqmtName": "Doctor`s Certificate",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",


      },
      {
        "requirmentId": 447,
        "claimsDetailId": 888,
        "masterRequirementId": 12,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "MEDICAL_RECORD_FOR_TREATMENT",
        "rqmtName": "Copy of medical records for the treatment taken",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",
      },
      {
        "requirmentId": 448,
        "claimsDetailId": 888,
        "masterRequirementId": 13,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "OTHERS",
        "rqmtName": "Others",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",
        // "status": 166,

      },
      {
        "requirmentId": 448,
        "claimsDetailId": 888,
        "masterRequirementId": 14,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "FORM_16",
        "rqmtName": "Form 16",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",
      },
      {
        "requirmentId": 449,
        "claimsDetailId": 888,
        "masterRequirementId": 15,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "INVESTIGATION_START",
        "rqmtName": "Investigation Start",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",
      },
      {
        "requirmentId": 450,
        "claimsDetailId": 888,
        "masterRequirementId": 16,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "INVESTIGATION_CLOSURE",
        "rqmtName": "Investigation Closure",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",
      },
      {
        "requirmentId": 451,
        "claimsDetailId": 888,
        "masterRequirementId": 17,
        // "status": 166,
        "closedBy": null,
        "closedDate": null,
        "raisedBy": 4,
        "raisedDate": this.yourDate,
        "activeYn": "Y",
        "createdBy": "LO7447",
        "createdOn": this.yourDate,
        "updatedBy": "LO7447",
        "updatedOn": this.yourDate,
        "rqmtCode": "COPY_MED_DIAGNOSED",
        "rqmtName": "Copy of medical records for the illness diagnosed and treatment taken",
        "lookupCd": "DOC_STATUS_OPEN",
        "nameSet": "DOC_STATUS",
        "rqmtType": "Manual",
        "mandatoryYn": "N",
        "remark": "",
        "status": "DOC_STATUS_OPEN",
      }

    ]
  }
  policyData: any;
  public stringSubject = new Subject<any>();
  public invokeEvent: Subject<any> = new Subject();

  // public stringSubjectClaim = new Subject<any>();
  public claimsDetailIdSubject = new Subject<any>();
  public refreshDocListSubject = new Subject<any>();
  public intimationDocBreSubjct = new Subject<any>();
  public raisedRequirementsSubjct = new Subject<any>();
  public uploadDateSubject = new BehaviorSubject<any>(null);
  // public receiveDateSubject = new Subject<any>();

  // upload date
  uploadDate(value) {
    this.uploadDateSubject.next(value);
  }

  // Receive Date
  // setReceiveDate(value) {
  //   this.receiveDateSubject.next(value)
  //   console.log(':::::::::::::::::::::',value)
  // }
  toggleSideBar() {
    this.invokeEvent.next("Call")
  }

  passValue(data) {
    //passing the data as the next observable
    this.stringSubject.next(data);
  }

  passValueRaised(data) {
    //passing the data as the next observable 
    this.raisedRequirementsSubjct.next(data);
  }

  // Behavioural Subject example for early/nonearly
  public change_val(element_id) {
    console.log('This ' + element_id + " comes from api.change_val");
    this.element_id = element_id;
    let selMen = localStorage.getItem('breCall');
    this.selectedMenu.next(selMen);
  }



  breDocCall(docData) {
    //passing the data as the next observable
    this.intimationDocBreSubjct.next(docData);
  }
  // passCoverageValue(value){
  //   //passing the data as the next observable
  //   this.stringSubjectClaim.next(value);
  // }

  setTrackClaim(trackClaim) {
    this.trackClaim = trackClaim;
  }

  getTrackClaim() {
    return this.trackClaim;
  }

  setTaskCode(tskCode) {
    this.taskCode = tskCode;
  }

  getTaskCode(): string {
    console.log(this.taskCode)
    return this.taskCode;
  }

  setClaimsDetailId(claimsDetailId: any) {
    this.claimsDetailIdSubject.next(claimsDetailId);
    this.claimsDetailId = claimsDetailId;
    console.log(" this.claimsDetailId +" + this.claimsDetailId);
  }

  getClaimsDetailId() {
    console.log(this.claimsDetailId);
    return this.claimsDetailId;
  }

  setclaimStatus(data: any) {
    this.claimStatusDesc = data
  }
  getclaimStatus() {
    return this.claimStatusDesc;
  }

  setclaimNo(data: any) {
    this.claimNo = data
  }

  getclaimNo() {
    return this.claimNo;
  }

  setproductCode(data: any) {
    this.productCode = data;
  }
  setpolicyStatusAtDoe(data: any) {
    this.policyStatusAtDoe = data;

  }
  getpolicyStatusAtDoe() {
    return this.policyStatusAtDoe
  }



  getproductCode() {
    return this.productCode;
  }

  setCRClaimData(data: any) {
    this.taskData = data;
  }
  getCRClaimData() {
    return this.taskData;
  }

  setAllTabData(value: any) {
    this.allTabData = value;
  }
  setRaisedRequirements(value: any) {
    this.raisedRequirements = value;
  }
  getAllTabData() {
    return this.allTabData;
  }

  setImpsRes(data: any) {
    this.impsResponse = data
  }
  getImpsRes() {
    return this.impsResponse;
  }

  //set task Instant Id
  setTtskInstncId(ttskInstncId) {
    this.ttskInstncId = ttskInstncId
  }
  //get task Instant Id
  getTtskInstncId() {
    return this.ttskInstncId;
  }
  //set task BPM Id
  setTskBpmId(tskBpmId) {
    this.tskBpmId = tskBpmId
  }
  //set task BPM Id
  getTskBpmId() {
    return this.tskBpmId;
  }
  setrcddoe(data) {
    this.rcddoe = data
  }
  getrcddoe() {
    console.log('rcd', this.rcddoe)
    return this.rcddoe;
  }

  setrcddoi(data) {
    this.rcddoi = data
  }

  getrcddoi() {
    return this.rcddoi;
  }

  setrevivaldoe(data) {
    this.revivaldoe = data
  }

  getrevivaldoe() {
    return this.revivaldoe;
  }

  setClientId(clientId) {
    this.clientid = clientId;
  }


  getClientId() {
    return this.clientid;
  }

  //set Pan Details
  setPanResponse(panDetails: any) {
    this.panDetails = panDetails
  }
  //get Pan Details
  getPanResponse() {
    return this.panDetails;
  }

  //set bank Details
  setBankValidation(bankDetails: any) {
    this.bankDetails = bankDetails
  }
  //get bank Details
  getBankValidation() {
    return this.bankDetails;
  }
  getEventAndClaimDetails(claimsDetailIds) {
    let getEventAndClaimDetail = environment.url.claimRegistration + '/api/v1/claim-details/' + claimsDetailIds
    return this.http.get(getEventAndClaimDetail);
  }

  setProfileData(profileData) {
    this.claimProfileData = profileData;
  }

  getProfileData() {
    return this.claimProfileData;
  }

  setPolicydata(policyData) {
    this.policyData = policyData
  }
  getPolicydata() {
    return this.policyData
  }

  setElementData(element) {
    this.allRowData = element;
  }

  getElementData() {
    return this.allRowData;
  }

  setRequirementClsdDt(data: any) {
    this.requirementClsdDt = data;
  }
  getRequirementClsdDt() {
    return this.requirementClsdDt;
  }




  validateBankDetail(data) {
    //  return this.http.post('http://192.168.6.99:8309/claims-third-party-calls/api/v1/claims-third-party-calls/bank-verification',data) ;
    return this.http.post(environment.url.claimTirdPartyCall + '/api/v1/claims-third-party-calls/bank-verification', data)

  }


  // Common Services  in intimation,registration and accessment 
  commonSubmit() { // CI, CP, AS 
    this.appCode = localStorage.getItem('appcode');
    this.regSave = localStorage.getItem('regSave');
    this.documentAddedManually = localStorage.getItem('documentAddedManually');
    this.checkDOcStatus = localStorage.getItem('checkDOcStatus');
    this.statusDocChange = localStorage.getItem('docChange');
    this.cancelStatus = localStorage.getItem('cancelStatus');
    console.log("this.documentAddedManually", this.documentAddedManually);
    if (this.appCode == 'CI' || this.appCode == 'CR' || this.appCode == 'AS') {

      this.nomineeData = JSON.parse(localStorage.getItem('nomineeDetails') || '{}');
      if (Object.keys(this.nomineeData).length == 0) {
        this.matDialogService.openNomineeAlertDialog('Please save the nominee details')
        this.isNomneeValidated = false
      } else {
        console.log('this.nomineeData', this.nomineeData)
        for (var policyid in this.nomineeData) {
          this.nomineeList = this.nomineeData[policyid].data
          console.log('this.nomineeData????????', this.nomineeList)
          // let index = this.nomineeList.filter(x => { return x.isBankValidate === true && x.claimType === true   && x.formValidated==true});
          // let apFilter = this.nomineeList.filter(x => { return x.clientRole === 'Apointee'});
          let saveValidation = this.nomineeList.every(item => item.saveValidation === true && item.formValidated == false);
          this.nomineeList.forEach(element => {
            if (element.impsStatus == 'NO_MATCH') {
              this.impsStatusCheck = true
            } else {
              this.impsStatusCheck = false
            }
          })
          // if(apFilter[0].clientRole=='Apointee'){
          // this.checkApointee = this.nomineeList.some(item => item.clientRole != 'Apointee' && item.bankEdited === true);
          // console.log("this.checkApointee",this.checkApointee);
          // if(this.appCode!='CI'){
          //   if( this.checkApointee== true){
          //     this.matDialogService.openNomineeAlertDialog('Please validate your bank details')
          //   }
          // }

          // }
          console.log('saveValidation', saveValidation);
          // console.log('index', index);
          // if (index.length != 0) {
          //   this.matDialogService.openNomineeAlertDialog('Please enter your all nominee details')
          //   this.isNomneeValidated = false
          // } 
          if (this.nomineeList[0].claimType == false && this.nomineeList[0].accountName == "" || this.nomineeList[0].accountNumber == "" || this.nomineeList[0].reAccountNumber == "" || this.nomineeList[0].bankName == "" || this.nomineeList[0].branchName == ""
            || this.nomineeList[0].micrCode == "" || this.nomineeList[0].micrCode == null || this.nomineeList[0].impsStatus == "" || this.nomineeList[0].ifscCode == "") {
            this.matDialogService.openNomineeAlertDialog('Please enter your bank details')
            this.isNomneeValidated = false
          } else if (!saveValidation) {
            this.matDialogService.openNomineeAlertDialog('Please save nominee details with all required feilds')
            this.isNomneeValidated = false
          } else if (!this.checkApointee && this.checkApointee != undefined && saveValidation == false) {
            this.matDialogService.openNomineeAlertDialog('Please save apointee details with all required feilds')
            this.isNomneeValidated = false
          } else if (this.impsStatusCheck == true) {
            this.matDialogService.openNomineeAlertDialog('Please Check Imps Status')
            this.isNomneeValidated = false
          }
          else {
            var documentAdded = localStorage.getItem('documentAddedManually');
            var CIDocUpload = localStorage.getItem('CIDocUpload')
            if ((this.appCode == 'CR' && this.regSave == 'true' && this.checkDOcStatus == 'true' && (CIDocUpload=='false') && documentAdded != 'true' && this.statusDocChange != 'true' && this.cancelStatus != 'true' )) {
              var docStatus = localStorage.getItem('docStatus')
              if (docStatus == "false" || docStatus == undefined || docStatus == null  ) {
                this.isNomneeValidated = true
                const dialogRef = this.dialog.open(CheckListComponent, {
                  width: '93%',
                  height: '600px',

                });
                dialogRef.afterClosed().subscribe((CheckListComponent) => {

                });
              } else {
                this.isNomneeValidated = true
              }
            } else {
              this.isNomneeValidated = true
            }
          }
        }
      }
    }
  }


  docValidationNew() {
    console.log('here')
    console.log(this.appCode);
    console.log(this.docUploadStatus)
    console.log(this.docRemarkStatus)
    console.log(this.appCode == 'CI' && this.docUploadStatus == "false")
    let docStatus = this.docUploadStatus
    let docRemark = this.docRemarkStatus;
    var documentAdded = localStorage.getItem('documentAddedManually');
    if (this.appCode == 'CI') {
      var CIDocUpload = localStorage.getItem('CIDocUpload')
      var docRecived = localStorage.getItem('docRecived');
      if (docStatus == "false" && docRemark == "false" && docRecived!='true' && (documentAdded == null || documentAdded == undefined)) {
        this.isNomneeValidated = true
        console.log("in IF")
        const dialogRef = this.dialog.open(CheckListComponent, {
          width: '93%',
          height: '600px',

        });
        dialogRef.afterClosed().subscribe((CheckListComponent) => {

        });
      } else {
        // this.matDialogService.openNomineeAlertDialog('Document status is open');

        this.isNomneeValidated = true
      }
    }

  }

  checkRemarkValidation() {
    var getDocData = JSON.parse(localStorage.getItem('docData') || '{}');
    console.log("getDocData", getDocData);
    var searchCancelled = getDocData.find(x => { return x.lookupCd == "DOC_STATUS_CANCELLED" && x.remark == null });
    console.log("searchCancelled", searchCancelled);
    if (searchCancelled) {
      this.matDialogService.openNomineeAlertDialog('Please add remark for cancelled status of document');
      localStorage.setItem("cancelStatus", 'true')
    } else if (searchCancelled == undefined) {
      localStorage.setItem("cancelStatus", 'false');
    }

  }

  docUploadCheck(){
    var getDocData = JSON.parse(localStorage.getItem('docData') || '{}');
    console.log("getDocData", getDocData);
    var statusFilterData = getDocData.filter(x => { return x.lookupCd == "DOC_STATUS_RECEIVED" });
    console.log("statusFilterData",statusFilterData)
    this.recivedStatusValidation = statusFilterData.some(x => { return x.lookupCd == "DOC_STATUS_RECEIVED" });
    console.log(">>>>>>>>>>", this.recivedStatusValidation);
    var dateCR = statusFilterData.some(x => { return  x.upldDt != null });
    if(this.appCode=="CR"){
      if (this.recivedStatusValidation == true && dateCR!=true) {
        this.matDialogService.openNomineeAlertDialog('Please upload the document');
        localStorage.setItem('CIDocUpload','true');
      }else{
        localStorage.setItem('CIDocUpload','false');
        this.commonSubmit()
  
      }
    }else{
      if (this.recivedStatusValidation == true && dateCR!=true) {
        this.matDialogService.openNomineeAlertDialog('Please upload the document');
        localStorage.setItem('CIDocUpload','true');
      }
    }
    
  }

  // document validation
  docValidation() {
    console.log("regSave", this.regSave);
    var documentAdded = localStorage.getItem('documentAddedManually');
    var docStatus = localStorage.getItem('docStatus');
    if (docStatus != null) {
      if (documentAdded == 'true') {
        this.matDialogService.openCommonDialog('Please Save the documents');
      } else if (docStatus == 'true') {
        this.matDialogService.openCommonDialog('Document status is open');
      }
    } else if (docStatus == null && this.regSave == null && this.checkDOcStatus != 'true') {
      this.matDialogService.openCommonDialog('Please Save the documents');
    } else if (this.statusDocChange == 'true' || this.cancelStatus == 'true') {
      this.matDialogService.openCommonDialog('Please Save the documents');
    } else if (documentAdded == 'true') {
      this.matDialogService.openCommonDialog('Please Save the documents');
    } else if (this.regSave == null && (this.appCode == 'CR' || this.appCode == 'AS')) {
      this.matDialogService.openCommonDialog('Please Save the documents');
    }

  }
  // Set Is Nominee Validate
  setNomneeValidated(isNomneeValidated) {
    this.isNomneeValidated = isNomneeValidated;
  }

  //get Is Nominee Validate
  getNomineeValidate() {
    return this.isNomneeValidated;
  }
  setEditable(data) {
    this.editable = data;
    console.log(this.editable)
  }
  getEditable() {
    return this.editable;
  }

  setRemarkCR(data) {
    this.remark = data;

  }

  getRemarkCR() {
    return this.remark
  }

  setImpsStatus(data) {
    this.impsStatus = data;

  }

  getImpsStatus() {
    return this.impsStatus
  }
  docValidate:any
  //set BRE Doc validation Check 
  setDocStatusValidate(data){
    this.docValidate = data;
  }
  getDocStatusValidate(){
    return this.docValidate
  }
  setDocData(data) {
    this.DocData = data;

  }

  geDocData() {
    return this.DocData;
  }

  setDocDetailsData(docDetailsData) {
    this.docDetailsData = docDetailsData;

  }

  geDocDetailsData() {
    return this.docDetailsData;
  }

  setDocReqmtCode(docReqmtCode) {
    this.docReqmtCode = docReqmtCode;

  }

  geDocReqmtCode() {
    return this.docReqmtCode;
  }


  setNomineeFeatchData(data) {
    this.nomineeListData = data;
  }
  getNomineeFeatchData() {
    return this.nomineeListData
  }

  setClaimDuration(value) {
    this.claimDuation = value;
  }

  setIntimationBranchSource(data) {
    this.intimationSouce = data
  }
  getIntimationBranchSource() {
    return this.intimationSouce
  }

  getClaimDuration() {
    return this.claimDuation;
  }

  setClaimDurationAS(data) {
    this.claimDurationAS = data;
  }

  getClaimDurationAS() {
    return this.claimDurationAS;
  }

  setClaimDurationPO(data: any) {
    this.claimDuationPO = data;
  }

  getClaimDurationPO() {
    return this.claimDuationPO;
  }

  setClaimDurationAP(data: any) {
    this.claimDuationAP = data;
  }
  getClaimDurationAP() {
    return this.claimDuationAP;
  }

  setClaimDurationCI(data: any) {
    this.claimDuationCI = data;
  }
  getClaimDurationCI() {
    return this.claimDuationCI;
  }

  docUploadStatus: any
  setDocStatus(data) {
    this.docUploadStatus = data;
  }

  getDocStatus() {
    return this.docUploadStatus;
  }

  docRemarkStatus: any
  setDocRemark(data) {
    this.docRemarkStatus = data;
  }

  getDocRemark() {
    return this.docRemarkStatus;
  }

  //////CR API Status CHeck //////
  isOpenStatusCheck: any
  setApiStatusCheck(data) {
    this.isOpenStatusCheck = data;
  }
  getApiStatusCheck() {
    return this.isOpenStatusCheck;
  }

  setPolicyTypeUlipYN(data: any) {
    this.policyTypeUlipYN = data
  }

  getPolicyTypeUlipYN() {
    return this.policyTypeUlipYN
  }


  onCancelButton() {
    this.appCode = localStorage.getItem('appcode');
    if (this.appCode == 'CI') {
      this.routingPath = ['/claims-intimation/claim-profile'];
    } else if (this.appCode == 'CR') {
      this.routingPath = ['/claims-registration'];
    } else if (this.appCode == 'AS') {
      this.routingPath = ['/claims-assessment'];
    } else if (this.appCode == 'AP') {
      this.routingPath = ['/claims-approval'];
    } else if (this.appCode == 'PO') {
      this.routingPath = ['/claims-payout'];
    }
    this.router.navigate(this.routingPath);
  }
  updateAprooveYN(nomineeDetailId, approveYn) {
    let updateAproovalYnURL = environment.url.claimRegistration + `/api/v1/nominee/${nomineeDetailId}/${approveYn}`
    return this.http.get(updateAproovalYnURL)
  }
  getNotification() {
    return this.notification
  }

  setNotification(data: any) {
    this.notification = data
  }

  getLetterFromCommunicationFrameWork(claimDetailId: string, title: string, body?: any) {

    let url = `${environment.url.communication}/api/v1/letter/${title}`
    return this.http.post(url, body)
  }
  changeDecision(decison: any) {
    return this.decisionSubject.next(decison)
  }
  forwordDocStatusDecision(docForm: any) {
    return this.docStatusSubject.next(docForm)
  }
  setClaimDetails(claimDetails: any) {
    return this.claimSubject.next(claimDetails)
  }

  submitLetterInputtoDB(body: any) {
    let url = `${environment.url.communication}/api/v1/correspondence/trans-correspondence`
    return this.http.post(url, body)
  }

  
  setClaimAmount(data: any) {
    this.totalValue = data;
  }
  getClaimAmount(){
    return this.totalValue;
  }

  correspondenceshowLetters(claimDetailId:string){
    let url = `${environment.url.communication}/api/v1/correspondence/get-trans-correspondence-data/${claimDetailId}`
    return this.http.get(url)
  }

  correspondencePreviewLetters(claimDetailId:string,title:string){
    let url = `${environment.url.communication}/api/v1/letter/${title}/${claimDetailId}`
    return this.http.get(url)

  }

}
