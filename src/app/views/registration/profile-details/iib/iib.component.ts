import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuditHistoryService } from 'src/app/views/claim-assessment/services/audit-history.service';
import { AllCommonService } from '../../services/common-service/all-common.service';

@Component({
  selector: 'app-iib',
  templateUrl: './iib.component.html',
  styleUrls: ['./iib.component.scss']
})
export class IibComponent implements OnInit {
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  paginator: any;
  sort: any;
  iibRes:any=[];
  constructor(
    private allCommonService: AllCommonService,
    private audithistoryService: AuditHistoryService
  ) { }

  ngOnInit(): void {
    this.allCommonService.getClaimsDetailId();
    this.allCommonService.getClientId();
    console.log('claimDetailsId', this.allCommonService.getClaimsDetailId(), 'ClaientId', this.allCommonService.getClientId())

    this.displayedColumns = ['questDbNo', 'questDopDoc', 'questSumAssured', 'questPolicyStatus', 'questDateOfExit', 'questDateOfDeath', 'questCauseOfDeath', 'questRecordLastUpdated', 'questEntityCautionStatus', 'questIntermedCautionStatus', 'questCompanyNumber'];

    this.IIBHistory()
  }

  IIBHistory() {
    this.audithistoryService.getIIBHistory((this.allCommonService.getClaimsDetailId()), (this.allCommonService.getClientId())).subscribe((res: any) => {
      if (res) {
        this.iibRes=res
        this.dataSource = new MatTableDataSource(res.iibDetails);
        this.dataSource.paginator = this.paginator.toArray()[0];
        this.dataSource.sort = this.sort;
        console.log(res);
      }
    })
  }
}