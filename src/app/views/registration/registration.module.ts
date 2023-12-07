import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AssuredDetailsComponent } from './assured-details/assured-details.component';
import { ClaimEventDetailsComponent } from './claim-event-details/claim-event-details.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimProfileDetailsComponent } from './claim-profile-details/claim-profile-details.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { LifeAssuredDetailsComponent } from './life-assured-details/life-assured-details.component';
import { SearchIntimationComponent } from './search-intimation/search-intimation.component';
import { AllProfileDetailsComponent } from './profile-details/all-profile-details/all-profile-details.component';
import { DocUploadComponent } from './profile-details/doc-upload/doc-upload.component';
import { NomineeAndBankDetailsComponent } from './profile-details/nominee-and-bank-details/nominee-and-bank-details.component';
import { PolicyDetailsComponent } from './profile-details/policy-details/policy-details.component';
import { RoleDetailsComponent } from './profile-details/role-details/role-details.component';
import { ConfirmPopupComponent } from './common-popup/confirm-popup/confirm-popup.component';
import { HomeComponent } from './home/home.component';
import { NewClaimIntimationComponent } from './new-claim-intimation/new-claim-intimation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationRoutingModule } from './registration-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component'
import { HttpClientModule } from '@angular/common/http';
import { CommonAlertComponent } from './common-popup/common-alert/common-alert.component';
import { RemarkComponent } from './profile-details/remark/remark.component';
import { EventClaimDialogComponent } from 'src/app/common/model/event-claim-dialog/event-claim-dialog.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { DateFormat1830Pipe } from './pipe/date-format-utc-1830';
import { DateFormatUTCPipe } from './pipe/date-format-utc.pipe';
import { AcknowledgmentsComponent } from './profile-details/acknowledgments/acknowledgments.component';
import { DocumentCreateRequestComponent } from './profile-details/document-create-requeast/document-create-request/document-create-request.component';
import { AuditHistoryComponent } from './profile-details/audit-history/audit-history.component';
import { BenefitComponent } from './profile-details/benefit/benefit.component';
import { CorrespondenceComponent } from './profile-details/correspondence/correspondence.component';
import { CpsComponent } from './profile-details/cps/cps.component';
import { DecisionComponent } from './profile-details/decision/decision.component';
import { TransactionHistoryComponent } from './profile-details/transaction-history/transaction-history.component';
import { SearchTrackClaimComponent } from './search-track-claim/search-track-claim.component';
import { TrackClaimComponent } from './track-claim/track-claim.component';
import { PayoutDetailsComponent } from './profile-details/payout-details/payout-details.component';
import { IibComponent } from './profile-details/iib/iib.component';
import { CheckListComponent } from './check-list/check-list.component';
import { ReferralComponent } from './profile-details/referral/referral.component';
import { TrackClaimListComponent } from './track-claim-list/track-claim-list.component';
import { ViewDocumentComponent } from './profile-details/view-document/view-document.component';
import { ImageViewerModule } from 'ngx-image-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
@NgModule({
  declarations: [
    AssuredDetailsComponent,
    ClaimEventDetailsComponent,
    ClaimListComponent,
    ClaimProfileDetailsComponent,
    DocumentUploadComponent,
    LifeAssuredDetailsComponent,
    SearchIntimationComponent,
    AllProfileDetailsComponent,
    DocUploadComponent,
    NomineeAndBankDetailsComponent,
    PolicyDetailsComponent,
    RoleDetailsComponent,
    ConfirmPopupComponent,
    HomeComponent,
    NewClaimIntimationComponent,
    DashboardComponent,
    CommonAlertComponent,
    RemarkComponent,
    RemarkComponent,
    EventClaimDialogComponent,
    DateFormatPipe,
    DateFormat1830Pipe,
    DateFormatUTCPipe,
    AcknowledgmentsComponent,
    DocumentCreateRequestComponent,
    AuditHistoryComponent,
    BenefitComponent,
    CorrespondenceComponent,
    CpsComponent,
    DecisionComponent,
    TransactionHistoryComponent,
    SearchTrackClaimComponent,
    TrackClaimComponent,
    PayoutDetailsComponent,
    IibComponent,
    CheckListComponent,
    ReferralComponent,
    TrackClaimListComponent,
    ViewDocumentComponent
    
  ],
  imports: [
    CommonModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    HttpClientModule,
    ImageViewerModule,
    NgxDocViewerModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RegistrationModule { }
