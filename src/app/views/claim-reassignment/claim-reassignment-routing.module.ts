import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../claim-reassignment/component/dashboard/dashboard.component';
import { ReassignmentDashboardComponent } from './component/reassignment-dashboard/reassignment-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: ReassignmentDashboardComponent,
    data: {
      title: 'claimDashboard'
    },
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: 'home'
        },
      },]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimReassignmentRoutingModule { }
