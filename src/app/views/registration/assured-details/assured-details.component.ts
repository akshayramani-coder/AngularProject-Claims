import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventClaimDialogComponent } from 'src/app/common/model/event-claim-dialog/event-claim-dialog.component';
import { ClaimEventDetailsComponent } from '../claim-event-details/claim-event-details.component';
import { AllCommonService } from '../services/common-service/all-common.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { PolicyService } from '../services/common-service/policy.service';
import { LookupcodeService } from '../services/lookup/lookupcode.service';
import swal from 'sweetalert';
import * as moment from 'moment';
import { RoleDetailsService } from '../services/common-service/role-details.service';
import { RoleDetailsComponent } from '../profile-details/role-details/role-details.component';

@Component({
  selector: 'app-assured-details',
  templateUrl: './assured-details.component.html',
  styleUrls: ['./assured-details.component.scss']
})
export class AssuredDetailsComponent implements OnInit {
  isDeath: Boolean = false;
  ClaimsDetailId: any;
  claimTypeDisp: any;
  claimIntimationDt: any;
  policyStatusOnIntimationDt: any;
  deathClaimTypDisp: any;
  claimStatusDisp: any;
  appCode: any;
  data: any;
  deathCause: any;
  eventDt: any;
  secondaryEventCause: any;
  eventOrganImpacted: any;
  deathPlace: any;
  hospitalName: any;
  lifeassureddata: any;
  clientRolwCode: any
  claimData: any;
  lifeassureData: any;
  ClaimDetails: any;
  initiatedByDisp: any;
  relationWithLifeAssuredDisp: any;
  viewOnly: boolean = true;
  editable: boolean = false;
  policyData: any;
  rcdDate: any;
  DOE: any;
  rcdDoe!: string;
  rcdDoi!: string;
  revivalDoe!: string;
  message!: string;
  DOI: any;
  DOECI: any;
  DOICI: any;
  taskCode: any;
  constructor(private router: Router, public dialog: MatDialog,
    private allCommonService: AllCommonService,
    private lookupcodeservice: LookupcodeService, private clientidservice: IntimationService,
    private policyService: PolicyService,private tabDetailsService:RoleDetailsService) { }

