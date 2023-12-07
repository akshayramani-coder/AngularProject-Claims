import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { P404Component } from './common/error/404.component';
import { P500Component } from './common/error/500.component';
import { LoginComponent } from './common/login/login.component';
import { MultiTabRestrictionComponent } from './common/multi-tab-restriction/multi-tab-restriction.component';
import { NotificationComponent } from './common/notification/notification/notification.component';
import { RegistorComponent } from './common/registor/registor.component';
import { AuthGaurdService } from './common/services/auth-gaurd.service';
import { CanDeactivateGaurdService } from './common/services/can-deactivate-gaurd.service';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { ClaimDashboardComponent } from './views/claim-intimation/comoponent/claim-dashboard/claim-dashboard.component';
import { ClaimReassignmentModule } from './views/claim-reassignment/claim-reassignment.module';
import { DashboardComponent } from './views/registration/dashboard/dashboard.component';
import { HomeComponent } from './views/registration/home/home.component';

export const routes: Routes = [
    {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full',
    },
    {
      path: '404',
      component: P404Component,
      data: {
        title: 'Page 404'
      }
    },
    {
      path: 'multiTab',
      canDeactivate: [CanDeactivateGaurdService],
      component: MultiTabRestrictionComponent,
      data: {
        title: 'Page multiTab',
        
      }
    },
    {
      path: '500',
      component: P500Component,
      data: {
        title: 'Page 500'
      }
    },
    {
      path: 'login',
      component: LoginComponent,
      data: {
        title: 'Login Page'
      }
    },
    {
      path: 'register',
      component: RegistorComponent,
      data: {
        title: 'Register Page'
      }
    },

    {
      path: '',
      component: DashboardComponent,
      data: {
        title: 'dashboard'
      },

      children: [
        {
          path: 'dashboard',
          loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
          canActivate: [AuthGaurdService]
        },
        {
          path: 'claims-registration',
          loadChildren: () => import('./views/claim-intimation/claim-intimation.module').then(m => m.ClaimIntimationModule),
          canActivate: [AuthGaurdService]
        },
      
        {
          path: 'claims-intimation',
          loadChildren: () => import('./views/registration/registration.module').then(m => m.RegistrationModule),
          canActivate: [AuthGaurdService]
        },
        
        {
          path: 'claims-assessment',
          loadChildren: () => import('./views/claim-assessment/claim-assessment.module').then(m => m.ClaimAssessmentModule),
          canActivate: [AuthGaurdService]
        },

        {
          path: 'claims-approval',
          loadChildren: () => import('./views/claim-assessor/claim-assessor.module').then(m => m.ClaimAssessorModule),
          canActivate: [AuthGaurdService]
        },

        {
          path: 'claims-payout',
          loadChildren: () => import('./views/claim-payout/claim-payout.module').then(m => m.ClaimPayoutModule),
          canActivate: [AuthGaurdService]
        },
        {
          path: 'claims-reassignment',
          loadChildren: () => import('./views/claim-reassignment/claim-reassignment.module').then(m => m.ClaimReassignmentModule),
          canActivate: [AuthGaurdService]
        },

        {
          path: 'notification',
          component: NotificationComponent,
          data: {
            title: 'notification'
          },
  
        },
       
        
      ]
    },
    { path: '**', component: P404Component }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }