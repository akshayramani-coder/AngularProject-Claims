import { Component, EventEmitter, OnInit, Output , Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav }  from  '@angular/material/sidenav'
import { Router } from '@angular/router';
import { EventClaimDialogComponent } from 'src/app/common/model/event-claim-dialog/event-claim-dialog.component';
import { NotificationComponent } from 'src/app/common/notification/notification/notification.component';
import { LoginService } from 'src/app/common/services/login.service';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFiller = false;
  loginId = '';
  dispName:any;
  notification:any
  @Input() inputSideNav!:  MatSidenav
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor( private loginService: LoginService,
    private allCommonService:AllCommonService,
    public dialog: MatDialog,
    private router:Router) { }

  ngOnInit(): void {
    let userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}')
    this.loginId = userDetails.loginId
    this.dispName = userDetails.dispName
    // var abc= this.allCommonService.getNotification();
    // console.log(abc)
    setInterval(() => {
      this.notificationCount();
      }, 1000);
    
  }
  logout() {
    this.loginService.logout();    
    localStorage.removeItem('appcode');
    localStorage.removeItem('ClaimDetails');
    localStorage.removeItem('eventDetails');
    // localStorage.removeItem('allTabCIData');
    localStorage.removeItem('validationResponse');
    localStorage.removeItem('nomineeDetails');
    localStorage.removeItem('savedNomineeData');
    localStorage.removeItem('breCall');
    localStorage.clear();

  }
  
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  notificationCount(){
    var notification = sessionStorage.getItem('notificationCount');
    // console.log("Notification Count",notification)
    // this.notification=notification

    // var notification = this.allCommonService.getNotification();
    this.notification=notification
  }

  popNotification(){
    const dialogRef=this.dialog.open(NotificationComponent,{
      width: '30%',
      height: '600px',
      
    })
  }
  

}