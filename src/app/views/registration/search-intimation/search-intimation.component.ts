import { Component, OnInit, ViewChild,  ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { MatSort, } from "@angular/material/sort";
import { MatPaginator, } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-search-intimation',
  templateUrl: './search-intimation.component.html',
  styleUrls: ['./search-intimation.component.scss']
})
export class SearchIntimationComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  // @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  // @ViewChildren(MatSort) sort = new QueryList<MatSort>();
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  multiplePolicies: any;
  policyNo: any;
  clientID: any;
  selectclientIds: any = [];
  selectclientId: String = "";
  visible: boolean = false
  claimList:any;
  constructor(private router: Router, private matDialogService: MatDialogService, private intimationService: IntimationService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.displayedColumns = ['claimAck', 'policy', 'nameOfInsured', 'ownerName', 'dateOfEvent', 'claimType', 'intimationDate', 'claimStatus', 'intimatingBranch', 'case'];

    this.policies();
  }
  getList() {
    if (this.selectclientId) {
      var clientId = this.selectclientId;
      console.log('clientId ::' + clientId);
      this.intimationService.setClientId(clientId)
    }
    else {
      this.matDialogService.openAlertDialog('Please Select client ID')
    }
    this.intimationService.getClientID(this.selectclientId).subscribe((res: any) => {
      if (res.status === "SUCCESS") {
        this.visible = true;
        this.dataSource = new MatTableDataSource(res.objList);
        this.claimList = res.objList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        localStorage.setItem("policyId",res.objList[0].policyId);
      }

    })

    // this.router.navigate(['/claims-intimation/claim-list']);
  }

  oktoProceed() {
    var clientId = this.selectclientId;
    this.intimationService.setClientId(clientId)
    this.router.navigate(['/claims-intimation/claim-details']);
  }
  cancel() {
    this.router.navigate(['/claims-intimation/new-claim-intimation']);
  }
  policies() {
    this.policyNo = this.intimationService.getPolicyno()
    this.multiplePolicies = this.policyNo

  }


}