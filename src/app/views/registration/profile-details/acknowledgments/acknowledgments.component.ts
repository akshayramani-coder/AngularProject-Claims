import { Component, OnInit } from '@angular/core';
import { AllCommonService } from '../../services/common-service/all-common.service';

@Component({
  selector: 'app-acknowledgments',
  templateUrl: './acknowledgments.component.html',
  styleUrls: ['./acknowledgments.component.scss']
})
export class AcknowledgmentsComponent implements OnInit {
  ackData:any;
  constructor(private allCommonService:AllCommonService) { }

  ngOnInit(): void {
    this.ackData = this.allCommonService.getImpsRes();
  
    console.log("ackData is:::",this.ackData);
  }

  claimType:string = ""
  date = ""
  time:any
  claimNumber = ""
  policyNumber = ""
  claimentName = []
  branchNameAndCode =""
  branchCode = ""
  documentList = []
 


  printDiv(data){
    this.allCommonService.toggleSideBar()
    this.claimType = data.claimType
    this.date  = data.intimationDate
    this.claimNumber = data.claimNo
    let timeSplit = data.intimationTime.split(':')
    this.time =new Date(10,2,2022,timeSplit[0],timeSplit[1])
    this.policyNumber = data.policyId
    this.branchNameAndCode = data.branchNameAndCode
    this.documentList = data.doclist
    this.claimentName=data.nomineeList.toString();
    setTimeout(()=>{
      // let innerHTML = printable.innerHTML
      // let height = window.screen.height
      // let width = window.screen.width
      // console.log(innerHTML)
      window.print()
    },
    1000)
    

    // var myWindow =  window.open("","Acknowladgement Slip",`width=${width},height=${height}`)
  }

}
