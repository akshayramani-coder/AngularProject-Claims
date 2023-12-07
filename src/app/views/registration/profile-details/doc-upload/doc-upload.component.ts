import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DocumentUploadComponent } from '../../document-upload/document-upload.component';
import { Router } from '@angular/router';
import { MatTable, MatTableDataSource } from '@angular/material/table';
// import { DocumentcreateService } from '../../services/document-upload/documentcreate.service';
import { LookupService } from '../../services/lookup/lookup.service';
import { MatDialogService } from '../../services/mat-service/mat-dialog.service';
import { DocumentRaisedService } from '../../services/document upload services/document-raised.service';
import { DocumentCreateRequestComponent } from '../document-create-requeast/document-create-request/document-create-request.component';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { elementAt } from 'rxjs';
import { JsonPipe } from '@angular/common';
import { DatePipe } from '@angular/common';
import { ViewDocumentComponent } from '../view-document/view-document.component';
// import { DocumentCreateRequestComponent } from '../../document-create-request/document-create-request.component';
@Component({
  selector: 'app-doc-upload',
  templateUrl: './doc-upload.component.html',
  styleUrls: ['./doc-upload.component.scss']
})
export class DocUploadComponent implements OnInit {

  status: any;
  form!: FormGroup;
  appCode: any;
  trackClaim: boolean = false;

  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  body: any;
  documentstatus: any;
  // claimDetailsId: any;
  claimsDetailId: any;
  documaentstatuevalue: any;
  // firstFormGroup:any
  element: any
  fg: any;
  selectrequirmentId: any;
  nomineeData: any;
  nomineeList: any;
  policyid: any;
  dataDoc: any;
  formArrayList: any;
  docValue: any;
  policyNumber: any;
  DocRespons: any;
  isSaveClicked: any;
  regCRresponse: any;
  validator: any;
  taskCode: any;
  isReadonly: any;
  upldDt: any;
  isReqmtCode: any;
  uploadDate: any;
  // lookupCd='Open'
  // dataSource1 = ELEMENT_DATA1;
  documentData: any;
  policyNum: any;
  documentListData: any;
  breDocData;
  raisedDate: any = new Date();
  constructor(private _formBuilder: FormBuilder,
    private router: Router,
    private documentraisedservice: DocumentRaisedService,
    // private documentlistervice:DocumentcreateService,
    private lookupservice: LookupService,
    private matDialogService: MatDialogService,
    private allCommonService: AllCommonService,
    private datePipe: DatePipe,
    public dialog: MatDialog,) {
    this.raisedDate = this.datePipe.transform(this.raisedDate, 'yyyy-MM-dd')
  }

  @ViewChild(MatTable) table!: MatTable<any>;
  ngOnInit(): void {
    this.isReqmtCode = false;
    this.taskCode = this.allCommonService.getTaskCode();
    console.log("taskcode is::", this.taskCode)
    this.appCode = localStorage.getItem('appcode')
    // this.form.get('lookupCd')?.value('Open')
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    if (this.appCode != 'CI') {
      this.documentraisedrequirement();

    }

    this.displayedColumns = ['requirmentType', 'mandatoryDoc', 'documentName', 'raisedDate', 'receivedDate', 'uplodeDoc', 'remark', 'uploadeDate', 'documentStatus'];
    this.documentstatusbylookupcd();
    this.dataSource = new MatTableDataSource();
    console.log("this.dataSource", this.dataSource)
    // this. refreshdata() ;
    // this.pathchvalue();

    this.form = this._formBuilder.group({
      documents: this._formBuilder.array([

      ]),
    });
    // this.form.get('lookupCd')?.setValue('Open');


    if (this.appCode != 'CI') {
      this.allCommonService.refreshDocListSubject.subscribe(data => {
        this.documentraisedrequirement();
      });
    } else {
      this.documentDetailsCI();
    }
    // this.documentraisedrequirement();


    this.trackClaim = this.allCommonService.getTrackClaim();
    if (this.trackClaim || this.appCode == 'AP' || this.appCode == 'PO') {
      this.isReadonly = true
    }
  }
  get documents(): FormArray {
    return this.form.get('documents') as FormArray;
  }
  openDialog(element, i): void {
    const dialogRef = this.dialog.open(DocumentUploadComponent, {
      width: '600px',
      disableClose: true,
      data: { rqmtCode: element.value.rqmtCode }
    });
    this.allCommonService.setDocReqmtCode(element.value.rqmtCode)
    console.log("element>>>>", element.value.rqmtCode)
    dialogRef.afterClosed().subscribe((res) => {
      if(res == "OK"){
      // console.log(res)
      this.upldDt = res.upldDt
      // console.log(this.upldDt)
      this.allCommonService.uploadDateSubject.subscribe(data => {
        try {
          // console.log("--------------------->", data)
          let val = this.documents.controls[i].get('upldDt')?.value ? this.documents.controls[i].get('upldDt')?.value : ''
          if (data) {
            this.documents.controls[i].patchValue({
              upldDt: data ? data : val
            })
            this.table.renderRows();
          }
        } catch (e) {
          console.log(e)
        }
        // console.log(this.documents.controls[i])

      });

    }
  });
    // console.log("elemenr::::", element)
  }

