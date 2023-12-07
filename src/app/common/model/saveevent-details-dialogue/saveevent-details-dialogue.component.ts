import { Component, Inject, OnInit } from '@angular/core';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { PolicyService } from 'src/app/views/registration/services/common-service/policy.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DocumentRaisedService } from '../../../views/registration/services/document upload services/document-raised.service'

@Component({
  selector: 'app-saveevent-details-dialogue',
  templateUrl: './saveevent-details-dialogue.component.html',
  styleUrls: ['./saveevent-details-dialogue.component.scss']
})
export class SaveeventDetailsDialogueComponent implements OnInit {
  appCode: any
  claimsDetailId:any
  response:any
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,
  private allCommonService:AllCommonService,
  private documentraisedservice: DocumentRaisedService,) { }

  ngOnInit(): void {
    // this.data=this.data[0];
    // this.data = this.data.Response;
    console.log(this.data)
    this.claimsDetailId = this.allCommonService.getClaimsDetailId();
    this.raisedRequirements();
    // this.getClaimDetails();
  }
  raisedRequirements(){
    this.documentraisedservice.fetchRaisedRequirements(this.claimsDetailId).subscribe((res:any) =>{
      console.log(res)
      this.response = res;
      this.allCommonService.setRaisedRequirements(res)
      this.allCommonService.passValueRaised(this.response);
    })
  }

}


