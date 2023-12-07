import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimAssessorRoutingModule } from './claim-assessor-routing.module';
import { AssessorDashboardComponent } from './component/assessor-dashboard/assessor-dashboard.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AssessorDashboardComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ClaimAssessorRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ClaimAssessorModule { }