  documentcreateRequest(data) {
    localStorage.removeItem("cancelPopup")
    console.log(data)
    const dialogbox = this.dialog.open(DocumentCreateRequestComponent, {
      width: '600px', disableClose: true,

    })

    dialogbox.afterClosed().subscribe((data) => {
      var cancelClicked = localStorage.getItem("cancelPopup");
      console.log("cancelClicked::", cancelClicked)
      if (cancelClicked == null) {
        this.dataDoc = this.allCommonService.geDocData();
        console.log("adrtadoc", this.dataDoc)
        console.log("dataDoc", this.dataDoc);
        if (this.dataDoc && this.appCode == 'CI') {
          this.onDocAddCI();
        }
      }

    });
  }

  onViewClick() {
    const dialogbox = this.dialog.open(ViewDocumentComponent, {
      width: '600px',
      height: '600px',
      disableClose: true,
    })
    dialogbox.afterClosed().subscribe((data) => {
    });
  }

  dateFormat() {
    let date = this.raisedDate
    const a = date.split("T")
    date = a[0]

  }

  //Bre Doc List set Local storage Data only intimation part 
  localStoragedocumentDetailsCI() {
    if (this.appCode == "CI") {
      this.documentData = JSON.parse(localStorage.getItem('selectedDocData') || '{}');
      // for (var policyid in this.documentData) {
        let policyid = this.policyNum
        this.documentListData = this.documentData[policyid]
        console.log('this.nomineeData????????', this.documentListData)
        const formArrayList = this.documentListData.map(element => {
          const fg = new FormGroup({
            rqmtName: new FormControl(element.rqmtName ),
            lookupCd: new FormControl(element.lookupCd),
            // raisedDate: new FormControl(element.raisedDate ),
            raisedDate: new FormControl(element.raisedDate),
            receivedDate: new FormControl(element.receivedDate),
            upldDt: new FormControl(element.upldDt),
            requirementId: new FormControl(element.requirmentId),
            rqmtCode: new FormControl(element.rqmtCode ),
            rqmtType: new FormControl(element.rqmtType),
            mandatory: new FormControl(element.mandatory ),
            remark: new FormControl(element.remark)

          });
          return fg;
        });
        var fromArray = new FormArray(formArrayList);
        this.form.setControl('documents', fromArray);

      // };
      // this.addNewDocumentCI();
      this.addNewDocumentLocalStorageCI();
    }
  }

