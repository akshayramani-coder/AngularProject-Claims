import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { RoleDetailsService } from '../../services/common-service/role-details.service';
import { ProfileService } from '../../services/profile.service'; 
import { AuditHistoryComponent } from '../audit-history/audit-history.component';
import { CorrespondenceComponent } from '../correspondence/correspondence.component';
import { CpsComponent } from '../cps/cps.component';
import { IibComponent } from '../iib/iib.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { CommonService } from 'src/app/views/claim-assessor/services/common.service';
import { ViewDocumentComponent } from '../view-document/view-document.component';

import { NomineeAndBankDetailsComponent } from '../nominee-and-bank-details/nominee-and-bank-details.component';
import { DecisionComponent } from '../decision/decision.component';
@Component({
  selector: 'app-all-profile-details',
  templateUrl: './all-profile-details.component.html',
  styleUrls: ['./all-profile-details.component.scss']
})
export class AllProfileDetailsComponent implements OnInit {
  formGroup!: FormGroup;
  submitted: Boolean = false;
  appCode:any;
  selectedIndex: any = 0;
  tab1: boolean = false;
  tab2: boolean = false;
  tab3: boolean = false;
  tab4: boolean = false;
  tab5: boolean = false;
  tab6: boolean = false;
  tab7: boolean = false;
  response:any;
  trackClaim:boolean=false;
  taskCode: any;
  // referralCode!: boolean;
  claimsDetailId: any;
  constructor(
    public alertEmitservice: ProfileService,
    private profileService: ProfileService,
    private tabDetailsService:RoleDetailsService,
    private allCommonService:AllCommonService,
    public dialog: MatDialog,
    private commonService: CommonService

  ) {}

  clickCount = 0
  //  taskDecisionCodeAwait = ['AWAIT_ASSESSMENT_REFERRAL']
  // showRnR: boolean = false
  taskDecisionCode = ["REFERRAL_TYPE_MED_OPINION", "REFERRAL_TYPE_CRC_CLM_REVEW_COMMITTEE", "REFERRAL_TYPE_EXPRT_OPINION", "REFERRAL_TYPE_INVESTIGATION", "REFERRAL_TYPE_INVESTIGATION_WAIVER", "REFERRAL_TYPE_LEGAL_OPINION", "REFERRAL_TYPE_RCU_RSK_CNTRL_UNIT", "REFERRAL_TYPE_RE_INSUR_OPINION", "REFERRAL_TYPE_UW_OPINION"]
  //  showRnR:boolean =false

  ngOnInit() {
    this.appCode = localStorage.getItem('appcode');
    this.taskCode = this.allCommonService.getTaskCode();
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    // if(this.taskCode == "ASSESSMENT_TSK"){
    //   this.referralDecisions()
    // }
    // this.taskDecisionCodeAwait.forEach((ele)=>{
    //   if(this.taskCode == ele){
    //     this.showRnR = true
    //   }
    // })

    // if (this.appCode != 'CR' && this.appCode != 'CI') {
    //   this.referralDecisions();
    // }
    console.log(this.taskCode,'this is taskcode')
    this.selectedIndex = 1;
    this.nextEmit();
    this.previusEmit();
    this.fetchTabDataService();
    this.trackClaim=this.allCommonService.getTrackClaim();
  }

  fetchTabDataService(){
    this.tabDetailsService.getroleDetails().subscribe((res: any) => {
      console.log(res);
      this.response = res;
      this.allCommonService.setAllTabData(res)
      this.allCommonService.passValue(this.response);
      // localStorage.setItem('allTabCIData', JSON.stringify(this.response));
  })
}

  nextEmit(): any {
    this.alertEmitservice.candidateProfileNextData.subscribe((data: any) => {
      if (data || data == 0) {
        // if (data < 8) {
        //   this.selectedIndex = data + 1;
        // } else {
        //   this.selectedIndex = 0;
        // }
        if (data < 8) {
          this.selectedIndex = data + 1;
          this.tab1 = false;
          this.tab2 = false;
          this.tab3 = false;
          this.tab4 = false;
          this.tab5 = false;
          this.tab6 = false;
          this.tab7 = false;
        } else {
          this.selectedIndex = 0;
        }
      }
    });
  }
  nextEmitStep(): any {
    this.alertEmitservice.candidateProfileNextDataStep.subscribe(
      (data: any) => {
        if (data || data == 0) {
          if (data < 7) {
            this.selectedIndex = data + 1;
          } else {
            this.selectedIndex = 0;
          }
        }
      }
    );
  }
  previusEmit(): any {
    this.alertEmitservice.candidateProfilePreviousData.subscribe(
      (data: any) => {
        if (data) {
          this.selectedIndex = data - 1;
        }
      }
    );
  }


  onViewClick() {
    const dialogbox = this.dialog.open(ViewDocumentComponent, {
      width: '500px',
      height:'500px',
      disableClose: true,
    })
    dialogbox.afterClosed().subscribe((data) => {
    });
  }

   
  audit(){
    const dialogRef = this.dialog.open(AuditHistoryComponent, {
      width: '75%', disableClose: true
    });
  }

  transaction() {
    const dialogRef = this.dialog.open(TransactionHistoryComponent, {
      width: '75%', disableClose: true
    });
  }
  iib() {
    const dialogRef = this.dialog.open(IibComponent, {
      width: '75%', disableClose: true
    });
  }
  cps() {
    const dialogRef = this.dialog.open(CpsComponent, {
      width: '90%', disableClose: true
    });
  }
  correspondence() {
    const dialogRef = this.dialog.open(CorrespondenceComponent, {
      width: '75%', disableClose: true
    });
  }

  // referralDecisions() {
  //   this.taskDecisionCode.forEach((ele) => {
  //     // console.log('ele', ele);
  //     // console.log(this.taskCode == ele, 'this.taskCode == ele');
  //     if (this.taskCode == ele) {
  //       this.referralCode = true;
  //     }
  //   })

  //   console.log('referralcode', this.referralCode);
  //   if (this.referralCode == true) {
  //     this.commonService.getReferralComments(this.taskCode, this.claimsDetailId).subscribe((res: any) => {
  //       if (res.length > 0) {
  //         this.showRnR = true;
  //         console.log('its referral Comments', res)
  //       }
  //     })
  //   }
  //   else {
  //     this.commonService.getReferralDecisions(this.allCommonService.getClaimsDetailId()).subscribe((res: any) => {
  //       if (res.length > 0) {
  //         this.showRnR = true;
  //         console.log('its Assessment or assessment await Comments', res)
  //       }
  //     })
  //   }
  // }

  @ViewChild(NomineeAndBankDetailsComponent) nomineecomponent!: NomineeAndBankDetailsComponent;
  @ViewChild(DecisionComponent) decisionComponent!:DecisionComponent;
  onChange(event){
    console.log(event)
    const tab = event.tab.textLabel;
    console.log(tab);
    if(tab  == "Beneficiary" && this.appCode == "AS"){
      this.nomineecomponent.onNomineeFetchData()
    }
    if(tab == "decision"){
      this.decisionComponent.checkDocStatus()
    }
  }
}

 