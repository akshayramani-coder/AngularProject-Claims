import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { configuration } from "./../../common/properties/config";
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDetailUrl = "";
  userDetailData: any;
  public chooseApp: BehaviorSubject<any> = new BehaviorSubject(null);
  public removeSidebars: Subject<boolean> = new Subject();
  appCodeData: any;
  
  constructor(private http: HttpClient) {
    this.userDetailUrl = environment.url.userManagement + configuration.partialURLs.userDetailsApi;

  }

  getUserDetail() {
    return this.http.get(this.userDetailUrl);
  }

  getRetryServiceList() {
    this.appCodeData = localStorage.getItem('appCode');
    return this.http.get(environment.url.userManagement + '/api/v1/error-retry/service-list/' +  this.appCodeData)

  }

  setUserdetails() {
    // const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.get(environment.url.userManagement + configuration.partialURLs.revokeToken);
  }
  getAppDetails(): Observable<any> {
    return this.chooseApp.asObservable();
  }
  setAppDetails(app:any) {
    this.chooseApp.next(app);
  }
  setPolicyDetails(policy: any) {
    this.chooseApp.next(policy);
  }
  setremoveSidebar(get:any) {
    this.removeSidebars.next(get)
  }
  removeSidebar() {
    return this.removeSidebars.asObservable();
  }

}
