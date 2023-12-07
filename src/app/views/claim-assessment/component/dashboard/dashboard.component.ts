import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/views/claim-assessment/services/common.service';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { RoleDetailsService } from 'src/app/views/registration/services/common-service/role-details.service';
import { MatDialogService } from 'src/app/views/registration/services/mat-service/mat-dialog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  submitted: Boolean = false;
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  appcode: any;
  myWorkList: any;
  data: any;

  constructor(
    private commonService: CommonService,
    private router: Router,
    private allCommonService: AllCommonService,
    private matDialogService: MatDialogService,
    private roleDetailsService: RoleDetailsService) {

  }

  ngOnInit(): void {
    this.appcode = localStorage.getItem('appcode')
    this.displayedColumns = ['Claim No', 'Policy', 'Date Of Event', 'Claim Type', 'Intimation Date', 'Case Status', 'Case Stage', 'Intimating Branch'];
    this.commonService.getCommonGroupService().subscribe((res: any) => {
      if (this.appcode == "AS") {
        this.data = res['ASSESSMENT_TSK' || 'AWAIT_ASSESSMENT_REQ']
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];

    })
  }

  redirect(element) {
    if (this.appcode == 'AS') {
      this.allCommonService.setTaskCode(element.tskCode);
      this.allCommonService.setClaimsDetailId(element.claimsDetailId);
      this.allCommonService.setCRClaimData(element.policyId);
      this.allCommonService.setTtskInstncId(element.ttskInstncId);
      this.allCommonService.setTskBpmId(element.tskBpmId);
      this.allCommonService.setClientId(element.clientId);
      this.allCommonService.setclaimStatus(element.claimStatusDesc);
      this.allCommonService.setproductCode(element.productCode);
      this.allCommonService.setpolicyStatusAtDoe(element.policyStatusAtDoe)
      this.allCommonService.setTrackClaim(false);
      this.allCommonService.setElementData(element.claimTypeCd);
      this.allCommonService.setclaimNo(element.claimNo);
      this.allCommonService.setClaimDurationAS(element.claimDuration);
      this.allCommonService.setIntimationBranchSource(element.intimationSource)
      this.allCommonService.setPolicyTypeUlipYN(element.ulipYn)
      localStorage.removeItem('regSave');
      this.router.navigate(['/claims-assessment/nominee-details'])

      this.roleDetailsService.fetchsimultaneousPolicy().subscribe((res: any) => {
        this.data = res;
        if (this.data.status == 'SUCCESS' || this.data.status == 'success') {
          this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
          this.router.navigate(['/claims-assessment/nominee-details'])
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
