import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonService } from 'src/app/views/claim-assessor/services/common.service';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { RoleDetailsService } from '../../services/common-service/role-details.service';

interface CRClaim {
  "actvalue": number,
  "chdrnum": string,
  "shortds": string,
  "totalValue": number
}

@Component({
  selector: 'app-benefit',
  templateUrl: './benefit.component.html',
  styleUrls: ['./benefit.component.scss']
})
export class BenefitComponent implements OnInit,AfterViewInit{
  benefitDetails: boolean = true;
  payoutDetails: boolean = false;
  bankDetails: any = []
  trackClaim: boolean = false;
  isReadonly: any
  componentCode: string = ''
  productType: string = ''
  policyType: string = ""
  policyData: any;
  appCode: any;
  // showMessage:any = []
  // displayedColumns!: string[];

  displayedColumns: any[] = ['coverageDisp', 'actvalue', 'payable', 'decision', 'amountPayable'];
  dataSource: any;
  totalValue: any;
  CRClaimData !: CRClaim[]
  //policyData:any;
  deathBenifits: any;
  taskCode: any;
  claimTypeCd: any;
  productTypeBenefit: any
  claimDetailsId: any;
  response: any;
  shortds: any;
  constructor(private commonService: CommonService,
    private allCommonService: AllCommonService,
    private roleDetaileService: RoleDetailsService
  ) { }
  claimType:any
  ngOnInit(): void {
    this.payoutDetail();
    this.fetchBenefitDetails()
    this.appCode = localStorage.getItem("appcode")
    this.trackClaim = this.allCommonService.getTrackClaim();
    this.taskCode = this.allCommonService.getTaskCode();
    this.claimTypeCd = this.allCommonService.getElementData();
    this.claimDetailsId = this.allCommonService.getClaimsDetailId();

    if (this.trackClaim) {
      this.isReadonly = true
    }

  }
  ngOnDestroy():void{
this.allCommonService.setClaimAmount('')
  }
  ngAfterViewInit(): void {
    this.claimType = localStorage.getItem('claimTypeDisp');
  }
  benefit() {
    this.benefitDetails = true;
    this.payoutDetails = false;
  }
  payout() {
    this.payoutDetails = true;
    this.payoutDetail()
    this.benefitDetails = false;
  }
  fetchBenefitDetails() {
    const payload = {

      "policyId": this.allCommonService.getCRClaimData(),
      "claimType": this.allCommonService.getElementData(),
      "claimsDetailId": this.allCommonService.getClaimsDetailId(),
    }

    this.commonService.getClaimAmount(payload).subscribe((response: any) => {
      // this.commonService.getClaimAmount('02194252').subscribe((response: any) => {
      console.log(response);
      this.response=response
      this.shortds=response[0].shortds
      
        this.totalValue = response[0].totalValue;
      console.log('totalvalue is', this.totalValue)
      this.CRClaimData = response
      this.policydetails();
      this.dataSource = new MatTableDataSource(response);
      this.productTypeBenefit = response[0].productType

    if(this.totalValue=response[0].totalValue){
      this.allCommonService.setClaimAmount(this.totalValue);
    }else{
this.allCommonService.setClaimAmount('-')
    }
    });
  }
  payoutDetail() {
    this.claimType = localStorage.getItem('claimTypeDisp');
    this.appCode = localStorage.getItem("appcode")
    this.roleDetaileService.getNomineeDetails().subscribe((res: any) => {
      console.log('nomineeDetails ==>', res);
      if(this.appCode == "AS" || this.appCode == "AP" ){
        let bankDetailsofNominee = res
        // this.showMessage = []
        console.log(bankDetailsofNominee)
        let arr = new Array()
        for(let i = 0;i<bankDetailsofNominee.length;i++){

          if(bankDetailsofNominee[i].roleCode == "BN"){
            arr.push(bankDetailsofNominee[i])
          }
        }
        console.log(bankDetailsofNominee)
        console.log(arr)
        if(this.claimType == 'Death'){
        console.log("IN 131");
        this.bankDetails = arr
        }
        else{
          console.log("IN 135");
          this.bankDetails = res
        }
      }
      else {
        console.log("IN ELSE")
        if(this.claimType == 'Death'){
          console.log('IN DEATH')
        this.bankDetails = res.filter(x => x.aprvdPayoutYn === 'Y')
        }else{
          console.log('IN CI or DI')
          this.bankDetails = res
        }
      }

    })
  }

  updateAprooveYNService(nomineeDetailId,approveYn){
    console.log(nomineeDetailId)
    this.allCommonService.updateAprooveYN(nomineeDetailId,approveYn).subscribe(
      (res:any) => {
        if(res.status =="SUCCESS"){
          //Recalling the API  after update
          this.payoutDetail()
        }
      },
      (error) => {

      }
    )

  }

  policydetails() {
    // console.log("------------> IN POLICY ------->")
    var Data = JSON.parse(localStorage.getItem('allTabCIData') || '{}')
    //console.log(" -----------------> VIPUL        ------------->",Data)
    this.allCommonService.stringSubject.subscribe(data => {
      var tabData = data;
      var policyDetails = tabData.policyDetails;
      for (let policy of policyDetails) {
        if (policy.isrider == 'N') {
          // console.log(" policyBenefit ",policy)
          let componentCode = policy.componentCode
          this.policyType = policy.ulCategory
          this.productType = policy.ulLinkedYn

          // console.log(" componentCode ",componentCode);
          for (let claim of this.CRClaimData) {
            // console.log(" claim ",claim)
            if (claim.shortds == componentCode) {
              this.deathBenifits = claim.actvalue
              // console.log(" this.deathBenifits ",this.deathBenifits)
            }
          }
        }
      }
    })

  }

  onCancelButton(){
    this.allCommonService.onCancelButton();
  }
}