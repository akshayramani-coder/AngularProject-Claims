import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimPayoutRoutingModule } from './claim-payout-routing.module';
import { PayoutDashboardComponent } from './component/payout-dashboard/payout-dashboard.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from '../materials/materials.module';


@NgModule({
  declarations: [
    PayoutDashboardComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ClaimPayoutRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ClaimPayoutModule { }
