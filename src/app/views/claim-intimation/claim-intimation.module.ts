import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { RegistrationModule } from '../registration/registration.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClaimIntimationRoutingModule } from './claim-intimation-routing.module';
import { DashboardComponent } from './comoponent/dashboard/dashboard.component';
import { ClaimDashboardComponent } from './comoponent/claim-dashboard/claim-dashboard.component';
@NgModule({
  declarations: [
    DashboardComponent,
    ClaimDashboardComponent,

  ],
  imports: [
    CommonModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule,
    // RegistrationModule,
    ClaimIntimationRoutingModule
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClaimIntimationModule { }
