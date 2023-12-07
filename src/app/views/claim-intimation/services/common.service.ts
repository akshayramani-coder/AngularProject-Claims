import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getCommonGroupService() {
    let commonGroupService = environment.url.claimAssesment + '/api/v1/task-details/group/TSK/N'
    return this.http.get(commonGroupService)
  }
  constructor(private http: HttpClient) { }

  getAllWorkQueue() {
    let getAllWorkQueue = environment.url.claimRegistration + '/api/v1/task-details/group/REG_TSK/Y'
    return this.http.get(getAllWorkQueue);
  }
 getRefreshWorkQueue(){
  let getAllWorkQueue = environment.url.claimRegistration + '/api/v1/task-details/REG_TSK/N'
  return this.http.get(getAllWorkQueue);
 }

  claimTask(taskBpmId) {
    let claimTaskUrl = environment.url.claimRegistration + '/api/v1/task-instnc/claims-task/' + taskBpmId
    return this.http.get(claimTaskUrl);
  }


  approveCR(data) {
    let approveCRUrl = environment.url.claimRegistration + '/api/v1/task-instnc/close-task'
    return this.http.post(approveCRUrl, data);
  }

}
