import { EmptyExpr } from '@angular/compiler';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { RoleDetailsService } from 'src/app/views/registration/services/common-service/role-details.service';
import { LookupService } from 'src/app/views/registration/services/lookup/lookup.service';
import { MatDialogService } from 'src/app/views/registration/services/mat-service/mat-dialog.service';
import { CommonService } from '../../../claim-assessor/services/common.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  taskCode!: string;
  appcode: any;
  userForm!: FormGroup;
  taskList: any;
  userList: any;
  task: any;
  user: any;
  userTask: any;
  dataSourcelength: any;
  reassignmntCasesArray: Array<Object> = new Array();
  case: any;
  fromUser: any;
  toUser: any;
  taskBpmID: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private matDialogService: MatDialogService,
    private router: Router,
    private tabDetailsService: RoleDetailsService,
  ) { }

  ngOnInit(): void {
    this.appcode = localStorage.getItem('appcode')
    this.displayedColumns = ['checkBox', 'claimNo', 'caseStatus', 'policy', 'dateOfEvent', 'claimType', 'intimationDate', 'claimStatus', 'intimatingBranch'];
    // console.log(this.appcode)
    this.getDropdowns();

    this.userForm = this.fb.group({
      tskCode: ['', Validators.required],
      fromUser: ['', Validators.required],
      toUser: ['', Validators.required],
    })
  }

  get userFormGroups(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }

  getDropdowns() {
    this.commonService.getDropdowns().subscribe((res: any) => {
      console.log(res);
      this.taskList = res.tskList
      this.userList = res.userList
      console.log('taskList', this.taskList, 'userList', this.userList,);
    })
  }

  onTaskChange(value) {
    // console.log('taskCode change', value);
    this.userTask = value;
    if (value) {
      this.user = this.userList[value];
    }
  }

  onFromUserChange(user) {
    // console.log(user, 'its Fromuser');
    this.fromUser = user;
    this.commonService.getUserWorkques(this.userTask, user).subscribe((res: any) => {
      // console.log(res, 'userWorkques');
      this.dataSource = new MatTableDataSource(res.myWork);
      this.dataSourcelength = res.myWork.length
      this.dataSource.paginator = this.paginator.toArray()[0];
    })
  }

  onToUserChange(user) {
    this.toUser = user;
    if (this.fromUser == this.toUser) {
      this.matDialogService.openAlertDialog('From User and To User should be different.');
    }

    // console.log(user, 'its Touser');
  }

  assign(value) {
    // console.log('form', this.userForm);
    // console.log('this is assign', value);
    // console.log('its cases', cases)
    this.userForm.markAllAsTouched();
    if (this.fromUser != this.toUser) {
      if (this.taskBpmID > 0 && this.userForm.valid) {
        var cases = {
          claimsDetailId: this.case.claimsDetailId,
          claimNo: this.case.claimNo,
          tskBpmId: this.case.tskBpmId,
          usrGrpName: "CLAIM_IND_ALL_USER",
          userDest: value.toUser,
          userSrc: value.fromUser,
          tskEntity: ""
        }
        this.reassignmntCasesArray.push(cases);
        // console.log('this.reAssignment cases', {
        //   "reassignmntCases": this.reassignmntCasesArray
        // });
        var payLoad = { "reassignmntCases": this.reassignmntCasesArray }
        console.log('payLoad', payLoad);

        this.commonService.assignCases(payLoad).subscribe((res: any) => {
          console.log(res)
          if (res.status == 'success' || res.status == 'SUCCESS') {
            this.matDialogService.openAlertDialog(res['statusMsg']);
          }
          else {
            this.matDialogService.openAlertDialog(res['statusMsg']);
          }
        }
        )
        this.userForm.reset();
        this.dataSource = new MatTableDataSource()
        this.userForm.markAsUntouched()
        this.userForm.updateValueAndValidity()
        this.reassignmntCasesArray = [];
        // console.log('taskBpmId taskBpmID', this.case);
        // console.log('its payLoad', payLoad);
      } else if (!this.taskBpmID) {
        this.matDialogService.openCommonDialog('kindly select case');
        console.log('kindly select case');
      }
    } else {
      this.matDialogService.openAlertDialog('From User and To User should be different.');
    }
  }

  onSelected(element) {
    console.log('i', 'element', element)
    this.taskBpmID = element.tskBpmId
    this.case = element
  }
}

