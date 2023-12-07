import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimAssessmentRoutingModule } from './claim-assessment-routing.module';
import { AssessmentDashboardComponent } from './component/assessment-dashboard/assessment-dashboard.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';


@NgModule({
  declarations: [
    AssessmentDashboardComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ClaimAssessmentRoutingModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ClaimAssessmentModule { }