  // If else condition Local storage and string subject Bre doc list only intimation part 
  documentDetailsCI() {
    this.documentData = JSON.parse(localStorage.getItem('selectedDocData') || '{}');
    this.policyNum = this.allCommonService.getProfileData();
    let policyArray:any = []
    for (var policyId in this.documentData) {
      policyArray.push(policyId)
      console.log(policyArray)
      console.log(':::::::::::::::::::', this.policyNumber)
      console.log('?>?>>?>?>?>?>?>??>?>', this.policyNum)
    }
    if (Object.keys(this.documentData).length != 0 && (policyArray.includes(this.policyNum))) {
      this.policyNumber = this.policyNum;
      this.localStoragedocumentDetailsCI();


    } else {
      this.allCommonService.intimationDocBreSubjct.subscribe(data => {
        this.DocRespons = data.breDocList;
        console.log(" this.DocRespons", this.DocRespons);
        const formArrayList = this.DocRespons.map(element => {
          const fg = new FormGroup({
            rqmtName: new FormControl(element.rqmtName ? element.rqmtName : '--'),
            lookupCd: new FormControl(element.status ? element.status : '--'),
            // raisedDate: new FormControl(element.raisedDate ),
            raisedDate: new FormControl(this.datePipe.transform(element.raisedDate, 'dd-MM-yyyy')),
            receivedDate: new FormControl(element.receivedDate),
            upldDt: new FormControl(element.upldDt),
            requirementId: new FormControl(element.requirmentId),
            rqmtCode: new FormControl(element.rqmtCode ? element.rqmtCode : '--'),
            rqmtType: new FormControl(element.rqmtType ? element.rqmtType : '--'),
            mandatory: new FormControl(element.mandatoryYn ? element.mandatoryYn : '--'),
            remark: new FormControl(element.remarks)

          });
          return fg;
        });
        var fromArray = new FormArray(formArrayList);
        this.form.setControl('documents', fromArray);

      });
      this.addNewDocumentCI()
    }

  }

  // Add New Document for bre doc list only intimation part 
  addNewDocumentCI() {
    if (this.docValue != undefined) {
      console.log(this.DocRespons);
      if (this.DocRespons == null) {
        this.DocRespons = [];
        this.DocRespons.push(this.docValue);
      } else {
        console.log(this.form.value);
        this.DocRespons = this.form.value.documents;
        this.DocRespons.push(this.docValue);
      }

      var upldDt = localStorage.getItem('docUplodeDate');
      const formArrayList = this.DocRespons.map(element => {
        const fg = new FormGroup({
          rqmtName: new FormControl(element.rqmtName ? element.rqmtName : '--'),
          lookupCd: new FormControl(element.status ? element.status : element.lookupCd),
          receivedDate: new FormControl(element.receivedDate),
          raisedDate: new FormControl(element.raisedDate ? element.raisedDate : '--'),
          upldDt: new FormControl(element.upldDt),
          requirementId: new FormControl(element.requirmentId),
          rqmtCode: new FormControl(element.rqmtCode ? element.rqmtCode : '--'),
          rqmtType: new FormControl(element.rqmtType ? element.rqmtType : '--'),
          mandatory: new FormControl(element.mandatoryYn ? element.mandatoryYn : element.mandatory),
          remark: new FormControl(element.remark)
        });
        return fg;
      });
      var fromArray = new FormArray(formArrayList);
      this.form.setControl('documents', fromArray);
    }
  }

