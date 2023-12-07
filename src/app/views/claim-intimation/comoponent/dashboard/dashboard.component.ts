import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogService } from 'src/app/views/registration/services/mat-service/mat-dialog.service';
import { CommonService } from '../../services/common.service';
import { MatSort, } from "@angular/material/sort";
import { MatPaginator, } from "@angular/material/paginator";
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { RoleDetailsService } from 'src/app/views/registration/services/common-service/role-details.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  searchFormGroup!: FormGroup;
  submitted: Boolean = false;
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();

  constructor(
    private fb: FormBuilder,
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

    this.commonService.getCommonGroupService().subscribe((res: any) => {
      if (this.appcode == "CR") {
        this.data = res['REG_TSK']
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];

    })
  }
  assign() {
    this.commonService.getAllWorkQueue().subscribe((res: any) => {
      if (this.appcode == "CR") {
        this.data = res['REG_TSK']
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];
    })
  }
  refresh() {
    this.commonService.getCommonGroupService().subscribe((res: any) => {
      if (this.appcode == "CR") {
        this.data = res['REG_TSK']
      }
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort.toArray()[0];

    })
  }

  redirect(element) {
    if (this.appcode !== 'CI') { // CR TO NOT CI
      localStorage.removeItem('regSave');
      localStorage.removeItem('docStatus');
      this.allCommonService.setClaimsDetailId(element.claimsDetailId);
      this.allCommonService.setCRClaimData(element.policyId);
      this.allCommonService.setTtskInstncId(element.ttskInstncId);
      this.allCommonService.setTskBpmId(element.tskBpmId);
      this.allCommonService.setClientId(element.clientId);
      this.allCommonService.setElementData(element.claimTypeCd);
      this.allCommonService.setclaimStatus(element.claimStatusDesc);
      this.allCommonService.setproductCode(element.productCode);
      this.allCommonService.setpolicyStatusAtDoe(element.policyStatusAtDoe);
      this.allCommonService.setTrackClaim(false);
      this.allCommonService.setclaimNo(element.claimNo);
      this.allCommonService.setClaimDuration(element.claimDuration);
      this.allCommonService.setIntimationBranchSource(element.intimationSource)
      this.allCommonService.setPolicyTypeUlipYN(element.ulipYn)
      this.router.navigate(['/claims-registration/nominee-details'])
      this.roleDetailsService.fetchsimultaneousPolicy().subscribe((res: any) => {
        this.data = res;
        if (this.data.status == 'SUCCESS' || this.data.status == 'success') {
          this.matDialogService.openCommonDialog(this.data['errorMessages'].toString())
          this.router.navigate(['/claims-registration/nominee-details'])

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
