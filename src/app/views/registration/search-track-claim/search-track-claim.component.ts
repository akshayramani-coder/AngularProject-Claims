import { Component, OnInit, ViewChild, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PolicyService } from '../services/common-service/policy.service';
import { IntimationService } from '../services/common-service/intimation.service';
import { MatDialogService } from '../services/mat-service/mat-dialog.service';
import { MatSort, } from "@angular/material/sort";
import { MatPaginator, } from "@angular/material/paginator";
import { MatTableDataSource } from '@angular/material/table';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { CommonService } from '../../claim-intimation/services/common.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-track-claim',
  templateUrl: './search-track-claim.component.html',
  styleUrls: ['./search-track-claim.component.scss']
})
export class SearchTrackClaimComponent implements OnInit {
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  policyNo: any;
  multiplePolicies: any;
  selectclientId: String = "";
  clientID: any;
  multipleClients: any;
  visible:boolean=false
  claimList: any;
  myForm: any;
  clientId: any;
  appcode: any;

  currentDate: any = new Date();
  startingdate1: any = new Date(this.currentDate.setDate(this.currentDate.getDate()));
  startingdate2: any = new Date(this.currentDate.setDate(this.currentDate.getDate() - 30));
  

  minDate: any;
  minDateToFinish = new Subject<string>();
  constructor(private router: Router, private intimationService: IntimationService,
    private commonService: CommonService,
    
    private route: ActivatedRoute,
    private allCommonService: AllCommonService,
    private matDialogService: MatDialogService
    ) { }


  ngOnInit(): void {

    this.appcode = localStorage.getItem('appcode')
    this.displayedColumns = ['claimAck', 'policy', 'nameOfInsured', 'ownerName', 'dateOfEvent', 'claimType', 'intimationDate', 'claimStatus', 'intimatingBranch', 'case'];
    this.clients();
    this.policies();

  }
  getPolicy() {
    this.router.navigate(['/claims-intimation/claim-list']);
  }
  claimId: any;
  oktoProceed() {
    this.claimId = this.intimationService.getClaimList()
    this.intimationService.setClientId(this.claimId)
    this.router.navigate(['/claims-intimation/nominee-details']);
  }
  cancel() {
    this.router.navigate(['/claims-intimation/new-claim-intimation']);
  }
  // redirect(clientId) {
  //   this.intimationService.setClientId(clientId)

  //   this.router.navigate(['/claims-intimation/nominee-details']);



  // }
  redirect(element) {
      // localStorage.setItem("appcode", "AS");
      // this.allCommonService.setClaimsDetailId(element.claimsDetailId);
      // this.allCommonService.setCRClaimData(element.policyId);
      // this.allCommonService.setTtskInstncId(element.ttskInstncId);
      // this.allCommonService.setTskBpmId(element.tskBpmId);
      // this.allCommonService.setclaimStatus(element.claimStatusDesc);
      // this.allCommonService.setproductCode(element.productCode);
      // this.allCommonService.setpolicyStatusAtDoe(element.policyStatusAtDoe);
      // this.allCommonService.setTrackClaim(true);
      // this.allCommonService.setclaimStatus(element.claimStatusDesc);
      // this.allCommonService.setproductCode(element.productCode);
      // this.allCommonService.setclaimNo(element.claimNo);

      localStorage.setItem("appcode", "AS");
      this.allCommonService.setClaimsDetailId(element.claimsDetailId);
      this.allCommonService.setCRClaimData(element.policyId);
      this.allCommonService.setTtskInstncId(element.ttskInstncId);
      this.allCommonService.setTskBpmId(element.tskBpmId);
      this.allCommonService.setClientId(element.clientId);
      this.allCommonService.setElementData(element.claimTypeCd);
      this.allCommonService.setclaimStatus(element.claimStatusDesc);
      this.allCommonService.setproductCode(element.productCode);
      this.allCommonService.setpolicyStatusAtDoe(element.policyStatusAtDoe);
      this.allCommonService.setClaimDurationCI(element.claimDuration)
      this.allCommonService.setTrackClaim(true);
      this.allCommonService.setclaimNo(element.claimNo);
      this.router.navigate(['/claims-registration/nominee-details']);

    
  }

  claimTask(claimsDetailId, tskBpmId, tskId) {

    if (this.appcode == 'CI') {
      this.commonService.claimTask(tskBpmId)
        .subscribe((


          res: any) => {

          if (res.status == "SUCCESS") {
            this.allCommonService.setClaimsDetailId(claimsDetailId.claimsDetailId);
            this.allCommonService.setCRClaimData(claimsDetailId.policyId);
            this.router.navigate(['/claims-intimation/nominee-details']);
          }
          
        }, (error) => {                              
          console.error('error caught in component' ,error)
          

        });



    }
  }

  getList(){
    if (this.selectclientId) {
      var clientId = this.selectclientId;
      console.log('clientId ::' + clientId);
      this.intimationService.setClientId(clientId)
    }
    else {
      this.matDialogService.openAlertDialog('Plese Select client ID')
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
  }

  clients() {
    this.clientID = this.intimationService.getClientId();
    this.dataSource = new MatTableDataSource(this.clientID);
    this.claimList = this.clientID
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }
  
  policies() {
    this.policyNo = this.intimationService.getPolicyno()
    this.multiplePolicies = this.policyNo
    console.log("DATA is...",this.multiplePolicies)

  }

}