  //  Add Document For Set localstorage Data only intimation part
  addNewDocumentLocalStorageCI() {
    if (this.docValue != undefined) {
      console.log(this.documentListData);
      if (this.documentListData == null) {
        this.documentListData = [];
        this.documentListData.push(this.docValue);
      } else {
        console.log(this.form.value);
        this.documentListData = this.form.value.documents;
        this.documentListData.push(this.docValue);
      }

      var upldDt = localStorage.getItem('docUplodeDate');
      const formArrayList = this.documentListData.map(element => {
        const fg = new FormGroup({
          rqmtName: new FormControl(element.rqmtName ? element.rqmtName : '--'),
          lookupCd: new FormControl(element.status ? element.status : element.lookupCd),
          receivedDate: new FormControl(element.receivedDate),
          raisedDate: new FormControl(element.raisedDate ? element.raisedDate : '--'),
          upldDt: new FormControl(element.upldDt),
          requirementId: new FormControl(element.requirmentId),
          rqmtCode: new FormControl(element.rqmtCode ? element.rqmtCode : '--'),
          rqmtType: new FormControl(element.rqmtType ? element.rqmtType : '--'),
          mandatory: new FormControl(element.mandatoryYn ? element.mandatoryYn : element.mandatory),
          remark: new FormControl(element.remark)
        });
        return fg;
      });
      var fromArray = new FormArray(formArrayList);
      this.form.setControl('documents', fromArray);
    }
  }
  documentRaised() {
    if (this.appCode != 'CI') {
      this.allCommonService.raisedRequirementsSubjct.subscribe(res => {
        const formArrayList = res.map(element => {
          const fg = new FormGroup({
            rqmtName: new FormControl(element.rqmtName ? element.rqmtName : '--'),
            lookupCd: new FormControl(element.status ? element.status : '--'),
            raisedDate: new FormControl(this.datePipe.transform(element.raisedDate, 'dd-MM-yyyy')),
            receivedDate: new FormControl(element.receivedDate),
            upldDt: new FormControl(element.upldDt), // Remove Upload Date pipe -- Vipul 
            requirementId: new FormControl(element.requirmentId ? element.requirmentId : '--'),
            mandatory: new FormControl(element.mandatoryYn ? element.mandatoryYn : '--'),
            rqmtType: new FormControl(element.reqType ? element.reqType : '--'),
            rqmtCode: new FormControl(element.rqmtCode ? element.rqmtCode : '--'),
            remark: new FormControl(element.remarks)

          });
          return fg;
        });
        var fromArray = new FormArray(formArrayList);
        this.form.setControl('documents', fromArray);
      });
    }
  }

  documentraisedrequirement() {
    if (this.appCode != 'CI') {
      this.documentRaised();
      this.documentraisedservice.fetchRaisedRequirements(this.claimsDetailId).subscribe((res: any) => {
        console.log("response", res.length)
        this.regCRresponse = res;
        let checkDOcStatus = this.regCRresponse.every(item => (item.status != "DOC_STATUS_OPEN"));
        console.log("checkDOcStatus", checkDOcStatus);
        localStorage.setItem("checkDOcStatus", checkDOcStatus)
        if (checkDOcStatus == false) {
          let checkDOcStatus = this.regCRresponse.some(item => (item.status == "DOC_STATUS_OPEN" && item.mandatoryYn == 'N' && item.mandatoryYn == 'Y'));
          localStorage.setItem("checkDOcStatus", 'false')
        }
        else if (checkDOcStatus == false) {
          let checkDOcStatus = this.regCRresponse.some(item => (item.status == "DOC_STATUS_OPEN" && item.mandatoryYn == 'N' && item.mandatoryYn != 'Y'));
          localStorage.setItem("checkDOcStatus", checkDOcStatus)
        }
        // var upldDt = localStorage.getItem('docUplodeDate')
        const formArrayList = res.map(element => {
          const fg = new FormGroup({
            rqmtName: new FormControl(element.rqmtName ? element.rqmtName : '--'),
            lookupCd: new FormControl(element.status ? element.status : '--'),
            //  raisedDate: new FormControl(element.raisedDate ),
            raisedDate: new FormControl(this.datePipe.transform(element.raisedDate, 'dd-MM-yyyy')),
            receivedDate: new FormControl(this.datePipe.transform(element.receivedDate, 'dd-MM-yyyy')),
            upldDt: new FormControl(element.upldDt), // Remove Upload Date Pipe --Vipul
            requirementId: new FormControl(element.requirmentId ? element.requirmentId : '--'),
            mandatory: new FormControl(element.mandatoryYn ? element.mandatoryYn : '--'),
            rqmtType: new FormControl(element.reqType ? element.reqType : '--'),
            remark: new FormControl(element.remarks),
            rqmtCode: new FormControl(element.rqmtCode ? element.rqmtCode : '--'),

          });
          return fg;
        });
        var fromArray = new FormArray(formArrayList);
        this.form.setControl('documents', fromArray);
        var isOpenStatusCheck = res.every(item => item.status === 'DOC_STATUS_R ECEIVED')
        console.log('isOpenStatusCheck', isOpenStatusCheck)
        // isOpenStatusCheck = true
        this.allCommonService.setApiStatusCheck(isOpenStatusCheck)


      });

    }
    //  else{ 
    //   var response = this.allCommonService.documentRaisedData;
    //   console.log("response:::",response)
    //   this.docValue = response.find(x => { return x.rqmtCode === this.dataDoc});
    //   this.documentDetailsCI();

    // }  

  }

