import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { MatDialogService } from 'src/app/views/registration/services/mat-service/mat-dialog.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();

  constructor(
    private commonService: CommonService,
    private router: Router,
    private allCommonService: AllCommonService,
    private matDialogService: MatDialogService) { }


  appcode: any;
  myWorkList: any;
  data: any;
  ngOnInit(): void {
    this.appcode = localStorage.getItem('appcode')
    this.displayedColumns = ['claimNo', 'policy', 'dateOfEvent', 'claimType', 'intimationDate', 'caseStatus', 'caseStage', 'intimatingBranch'];

    this.commonService.getCommonGroupService().subscribe((res: any) => {
      if (this.appcode == "PO") {
        this.data = res['PAYOUT_TSK']
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];
    })
  }

  redirect(element) {
    if (this.appcode == 'PO') {
      this.allCommonService.setClaimsDetailId(element.claimsDetailId);
      this.allCommonService.setCRClaimData(element.policyId);
      this.allCommonService.setTtskInstncId(element.ttskInstncId);
      this.allCommonService.setTskBpmId(element.tskBpmId);
      this.allCommonService.setClientId(element.clientId);
      this.allCommonService.setclaimStatus(element.claimStatusDesc);
      this.allCommonService.setproductCode(element.productCode);
      this.allCommonService.setpolicyStatusAtDoe(element.policyStatusAtDoe);
      this.allCommonService.setclaimNo(element.claimNo);
      this.allCommonService.setClaimDurationPO(element.claimDuration)
      this.allCommonService.setRequirementClsdDt(element.requirementClsdDt)
      this.allCommonService.setPolicyTypeUlipYN(element.ulipYn)
      this.allCommonService.setElementData(element.claimTypeCd)
      this.router.navigate(['/claims-payout/nominee-details'])

    }
  }

  applyFilter(data: any) {
    this.dataSource.filter = data.value.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

