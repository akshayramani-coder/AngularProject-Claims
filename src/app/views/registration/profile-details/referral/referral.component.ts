import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuditHistoryService } from 'src/app/views/claim-assessment/services/audit-history.service';
import { CommonService } from 'src/app/views/claim-assessor/services/common.service';
import { AllCommonService } from '../../services/common-service/all-common.service';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {
  displayedColumns!: string[];
  dataSource: Array<any> = new Array();
  audit: any;
  dialogRef: any;
  paginator: any;
  sort: any;
  statuses: Array<any> = new Array();
  taskDecisionCode = ["REFERRAL_TYPE_MED_OPINION", "REFERRAL_TYPE_CRC_CLM_REVEW_COMMITTEE", "REFERRAL_TYPE_EXPRT_OPINION", "REFERRAL_TYPE_INVESTIGATION", "REFERRAL_TYPE_INVESTIGATION_WAIVER", "REFERRAL_TYPE_LEGAL_OPINION", "REFERRAL_TYPE_RCU_RSK_CNTRL_UNIT", "REFERRAL_TYPE_RE_INSUR_OPINION", "REFERRAL_TYPE_UW_OPINION"];
  taskCode: any;
  referralCode!: boolean;
  claimsDetailId: any;
  referrals!: boolean;
  notes!: boolean;
  dataSourceUser:any;
  displayedColumnsUser!:string[]

  constructor(
    private allCommonService: AllCommonService,
    private audithistoryService: AuditHistoryService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    this.taskCode = this.allCommonService.getTaskCode();
    // console.log('claimDetailsID', this.allCommonService.getClaimsDetailId())
    this.displayedColumns = ['referralTypeDisp', 'asmRemarks', 'refUserName', 'updatedOn', 'refRemarks'];
    this.displayedColumnsUser=['task','date','name', 'remark'];
    this.referralDecisions();
    this.userCommentRemark();

    if (!this.referralCode) {
      this.note();
    } else {
      this.referral();
    }
  }

  referralDecisions() {
    this.taskDecisionCode.forEach((ele) => {
      // console.log('ele', ele);
      // console.log(this.taskCode == ele, 'this.taskCode == ele');
      if (this.taskCode == ele) {
        this.referralCode = true;
      }
    })

    if (this.referralCode == true) {
      this.commonService.getReferralComments(this.taskCode, this.claimsDetailId).subscribe((res: any) => {
        console.log('its referral Comments', res)
        res.forEach(ele => {
          this.statuses.push(ele.status)
          this.dataSource.push(new MatTableDataSource(ele.objList))
        });
      })
    }
    else {
      this.commonService.getReferralDecisions(this.allCommonService.getClaimsDetailId()).subscribe((res: any) => {
        console.log('its Assessment or assessment await Comments', res)
        res.forEach(ele => {
          this.statuses.push(ele.status)
          this.dataSource.push(new MatTableDataSource(ele.objList))
        });
      })
    }
  }
  note() {
    this.notes = true;
    this.referrals = false;
  }
  referral() {
    this.referrals = true;
    this.notes = false;
  }
  onCancelButton() {
    this.allCommonService.onCancelButton();
  }

  userCommentRemark(){
    this.commonService.getUserComment(this.allCommonService.getClaimsDetailId()).subscribe((res:any)=>{
      console.log(res)
      this.dataSourceUser= new MatTableDataSource(res)
    })
  }
}
