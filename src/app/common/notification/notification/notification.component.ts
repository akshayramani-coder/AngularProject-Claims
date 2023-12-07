import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { mixinColor } from '@angular/material/core';
import { AllCommonService } from 'src/app/views/registration/services/common-service/all-common.service';
import { IntimationService } from 'src/app/views/registration/services/common-service/intimation.service';
import { SpinnerService } from '../../services/spinner/spinner.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  isreadNotification: any;
  dataOfY: any;
  dataOfN: any;
  displayedColumns!: string[];
  displayedColumns1!: string[];
  descriptionOpen: boolean = false;
  objList: any;
  notificationList: any
  notifications: any;
  count: any;
  payload: any
  indextoOpenRead = -1
  allNotification: any;


  constructor(private intimationService: IntimationService,
    private allCommonService:AllCommonService,
    private spinnerService: SpinnerService,
    ) { }

  ngOnInit(): void {
    this.getNotification()
    setInterval(() => {
    this.getNotification() 
    this.spinnerService.hide()
      }, 30000);
    
  }

  indextoOpen = -1
  // indextoOpenRead=-1;
  getNotification() {
    this.intimationService.getNotificationData().subscribe((res: any) => {
    
      this.isreadNotification = res
      console.log("Notification Data of y", this.isreadNotification.readNotification, "Notification Data of N", this.isreadNotification.unreadNotification);
      this.dataOfY = this.isreadNotification.readNotification;
      this.dataOfN = this.isreadNotification.unreadNotification;
      this.allNotification =this.isreadNotification.allNotification
      

      let sum = 0
      this.dataOfN.forEach(value => {
         sum = sum + value.objList.length;
      });
      console.log("Total count:",sum);
      this.count =sum
      console.log("TTTTTTTTTTTTTT:",this.count);
      //  this.allCommonService.setNotification(this.count);
      //  localStorage.setItem('notificationCount', this.count);
      sessionStorage.setItem('notificationCount', this.count);
    })
  }

  onNotify(i) {
    this.indextoOpen = i
 
  }

  onSubmit() {

  } 
 

  onsubmitNotification(data:any) {
    console.log("Not Readbale notifications",data)
    var payloadArray:any=[];
    
    for(let list of data.objList){
      payloadArray.push(list.ntfcnDtlId)
    }
    
    var payload={
      "id":payloadArray
    }
   this.intimationService.updateNotification(payload).subscribe((res:any)=>{
    
   })
  
  }

}
