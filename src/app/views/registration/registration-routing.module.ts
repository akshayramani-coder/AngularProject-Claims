import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClaimEventDetailsComponent } from './claim-event-details/claim-event-details.component';
import { ClaimListComponent } from './claim-list/claim-list.component';
import { ClaimProfileDetailsComponent } from './claim-profile-details/claim-profile-details.component';
import { HomeComponent } from './home/home.component';
import { NewClaimIntimationComponent } from './new-claim-intimation/new-claim-intimation.component';
import { SearchIntimationComponent } from './search-intimation/search-intimation.component';
import { AllProfileDetailsComponent } from './profile-details/all-profile-details/all-profile-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AcknowledgmentsComponent } from './profile-details/acknowledgments/acknowledgments.component';
import { SearchTrackClaimComponent } from './search-track-claim/search-track-claim.component';
import { TrackClaimComponent } from './track-claim/track-claim.component';
import { TrackClaimListComponent } from './track-claim-list/track-claim-list.component';
const routes: Routes = [
    {  
      path: '',
      component: DashboardComponent ,
      data: {
        title: 'dashboard'
      },
      children: [
        {
          path: '',
          component: HomeComponent,
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
        {
          path: 'claim-acknowledgment',
          component: AcknowledgmentsComponent,
          data: {
            title: 'claim-acknowledgment'
          },
  
        },

        {
          path:'track-claim-list',
          component:SearchTrackClaimComponent,
          data:{
            title:'track-claim-list'
          }
        },
        {
          path:'get-track-claim-list',
          component:TrackClaimListComponent,
          data:{
            title:'get-track-claim-list'
          }
        },

  
      ]
    }
  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RegistrationRoutingModule { }
  