  ngOnInit(): void {
    this.taskCode = this.allCommonService.getTaskCode();
    this.appCode = localStorage.getItem('appcode')
    this.getClaimAndEventDetails();
    // localStorage.getItem('ClaimDetails');
    // this.ClaimDetails==localStorage.getItem()
    this.lifeAssureDetailsCI();
    this.policydetails();
    this.lifeassreddetails();

    this.getClaimDetails();


    // console.log(this.myForm.value)
    // this.ClaimDetails.getprofiledata.subscribe((res: any) => {
    //   this.lookup.setClaimData(res);
    //   this.router.navigate(['/claims-intimation/claim-profile']);

    // })
    this.setDetails("claimType", "claimTypeDisp");
    this.setDetails("IntimatedBy", "IntimatedByDisp");
    this.setDetails("Relation", "RelationDisp");
    this.setDetails("eventCause", "eventCauseDisp")
    // this.setDetails("secondaryeventCause","secondaryeventCauseDisp");
    this.setDetails("Organ", "OrganDisp");
    this.setDetails("PlaceDeath", "PlaceDeathDisp");
    this.setDetails("secondary_event_Cause", "secondaryeventCauseDisp");

    if (this.ClaimDetails.claimType == 'CLAIM_TYPE_DEATH') {
      this.isDeath = true;
    } else {
      this.isDeath = false
    }

    //   getdata() {
    //     this.dataService.getCardsData().subscribe(res => {
    //        this.res = data;
    //        this.loaded = true;
    //     });
    //  }


  }




  
  setDetails(fieldName: string, fieldNameDisp: string) {

    this.lookupcodeservice.getLookupByCode(this.ClaimDetails[fieldName]).subscribe((res: any) => {
      //this.eventcause=res;
      this.ClaimDetails[fieldNameDisp] = res.lngName;

    });
  }
  sendToDashboard(errorMessage) {
    swal(errorMessage, {
      closeOnClickOutside: false,
      closeOnEsc: false
    });
    switch (this.appCode) {
      case 'CR':
        {
          this.router.navigate(['/claims-registration']);
          break;
        }
      case 'AS': {
        this.router.navigate(['/claims-intimation']);
        break;
      }
      default:
        break;
    }

  }


  
  getClaimAndEventDetails() {
    if (this.appCode !== 'CI') { // CR TO NOT CI
      var ClaimsDetailId = this.allCommonService.getClaimsDetailId();
      if (ClaimsDetailId === undefined) {
        this.sendToDashboard("Claim Not found! Sent To Dashboard ");
      }
      this.allCommonService.getEventAndClaimDetails(ClaimsDetailId).subscribe((res: any) => {
        this.data = res
        this.allCommonService.setClaimDetails(this.data);
        localStorage.setItem("eventDate", this.data.eventDetailsDto.eventDt);
        localStorage.setItem("claimTypeDisp", this.data.transClaimDetailsDto.claimTypeDisp);
        if (this.data) {
          this.claimTypeDisp = this.data.transClaimDetailsDto.claimTypeDisp;
          this.claimIntimationDt = this.data.transClaimDetailsDto.intimationDate;
          this.policyStatusOnIntimationDt = this.data.transClaimDetailsDto.policyStatusOnIntimationDt;
          this.deathClaimTypDisp = this.data.transClaimDetailsDto.deathClaimTypDisp;
          this.claimStatusDisp = this.data.transClaimDetailsDto.claimStatusDisp;
          this.deathCause = this.data.eventDetailsDto.deathCauseDisp;
          this.eventDt = this.data.eventDetailsDto.eventDt;
          this.secondaryEventCause = this.data.eventDetailsDto.secondaryEventCauseDisp;
          this.eventOrganImpacted = this.data.eventDetailsDto.eventOrganImpactedDisp;
          this.deathPlace = this.data.eventDetailsDto.deathPlaceDisp;
          this.initiatedByDisp = this.data.eventDetailsDto.initiatedByDisp;
          this.hospitalName = this.data.eventDetailsDto.hospitalName;
          this.relationWithLifeAssuredDisp = this.data.eventDetailsDto.relationWithLifeAssuredDisp;
        }
      },
        (err) => {
          console.log(err)
          this.sendToDashboard("Service Down, please try other case or ontact Support");
        }
      );
    }

  }
  userprofile: any;
  lifeAssureDetailsCI() {
    if (this.appCode == 'CI') {
      this.claimData = this.policyService.getClaimData()
      console.log("this.claimData", this.claimData);
      this.lifeassureData = {};
      var clientid = this.clientidservice.getClientId()
      console.log('currentclientid', clientid)

      for (var client of this.claimData) {
        if (client.clientId === clientid) {
          this.lifeassureData = client;
        }
      }
    }
  }

  lifeassreddetails() {

    try {

      this.allCommonService.stringSubject.subscribe(data => {
        var allTabData = data;
        // var allTabData = this.allCommonService.getAllTabData();
        console.log("clientDetails:::", allTabData)
        this.lifeassureddata = {};
        var clientid = this.allCommonService.getClientId()
        console.log('currentclientid', clientid)

        for (var client of allTabData.clientDetails) {
          if (client.clientId === clientid) {
            this.lifeassureddata = client;
          }
        }
      });

    } catch (err) { }
    // this.lifeassureddata = clientid
  }

  // to open event-claim as a popup
  onViewClick(): void {
    this.allCommonService.setEditable(this.viewOnly);
    const dialogRef = this.dialog.open(EventClaimDialogComponent, {
      width: '93%',
      height: '600px',
      data: this.data,

    });
    dialogRef.afterClosed().subscribe((result) => {
      result = this.getClaimAndEventDetails()
    });
  }
  onEditClick(): void {
    this.allCommonService.setEditable(this.editable);
    const dialogRef = this.dialog.open(EventClaimDialogComponent, {
      width: '93%',
      height: '600px',
      data: this.data,

    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getClaimAndEventDetails();
      this.fetchTabDataService()
      
    });
  }

  fetchTabDataService(){
    this.tabDetailsService.getroleDetails().subscribe((res: any) => {
      console.log(res);
      this.allCommonService.setAllTabData(res)
      this.allCommonService.passValue(res);
      this.policydetails()
      this.rolecomponent?.roleDetails();
       
  })
}
  getClaimDetails() { 
    this.ClaimDetails = localStorage.getItem('ClaimDetails');
    this.ClaimDetails = JSON.parse(this.ClaimDetails);
    console.log(this.ClaimDetails);
    console.log('clmIntimationdtCI', this.ClaimDetails.ClaimDate);
    console.log('clmIntimationdtCINewDate', ((new Date(this.ClaimDetails.ClaimDate))));
    this.DOECI = new Date(this.ClaimDetails.eventDate);
    // ClaimDate is changed to eventDate  👆 to get Date of Event
    this.DOICI = new Date(this.ClaimDetails.ClaimDate);
    // console.log(this.DOECI.getTime() - this.DOICI.getTime())
    // console.log(this.DOECI.getTime())
    console.log('eventDtCI', this.ClaimDetails.eventDate);
  }
 
  policydetails() {
    this.allCommonService.stringSubject.subscribe(data => {
      console.log('next subscribed value: ' + data);
      var tabData = data;
      this.policyData = {}
      console.log("tabData is:::", tabData);
      var policyDetails = tabData.policyDetails;

      setTimeout(() => {
        for (let data of policyDetails) {
          // if (data.isrider == 'N') {
          this.policyData = data;
          console.log('rcdDate', this.policyData.rcd)
          console.log('revivalDate', this.policyData.revivalDate)
          this.message = "NA"
          var rcdDate = new Date(this.policyData.rcd);
          var revivalDt = new Date(this.policyData.revivalDate);
          if (this.appCode != 'CI') {
            this.DOE = new Date(this.eventDt);
            this.DOI = new Date(this.claimIntimationDt);
            console.log('clmIntimationdt', this.claimIntimationDt);
            console.log('eventDt', this.eventDt);
  
            // rcd - doe
            if (this.policyData.rcd != null && this.policyData.rcd != undefined && this.eventDt != null && this.eventDt != undefined) {
              // this.rcdDoe = (Math.round(Math.abs((rcdDate.getTime() - this.DOE.getTime()) / (1000 * 3600 * 24 * 365)))).toString();
              console.log(this.rcdDoe);
              
  
              let m = moment(this.DOE);
              let years = m.diff(this.policyData.rcd, 'years');
              m.add(-years, 'years');
              console.log(years)
              let months = m.diff(this.policyData.rcd, 'months');
              m.add(-months, 'months');
              console.log(months)
              let days = m.diff(this.policyData.rcd, 'days');
              console.log(days)
  
              this.rcdDoe = `${years} years ${months} months ${days} days`
              console.log(this.rcdDoe)
              this.allCommonService.setrcddoe(this.rcdDoe);
            }
            else {
              this.rcdDoe = this.message
              this.allCommonService.setrcddoe(null);
            }
  
            // rcd - doi
            if (this.policyData.rcd != null && this.policyData.rcd != undefined && this.claimIntimationDt != null && this.claimIntimationDt != undefined) {
              // this.rcdDoi = (Math.round(Math.abs((rcdDate.getTime() - this.DOI.getTime()) / (1000 * 3600 * 24 * 365)))).toString();
              console.log(this.rcdDoi);
              let m = moment(this.DOI);
              let years = m.diff(this.policyData.rcd, 'years');
              m.add(-years, 'years');
              console.log(years)
              let months = m.diff(this.policyData.rcd, 'months');
              m.add(-months, 'months');
              console.log(months)
              let days = m.diff(this.policyData.rcd, 'days');
              console.log(days)
  
              this.rcdDoi = `${years} years ${months} months ${days} days`
              console.log(this.rcdDoi)
              this.allCommonService.setrcddoi(this.rcdDoi)
  
            }
            else {
              this.rcdDoi = this.message
              this.allCommonService.setrcddoi(null)
            }
  
            // revival - doe
            if (this.policyData.revivalDate != null && this.policyData.revivalDate != undefined && this.eventDt != null && this.eventDt != undefined) {
              // this.revivalDoe = (Math.round(Math.abs((revivalDt.getTime() - this.DOE.getTime()) / (1000 * 3600 * 24 * 365)))).toString();
              console.log(this.revivalDoe);
              let m = moment(this.DOE);
              let years = m.diff(this.policyData.revivalDate, 'years');
              m.add(-years, 'years');
              console.log(years)
              let months = m.diff(this.policyData.revivalDate, 'months');
              m.add(-months, 'months');
              console.log(months)
              let days = m.diff(this.policyData.revivalDate, 'days');
              console.log(days)
  
              this.revivalDoe = `${years} years ${months} months ${days} days`
              console.log(this.revivalDoe)
              this.allCommonService.setrevivaldoe(this.revivalDoe)
  
            }
            else {
              this.revivalDoe = this.message
              this.allCommonService.setrevivaldoe(null)
            }
  
          } else {
            // this.getClaimDetails();
            // rcd - doe
            if (this.policyData.rcd != null && this.policyData.rcd != undefined && this.ClaimDetails.eventDate != null && this.ClaimDetails.eventDate != undefined) {
              // this.rcdDoe = (Math.round(Math.abs((rcdDate.getTime() - this.DOECI.getTime()) / (1000 * 3600 * 24 * 365)))).toString();
              console.log(this.rcdDoe)
              let m = moment(this.DOECI);
              let years = m.diff(rcdDate, 'years');
              m.add(-years, 'years');
              console.log(years)
              let months = m.diff(rcdDate, 'months');
              m.add(-months, 'months');
              console.log(months)
              let days = m.diff(rcdDate, 'days');
              console.log(days)
  
              this.rcdDoe = `${years} years ${months} months ${days} days`
              console.log(this.rcdDoe)
              
            }
            else {
              this.rcdDoe = this.message
            }
  
            // rcd - doi
            if (this.policyData.rcd != null && this.policyData.rcd != undefined && this.ClaimDetails.ClaimDate != null && this.ClaimDetails.ClaimDate != undefined) {
              // this.rcdDoi = (Math.round(Math.abs((rcdDate.getTime() - this.DOICI.getTime()) / (1000 * 3600 * 24 * 365)))).toString();
              console.log(this.rcdDoi);
              let m = moment(this.DOICI);
              let years = m.diff(rcdDate, 'years');
              m.add(-years, 'years');
              console.log(years)
              let months = m.diff(rcdDate, 'months');
              m.add(-months, 'months');
              console.log(months)
              let days = m.diff(rcdDate, 'days');
              console.log(days)
  
              this.rcdDoi = `${years} years ${months} months ${days} days`
              console.log(this.rcdDoi)
  
            }
            else {
              this.rcdDoi = this.message
            }
  
            // revival - doe
            if (this.policyData.revivalDate != null && this.policyData.revivalDate != undefined && this.ClaimDetails.eventDate != null && this.ClaimDetails.eventDate != undefined) {
              // this.revivalDoe = (Math.round(Math.abs((revivalDt.getTime() - this.DOECI.getTime()) / (1000 * 3600 * 24 * 365)))).toString();
              console.log(this.revivalDoe);
  
  
              let m = moment(this.DOECI);
              let years = m.diff(revivalDt, 'years');
              m.add(-years, 'years');
              console.log(years)
              let months = m.diff(revivalDt, 'months');
              m.add(-months, 'months');
              console.log(months)
              let days = m.diff(revivalDt, 'days');
              console.log(days)
  
              this.revivalDoe = `${years} years ${months} months ${days} days`
              console.log(this.revivalDoe)
  
            }
            else {
              this.revivalDoe = this.message
            }
          }
        }
      }, 2000);

      
    });
  }

  @ViewChild(RoleDetailsComponent) rolecomponent!:RoleDetailsComponent;
}
