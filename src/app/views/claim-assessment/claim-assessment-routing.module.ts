import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimEventDetailsComponent } from '../registration/claim-event-details/claim-event-details.component';
import { ClaimListComponent } from '../registration/claim-list/claim-list.component';
import { ClaimProfileDetailsComponent } from '../registration/claim-profile-details/claim-profile-details.component';
import { NewClaimIntimationComponent } from '../registration/new-claim-intimation/new-claim-intimation.component';
import { AllProfileDetailsComponent } from '../registration/profile-details/all-profile-details/all-profile-details.component';
import { SearchIntimationComponent } from '../registration/search-intimation/search-intimation.component';
import { TrackClaimComponent } from '../registration/track-claim/track-claim.component';
import { AssessmentDashboardComponent } from './component/assessment-dashboard/assessment-dashboard.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

const routes: Routes = [
  {  
    path: '',
    component: AssessmentDashboardComponent ,
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
      },
      {
        path: 'new-claim-intimation',
        component: NewClaimIntimationComponent,
        data: {
          title: 'new-claim-intimation'
        },
      },
      {
        path: 'track-claim',
        component: TrackClaimComponent,
        data: {
          title: 'track-claim'
        },
      },
    
      {
        path: 'search-intimation',
        component: SearchIntimationComponent,
        data: {
          title: 'search-intimation'
        },
      },
      {
        path: 'claim-list',
        component: ClaimListComponent,
        data: {
          title: 'claim-list'
        },
      },
      {
        path: 'claim-details',
        component: ClaimEventDetailsComponent,
        data: {
          title: 'claim-details'
        },

      },
      {
        path: 'claim-profile',
        component: ClaimProfileDetailsComponent,
        data: {
          title: 'claim-profile'
        },

      },
      {
        path: 'nominee-details',
        component: AllProfileDetailsComponent,
        data: {
          title: 'nominee-details'
        },

      },
      

    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimAssessmentRoutingModule { }
