import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';

import { MatSort, } from "@angular/material/sort";
import { MatPaginator, } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.scss']
})
export class ClaimListComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  policyNo: any;
  multiplePolicies: any;
  clientID: any;
  multipleClients: any;
  claimList:any;

  constructor(private router: Router, private intimationService: IntimationService) { }

  ngOnInit(): void {

    this.displayedColumns = ['claimAck', 'policy', 'nameOfInsured', 'ownerName', 'dateOfEvent', 'claimType', 'intimationDate', 'claimStatus', 'intimatingBranch', 'case'];
    this.clients();

  }
  getPolicy() {
    this.router.navigate(['/claims-intimation/claim-list']);
  }
  claimId: any;
  oktoProceed() {
    this.claimId = this.intimationService.getClaimList()
    this.intimationService.setClientId(this.claimId)
    this.router.navigate(['/claims-intimation/claim-details']);
  }
  cancel() {
    this.router.navigate(['/claims-intimation/new-claim-intimation']);
  }
  redirect(clientId) {
    this.intimationService.setClientId(clientId)
    this.router.navigate(['/claims-intimation/claim-details']);
  }
  clients() {
    console.log(this.clientID)
    this.clientID = this.intimationService.getClientId();
    this.dataSource = new MatTableDataSource(this.clientID);
    this.claimList= this.clientID
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
}