  // for docAdd on CI
  onDocAddCI() {
    var response = this.allCommonService.documentRaisedData;
    console.log("response:::", response)
    this.docValue = response.find(x => { return x.rqmtCode === this.dataDoc });
    this.documentDetailsCI();
  }

  refreshdata() {
    // alert(this.claimsDetailId);
    console.log("this.form", this.form.value.documents);
    this.documentraisedrequirement();
  }

  //dropdown document status//
  documentstatusbylookupcd() {
    this.lookupservice.fetchBySetName("DOC_STATUS").subscribe((data: any) => {
      this.documentstatus = data.content
      console.log("this.documentstatus", this.documentstatus)

    });


  }
  uploadDocDisable(element) {
    // debugger;
    var lookupCd = element.value.lookupCd;
    if (lookupCd === "DOC_STATUS_RECEIVED" || lookupCd === "DOC_STATUS_CANCELLED" || this.trackClaim) {
      return true;
    } else {
      return false;
    }
  }
  // receivedDate:any;
  onDocChange(event, element, i) {
    console.log("event>>>", event.value)
    localStorage.setItem("docChange", 'true')
    if (event.value) {
      localStorage.setItem('docData', JSON.stringify(this.form.value.documents))
      if (event.value == "DOC_STATUS_OPEN" || event.value == "DOC_STATUS_REOPEN" && (this.appCode == 'AS')) {
        localStorage.setItem('docStatus', 'true')
      } else {
        localStorage.setItem('docStatus', 'false')
      }

    }
    //Forwading current FormStatuses to Decision TAB -- Vipul
    if (this.appCode == "AS" || this.appCode == "AP" || this.appCode == "PO") {
      this.allCommonService.forwordDocStatusDecision(this.form)
    }

    if (event.value == "DOC_STATUS_RECEIVED" || event.value == "DOC_STATUS_CANCELLED") {
      this.documents.controls[i].patchValue({
        receivedDate: this.datePipe.transform(new Date(), "dd-MM-yyyy")

      })
      this.table.renderRows();
    }

  }



