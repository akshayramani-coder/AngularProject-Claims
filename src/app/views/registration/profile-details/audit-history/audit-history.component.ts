import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, } from "@angular/material/paginator";
import { AuditHistoryService } from 'src/app/views/claim-assessment/services/audit-history.service';
import { AllCommonService } from '../../services/common-service/all-common.service';

@Component({
  selector: 'app-audit-history',
  templateUrl: './audit-history.component.html',
  styleUrls: ['./audit-history.component.scss']
})
export class AuditHistoryComponent implements OnInit {
  displayedColumns!: string[];
  dataSource = new MatTableDataSource();
  audit: any;
  dialogRef: any;
  paginator: any;
  sort: any;
  
  constructor(
    private allCommonService:AllCommonService,
    private audithistoryService:AuditHistoryService
  ) { }

  ngOnInit(): void {

    this.displayedColumns = ['createdOn', 'user', 'subjectName', 'description', 'decisionName', ];
    this.auditHistory();
   
  }
 
  auditHistory(){
    
    this.audithistoryService.getauditHistory(this.allCommonService.getClaimsDetailId()).subscribe((res:any)=>{
     if(res){
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort;
      console.log(res);
     }
    })     

  }



}
