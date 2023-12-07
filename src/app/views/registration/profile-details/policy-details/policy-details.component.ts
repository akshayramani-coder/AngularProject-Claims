import { Component, OnInit } from '@angular/core';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { PolicyService } from '../../services/common-service/policy.service';
import { RoleDetailsService } from '../../services/common-service/role-details.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.scss']
})
export class PolicyDetailsComponent implements OnInit {
  policyData: any;
  appCode: any;
  policyNo: any;
  fundData:any;
  policy:any;
  riderData:any;
  riderDetails:any;
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  constructor(private policydetailsService: RoleDetailsService, private policyService: PolicyService, private allCommonService: AllCommonService) { }

  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode');
    // localStorage.removeItem('allTabCIData');
    this.policydetails();
    this.displayedColumns = ['RiderName', 'RiderCode', 'RiderStatus', 'SumAssured', 'PolicyTerm', 'TotalPremium'];
  }
  

  policydetails(){

    this.allCommonService.stringSubject.subscribe(data => {
      console.log('next subscribed value: ' + data);
      var tabData = data;
      this.policyData={}
      this.riderDetails=[]
      console.log("tabData is:::", tabData);
      var policyDetails = tabData.policyDetails;
      // this.policyData = data;
     
      for (let data of policyDetails) {
        if(data.isrider=='N'){
          this.policyData = data;
        }
        
        if(data.isrider=='Y'){
        
         this.dataSource = new MatTableDataSource(this.riderDetails)
          this.riderDetails.push(data)
        }
      }
      

      // for (let data of policyDetails) {
      //   if(data.isrider=='Y'){
      //     this.riderData=data
      //   }
      // }


      var  fundDetails=tabData.fundDetails;
          this.fundData = fundDetails;
     
    }
  );
  }

  onCancelButton() {
    this.allCommonService.onCancelButton(); 
  }


 
}
