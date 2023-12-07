import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { RoleDetailsService } from 'src/app/views/registration/services/common-service/role-details.service';
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
    private matDialogService: MatDialogService,
    private roleDetailsService: RoleDetailsService) {

  }
  appcode: any;
  myWorkList: any;
  data: any;
  ngOnInit(): void {
    this.appcode = localStorage.getItem('appcode')
    this.displayedColumns = ['claimNo', 'policy', 'dateOfEvent', 'claimType', 'intimationDate', 'caseStatus', 'caseStage', 'intimatingBranch'];
    console.log(this.appcode)
    this.commonService.getCommonGroupService().subscribe((res: any) => {
      if (this.appcode == "AP") {
        this.data = res['APPROVAL_TSK']
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];

    })
  }

  redirect(element) {
    if (this.appcode == 'AP') {
      this.allCommonService.setTaskCode(element.tskCode);
      this.allCommonService.setClaimsDetailId(element.claimsDetailId);
      this.allCommonService.setCRClaimData(element.policyId);
      this.allCommonService.setTtskInstncId(element.ttskInstncId);
      this.allCommonService.setTskBpmId(element.tskBpmId);
      this.allCommonService.setClientId(element.clientId);
      this.allCommonService.setElementData(element.claimTypeCd);
      this.allCommonService.setclaimStatus(element.claimStatusDesc);
      this.allCommonService.setproductCode(element.productCode);
      this.allCommonService.setpolicyStatusAtDoe(element.policyStatusAtDoe)
      this.allCommonService.setClaimDurationAP(element.claimDuration)
      this.allCommonService.setTrackClaim(false);
      this.allCommonService.setclaimNo(element.claimNo);
      this.allCommonService.setRequirementClsdDt(element.requirementClsdDt)
      this.allCommonService.setPolicyTypeUlipYN(element.ulipYn)
      this.router.navigate(['/claims-approval/nominee-details'])

      this.roleDetailsService.fetchsimultaneousPolicy().subscribe((res: any) => {
        this.data = res;
        if (this.data.status == 'SUCCESS' || this.data.status == 'success') {
          this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
          this.router.navigate(['/claims-approval/nominee-details'])
        } else {
        }
      })
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