  submitdata() {
    if (this.appCode == "CI") {
      this.policyNumber = this.allCommonService.getProfileData()
      var result = JSON.parse(localStorage.getItem('selectedDocData') || '{}');
      result[this.policyNumber] = this.form.value.documents;
      localStorage.setItem('selectedDocData', JSON.stringify(result));
    }
    var requirmentId = this.selectrequirmentId
    this.documentraisedservice.setrequirmentId(requirmentId)
    this.isSaveClicked = true;
    localStorage.setItem('docData', JSON.stringify(this.form.value.documents))
    localStorage.setItem('regSave', this.isSaveClicked);
    localStorage.setItem('docChange', 'false');
    this.allCommonService.checkRemarkValidation();
    // this.allCommonService.docUploadCheck();
    if (this.isSaveClicked == true) {
      // localStorage.removeItem('docStatus');
      localStorage.removeItem('documentAddedManually')
      if (this.DocRespons > 0) {
        this.allCommonService.checkRemarkValidation();
        // this.allCommonService.docUploadCheck();
      }
      var list = this.form.value.documents;
      console.log("Listis", list)
      var isStatusOpen = list.some(item => item.lookupCd == 'DOC_STATUS_OPEN');
      var isStatusReOpen = list.some(item => item.lookupCd == 'DOC_STATUS_REOPEN');
      if (this.appCode == "CI" || this.appCode == "CR") {
        isStatusOpen = list.some(item => item.lookupCd == 'DOC_STATUS_OPEN' && item.mandatory == "Y");
      }
      console.log("status", isStatusOpen);
      if (isStatusOpen == true && (this.taskCode != 'ASSESSMENT_TSK' || this.taskCode != 'AWAIT_ASSESSMENT_REQ') && this.appCode != "AS") {
        this.matDialogService.openNomineeAlertDialog('Document status is open');
        localStorage.setItem('docStatus', isStatusOpen)
      } else if (isStatusOpen == true || isStatusReOpen == true && (this.taskCode == 'ASSESSMENT_TSK' || this.taskCode == 'AWAIT_ASSESSMENT_REQ') && this.appCode == "AS") {
        this.matDialogService.openNomineeAlertDialog('Document status is open');
        localStorage.setItem('docStatus', 'true')
      }
      else {
        isStatusOpen = "false"
        localStorage.setItem('docStatus', isStatusOpen)
        // this.checkRemarkValidation()
        var payloadArray: any = [];
        this.form.value.documents.forEach(element => {
          const payload = {
            "requirementId": element.requirementId,
            "status": element.lookupCd,
            "remarks": element.remark,
            "receivedDate": element.receivedDate,
            // "upldDt": element.upldDt
          }
          payloadArray.push(payload);
        });

        var payload = {
          "statusReq": payloadArray
        }

        this.documentraisedservice.documentstatus(payload).subscribe((res: any) => {
          if (res.status) {
            this.matDialogService.openCommonDialog('Documents Save Successfully')
            localStorage.setItem("checkDOcStatus", 'true')
            console.log(res)
          }

        })

      }


    }
  }


  pathchvalue() {
    var val = localStorage.getItem("documaentstatuevalue")
    var documaentstatuevalue

    if (val != null) {
      documaentstatuevalue = JSON.parse(val)

      // this.firstFormGroup.patchValue({
      //   // docupload:documaentstatuevalue.lookupcd
      // })
    }

  }

