import { Component, OnInit,OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllCommonService } from '../../services/common-service/all-common.service';
import { MatDialogService } from '../../services/mat-service/mat-dialog.service';

@Component({
  selector: 'app-correspondence',
  templateUrl: './correspondence.component.html',
  styleUrls: ['./correspondence.component.scss']
})
export class CorrespondenceComponent implements OnInit,OnDestroy {

  letterDict={
    
    "CLAIMS_REQUIREMENT_LETTER_RIDER_CI_DISABILITY": "fetchclaimsreqletterridercidisability",
    "CLAIMS_REQUIREMENT_LETTER": "fetchclaimsrequirementletter",
    "DEATH_BEFORE_RCD": "fetchdeathbeforercd",
    "DEFINITION_NOT_SATISFIED_CI": "fetchdefinitionnotsatisfiedci",
    "DEFINITION_NOT_SATISFIED_RIDER_DISABILITY": "fetchdefinitionnotsatisfiedriderdisability",
    "LAPSED_WITH_PAYLETTER": "fetchlapsedwithpayletter",
    "LAPSED_WITHOUT_PAYLETTER": "fetchlapsedwithoutpayletter" ,
    "NDA_LETTER": "fetchndaletter",
    "PAYMENT_LETTER_NON_ULIP_INFORCE": "fetchpaymentletternonulipinforce",
    "PAYMENT_LETTER_RIDER_CI_DISABILITY": "fetchpaymentletterrider",
    "PAYMENT_LETTER_REDUCED_PAID_UP": "fetchpaymentletterrpu",
    "PAYMENT_LETTER_ULIP": "fetchpaymentletterulip",
    "PAYMENT_LETTER_NON_ULIP_GRACE_PERIOD": "fetchpaymentnonulipgraceperiod",
    "REJECTION_LETTER_ILLNESS__NOT_CVRD_UNDER_CI": "fetchrejectionletterillnessnotcvrdunderci",
    "REPUDIATION_LTR_MED_NON_DISC": "fetchrepudiationlettermedical",
    "REPUDIATION_LTR_PREV_INSR_NON_DISC": "fetchrepudiationletterpreviousinsurance",
    "SUICIDE_LETTER": "fetchsuicideletter",
    "WAITING_PERIOD_CI": "fetchwaitingperiodci",
    "WAITING_PERIOD_DISABILITY": "fetchwaitingperioddisability"
}
  trackClaim:boolean=false
  constructor(private fb:FormBuilder,
    private allCommonService:AllCommonService,private matDialogService: MatDialogService) { 
      // this.allCommonService.decisionSubject.subscribe(res => {
      //   this.decision = res
      //   console.log(res)
      // }
      // )
    }
  myForm!: FormGroup;
  submitted:boolean=false;
  decision:any
  correspondanceCodeArray:{ correspondenceCode: string; correspondenceName: string; } [] = []
  numOfLetters = 23
  appCode:string = " "
  claimDetailId:string = ""
  showLettersFlag!:Boolean;
 correspondanceCodes=['CLAIMS_REQ_LETTER_REMINDER','CLAIMS_REQ_LETTER_REMINDER_RIDER_CI_DISABILITY','CLAIMS_REQUIREMENT_LETTER','CLAIMS_REQUIREMENT_LETTER_RIDER_CI_DISABILITY','DEATH_BEFORE_RCD','DEFINITION_NOT_SATISFIED_CI','DEFINITION_NOT_SATISFIED_RIDER_DISABILITY','LAPSED_WITH_PAYLETTER','LAPSED_WITHOUT_PAYLETTER','NDA_LETTER','NDA_LETTER_REMINDER','NEFT_REJECTION_LETTER','NEFT_REJECTION_REMINDER','PAYMENT_LETTER_NON_ULIP_GRACE_PERIOD','PAYMENT_LETTER_NON_ULIP_INFORCE','PAYMENT_LETTER_REDUCED_PAID_UP','PAYMENT_LETTER_RIDER_CI_DISABILITY','PAYMENT_LETTER_ULIP','REJECTION_LETTER_ILLNESS__NOT_CVRD_UNDER_CI','REPUDIATION_LTR_MED_NON_DISC','REPUDIATION_LTR_PREV_INSR_NON_DISC','SUICIDE_LETTER','WAITING_PERIOD_CI','WAITING_PERIOD_DISABILITY','WOP_LETTER']
  ngOnInit(): void {
  this.trackClaim=this.allCommonService.getTrackClaim();
  this.appCode = localStorage.getItem('appcode') || ''
  this.claimDetailId = this.allCommonService.getClaimsDetailId()
  console.log(this.appCode)
  this.correspondanceCodeArray = []
  //Calling Api For for 
  this.allCommonService.correspondenceshowLetters(this.claimDetailId).subscribe((res:any)=>{
      if(res.status == 'SUCCESS'){
        this.showLettersFlag =true
        
        res.objList.forEach((element:any) => {
          if(this.correspondanceCodes.includes(element.correspondenceCode)){
          this.correspondanceCodeArray.push({"correspondenceCode" : element.correspondenceCode,
          "correspondenceName":element.correspondenceName})
        }
      });
      }
      else{
        this.showLettersFlag = false
      }
    }  
    )
 
  
  }

  previewAPI(correspondanceCode:string){
    console.log(correspondanceCode)
    console.log(this.claimDetailId)
    this.allCommonService.correspondencePreviewLetters(this.claimDetailId,this.letterDict[correspondanceCode]).subscribe(
      (res:any) =>{
        console.log(res)
        var file:any
       if(Array.isArray(res)){
          res.forEach((ele:any) =>{
            if(ele.IsSuccess == "true"){
            file  = new File([ele.EmailBody],`${ele.value}.pdf`,{type: 'application/pdf'})
            var fileURL = URL.createObjectURL(file);
            console.log(file)
            window.open(fileURL,'_blank')
            }
            else{
               this.matDialogService.openAlertDialog(ele.EmailBody.toString())
            }
          })
        } 
      })
      
 }

  ngOnDestroy(): void {
    //this.allCommonService.decisionSubject.unsubscribe()
    
  }

}
