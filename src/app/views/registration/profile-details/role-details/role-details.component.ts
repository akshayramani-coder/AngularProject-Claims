import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter } from 'rxjs';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { RoleDetailsService } from '../../services/common-service/role-details.service';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.scss']
})
export class RoleDetailsComponent implements OnInit {
  roledata:any;
  clientDetails: any;
  appCode:any;
  DOB: any;
  eventdate: any;
  claimDetails: any;
  CIeventDate: any;
  CReventDetails: any;
  eventDateCI: any;
  constructor(private roledetailSer: RoleDetailsService, private allCommonService: AllCommonService) { }

  ngOnInit(): void {
    this.appCode = localStorage.getItem('appcode')
    this.roleDetails();
  }

  roleDetails() {
    this.allCommonService.stringSubject.subscribe(data => {
      var allTabData = data;
      this.roledata = allTabData.clientDetailsBase;
      console.log(' this.roledata', this.roledata);
      this.agecalculation();
    }
    );
  }
  onCancelButton() {
    this.allCommonService.onCancelButton();
  }
  agecalculation() {
    setTimeout(() => {
      this.claimDetails = JSON.parse(localStorage.getItem('ClaimDetails') || '{}');
      this.CReventDetails = localStorage.getItem('eventDate')

      this.eventdate = this.claimDetails.eventDate
      if (this.appCode == 'CI') {

        this.roledata.forEach(element => {
          if (element.clientRolwCode == "LF") {
            this.DOB = element.dateOfBirth
            if (this.DOB != null && this.DOB != undefined && this.eventdate != null && this.eventdate != undefined) {
              let m = moment(this.eventdate);
              let years = m.diff(this.DOB, 'years');
              m.add(-years, 'years');
              this.CIeventDate = `${years} years`;
              element.eventdate = this.CIeventDate;
            }
          }
        });
      }
      else if (this.appCode != 'CI') {
        this.CReventDetails = localStorage.getItem('eventDate')
        console.log('eventDAte', localStorage.getItem('eventDate'));
        const eventDateCI = new Date(this.CReventDetails);
        this.roledata.forEach(element => {
          if (element.clientRolwCode == "LF") {
            this.DOB = element.dateOfBirth
            if (this.DOB != null && this.DOB != undefined && eventDateCI != undefined && eventDateCI != null) {
              let m = moment(eventDateCI);
              let years = m.diff(this.DOB, 'years');
              m.add(-years, 'years');
              console.log('evYears', years)
              this.CIeventDate = `${years} years`;
              element.eventdate = this.CIeventDate;
            }
          }
        });
      }
    }, 1000);

  }
}