  setRemarkValue(event) {
    console.log("event>>>", event.target.value);
  }
  impsValidate: any;
  docValidate: any
  //submit Nominee In CI Not CR And AS
  submitNominee() {
    if (this.appCode == 'CI') {
      this.allCommonService.commonSubmit();
      this.policyNumber = this.allCommonService.getProfileData()
      this.nomineeData = JSON.parse(localStorage.getItem('nomineeDetails') || '{}');
      var result = JSON.parse(localStorage.getItem('selectedDocData') || '{}');
      var documentAdded = localStorage.getItem('documentAddedManually');
      if (documentAdded == 'true') {
        this.matDialogService.openCommonDialog('Please Save the documents');
      }
      var uploadDate = localStorage.getItem("uploadDate");
      if (uploadDate) {
        localStorage.removeItem('docRecived');
      }
      result[this.policyNumber] = this.form.value.documents;
      localStorage.setItem('selectedDocData', JSON.stringify(result));
      localStorage.setItem('docData', JSON.stringify(this.form.value.documents));
      // this.allCommonService.docUploadCheck();

      let isNomineeValidated = this.allCommonService.isNomneeValidated;
      for (var policyid in this.nomineeData) {
        var array = this.nomineeData[policyid].data;
        // var nomineeList = array.filter(x => { return x.clientRole == 'Beneficiary' });
        // if (nomineeList.length != 0) {
        console.log("array is", array);
        if ((array.every(item => item.impsStatus === 'DIRECT_MATCH' || item.impsStatus == 'PARTIAL_MATCH'))) {
          this.impsValidate = true;
        }
        else {
          this.impsValidate = false;
        }
        this.allCommonService.setImpsStatus(this.impsValidate);
        console.log('array????????<><><><', this.impsValidate)

      }
      this.breDocData = JSON.parse(localStorage.getItem('selectedDocData') || '{}');
      for (var policyid in this.breDocData) {
        var docAarray = this.breDocData[policyid];
        if ((docAarray.some(item => item.mandatory === 'Y' && (item.lookupCd === 'DOC_STATUS_RECEIVED' || item.lookupCd == "DOC_STATUS_CANCELLED")))) {
          this.docValidate = true;
        }
        else {
          this.docValidate = false;
        }
      }
      this.allCommonService.setDocStatusValidate(this.docValidate);
      // var list = this.form.value.documents;
      // console.log("Listis", list)
      // var isStatusOpen = list.some(item => item.lookupCd == 'DOC_STATUS_OPEN');
      // console.log("status", isStatusOpen);
      // if (isStatusOpen == true) {
      //   this.matDialogService.openNomineeAlertDialog('Document status is open');
      //   localStorage.setItem('docStatus', isStatusOpen)
      // }
      //   this.checkRemarkValidation();
      if (isNomineeValidated) {
        var list = this.form.value.documents;
        console.log("Listis", list)
        this.validator = this.allCommonService.getNomineeValidate()
        localStorage.removeItem('docRecived');
        let isStatusOpen: string = "false"
        let isRemarkStatus: string = "false"
        let isRecived: string = "false"
        var crFilterReciveddata = list.filter(x => { return x.lookupCd == "DOC_STATUS_RECEIVED" });
        var listuploadDate = crFilterReciveddata.some(x => { return x.upldDt != null });
        list.forEach(ele => {
          if (ele.lookupCd == "DOC_STATUS_OPEN" && ele.mandatory == "Y") {
            isStatusOpen = "true"
          } else if (ele.lookupCd == "DOC_STATUS_CANCELLED" && ele.remark == null) {
            isRemarkStatus = "true"
          } else if (ele.lookupCd == "DOC_STATUS_RECEIVED" && listuploadDate != true) {
            isRecived = "true"
          } else if (ele.lookupCd == "DOC_STATUS_RECEIVED" && listuploadDate == true) {
            isRecived = "false"
          }
        }
        )
        console.log("status", isStatusOpen);
        if (isStatusOpen == "true") {
          localStorage.setItem('docStatus', isStatusOpen)
          this.matDialogService.openNomineeAlertDialog('Document status is open')
          this.allCommonService.setDocStatus(isStatusOpen)
          this.validator = false;
        } else {
          isStatusOpen = "false";
          localStorage.setItem('docStatus', isStatusOpen)
          this.allCommonService.setDocStatus(isStatusOpen)
          this.validator = true;

        }

        if (isRecived == 'true') {
          localStorage.setItem('docRecived', isRecived)
          this.matDialogService.openNomineeAlertDialog('Please upload the document')
        } else {
          isRecived = "false";
          localStorage.setItem('docRecived', isRecived)
        }

        if (isRemarkStatus == "true") {
          this.allCommonService.setDocRemark(isRemarkStatus)
          this.validator = false;
        } else {
          isRemarkStatus = "false"
          this.allCommonService.setDocRemark(isRemarkStatus)
          this.validator = true;
        }

        this.allCommonService.docValidationNew()

        this.allCommonService.checkRemarkValidation();
      }



      // }
    }
  }



  // checkRemarkValidation() {
  //   var getDocData = JSON.parse(localStorage.getItem('docData') || '{}');
  //   console.log("getDocData", getDocData);
  //   var searchCancelled = getDocData.find(x => { return x.lookupCd == "DOC_STATUS_CANCELLED" && x.remark == null });
  //   console.log("searchCancelled", searchCancelled);
  //   if (searchCancelled) {
  //     this.matDialogService.openNomineeAlertDialog('Please add remark for cancelled status of document')

  //   }
  // }


  // documenstatusclaims() {
  //   var payload = {
  //     "claimsDetailId": "13",
  //     "rqmtCode": "FIRST_INFO_REPORT"
  //   }
  //   this.documentraisedservice.documentcreate(payload).subscribe((res: any) => {
  //     console.log(res)
  //     this.status = res
  //     if (this.status) {
  //       this.matDialogService.openCommonDialog('Successs');

  //     } else {

  //     }

  //   })
  // }

  onCancelButton() {
    this.allCommonService.onCancelButton();
  }
}
