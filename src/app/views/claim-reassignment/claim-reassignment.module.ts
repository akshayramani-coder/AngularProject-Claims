import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimReassignmentRoutingModule } from './claim-reassignment-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ReassignmentDashboardComponent } from './component/reassignment-dashboard/reassignment-dashboard.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    ReassignmentDashboardComponent
  ],
  imports: [
    CommonModule,
    ClaimReassignmentRoutingModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class ClaimReassignmentModule { }
