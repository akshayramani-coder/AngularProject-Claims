import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { ErrorComponent } from './common/error/error.component';
import { LoginComponent } from './common/login/login.component';
import { P404Component } from './common/error/404.component';
import { P500Component } from './common/error/500.component';
import { MultiTabRestrictionComponent } from './common/multi-tab-restriction/multi-tab-restriction.component';
import { RegistorComponent } from './common/registor/registor.component';
import { RetryComponent } from './common/retry/retry.component';
import { HeaderComponent } from './containers/header/header.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './common/services/auth-interceptor.service';
import { MaterialsModule } from './materials/material.module';
import { AppRoutingModule } from './app.routing';
import { MultilevelMenuService, NgMaterialMultilevelMenuModule } from 'ng-material-multilevel-menu';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { SpinnerComponent } from './containers/spinner/spinner.component';
import { SaveeventDetailsDialogueComponent } from './common/model/saveevent-details-dialogue/saveevent-details-dialogue.component';
import { NotificationComponent } from './common/notification/notification/notification.component';
// import { RegistrationModule } from './views/registration/registration.module';
// import { DashboardComponent } from './views/dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    LoginComponent,
    MultiTabRestrictionComponent,
    RegistorComponent,
    RetryComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    P404Component,
    P500Component,
    SpinnerComponent,
    SaveeventDetailsDialogueComponent,
    NotificationComponent,
    // DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialMultilevelMenuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialsModule,
  
    // RegistrationModule
  ],
  providers: [DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},  MultilevelMenuService,{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
