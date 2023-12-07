import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  // NEXT, PREVIOUS BUTTON CLICK FUNCATION
  private emitCandidateProfileFirstbutton = new BehaviorSubject<any>(null);
  public candidateProfileFirstData =
    this.emitCandidateProfileFirstbutton.asObservable();

  private emitCandidateProfileNextbutton = new BehaviorSubject<any>(null);
  public candidateProfileNextData =
    this.emitCandidateProfileNextbutton.asObservable();

  private emitCandidateProfileNextbuttonStep = new BehaviorSubject<any>(null);
  public candidateProfileNextDataStep =
    this.emitCandidateProfileNextbuttonStep.asObservable();

  private emitCandidateProfilepreviousButton = new BehaviorSubject<any>(null);
  public candidateProfilePreviousData =
    this.emitCandidateProfilepreviousButton.asObservable();

  public emitJobFirstBtnFn(data: any) {
    this.emitCandidateProfileFirstbutton.next(data);
  }

  public emitJobNextBtnFn(data: any) {
    this.emitCandidateProfileNextbutton.next(data);
  }
  public emitJobNextBtnFnStep(data: any) {
    this.emitCandidateProfileNextbuttonStep.next(data);
  }
  public emitJobPreviousBtnFn(data: any) {
    this.emitCandidateProfilepreviousButton.next(data);
  }

}
