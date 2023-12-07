import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuditHistoryService } from 'src/app/views/claim-assessment/services/audit-history.service';
import { AllCommonService } from '../../services/common-service/all-common.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {
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
    this.allCommonService.getCRClaimData();
    console.log(this.allCommonService.getCRClaimData())
    this.displayedColumns = [ 'tranno', 'chdrnum', 'trdt', 'ptrneff', 'codeStatz','description' ];
    this.transactionHistory();
   
  }
 
  transactionHistory(){
    
    // this.audithistoryService.getTransactionHistory('02176056').subscribe((res:any)=>{
      this.audithistoryService.getTransactionHistory(this.allCommonService.getCRClaimData()).subscribe((res:any)=>{
     if(res){
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator.toArray()[0];
      this.dataSource.sort = this.sort;
      console.log(res);
     }
    })     

  }



}