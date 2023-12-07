import { Component, OnInit } from '@angular/core';
// import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
// import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { UserService } from '../../common/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from '../core/snackbar.service';
import { CommonService } from '../claim-intimation/services/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userPrivilege: any;
  appForView = [];
  loading = false;
  countPO = ''
  constructor(private userService: UserService, private route: Router, private snackBar: SnackbarService, private commonService:CommonService) {

  }
  ngOnInit() {
    this.commonService.getRefreshWorkQueue().subscribe((res)=>{
      
    })
    this.userPrivilege = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log(this.userPrivilege)
    if (this.userPrivilege.application.length < 2) {
      let route = this.userPrivilege.application[0].appCode 
      this.onClick(route); 
    }
    else {
      let content = 'Direct dashboard Avoided due to multiple Application assigned to user'
      let action = 'close'
      // this.snackBar.info(content, action)
    }
  }

  onClick(data: any) {
    this.loading = true
    if (data) {
      switch (data) {
        case 'CI': {
          this.route.navigate(['/claims-intimation/']);
          this.userService.setAppDetails(data)
          localStorage.setItem('appcode', data)
          break;
        }
        case 'CR': {
          this.route.navigate(['/claims-registration/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }
        case 'AS': {
          this.route.navigate(['/claims-assessment/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }
        case 'AP': {
          this.route.navigate(['/claims-approval/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }
        case 'PO': {
          this.route.navigate(['/claims-payout/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }

      }

    }
  }
}
