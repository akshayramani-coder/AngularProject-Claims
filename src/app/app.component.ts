import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from './common/services/login.service';
import { UserService } from './common/services/user.service';
import { Location } from '@angular/common';
import { environment } from '../environments/environment';

import { INavData, navItems } from './_nav'; 

import { filter } from 'rxjs/operators';
import { AllCommonService } from './views/registration/services/common-service/all-common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kli_project';
  
  constructor(public router: Router,private allCommonService:AllCommonService, private loginService: LoginService, private location: Location, private userService:UserService) { 
    this.userService.removeSidebar().subscribe(res => {
      if (res != null || res != undefined) {
        this.sideBarElem = res;
      }
      else {
        this.sideBarElem = false;
      }


    })
    // get User Details with the help of localstorage Added By Amir on 12-02-2021 Start
    this.userPrivilege = JSON.parse(localStorage.getItem('userDetails') || '{}')
    // get User Details with the help of localstorage Added By Amir on 12-02-2021 End

    // get User current RouterLink with the help of Router.url Added By Amir on 12-02-2021 Start

    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {

      if ((event.url == '/' || event.url == '/login' || event.url == '/dashboard')) {
        this.navItems = []
      }
      else {
        // this.getSidebarUrls()
      }
    });

    this.allCommonService.invokeEvent.subscribe(value => {
      if(value === "Call"){
        this.closeSideBarWhilePrinting()
      }
    })

  }
  someone_there = false;
  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  userPrivilege:any;
  isApp:any;
  menus: INavData[] = [];
  routeName:any;
  sideBarElem:any;  
  sideBarOpen = true;
  test:any;
  ngOnInit() {
    // MultiTab functionality start

    if (!environment) {

      var pathString = this.location.path();
      const data = localStorage.getItem("sessionFlag");
      if (data) {
        if (pathString.split('?')[0] != "/multiTab") {
          this.router.navigate(['/multiTab'], { queryParams: { redirectTo: pathString } });
        }
        return
      } else {
        localStorage.setItem("sessionFlag", "true");
        if (pathString.split('?')[0] == "/multiTab") {
          this.router.navigate([decodeURIComponent(pathString.split('?')[1].split('=')[1])])
        }
      }
    }


    //MultiTab functionality End

    this.loginService.autoLogin();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
    console.log(this.sideBarOpen)
  }

  closeSideBarWhilePrinting(){
    this.sideBarOpen = false
  }
  
  getSidebarUrls() {

    this.userService.getAppDetails().subscribe(res => {
      this.isApp=res;
      localStorage.setItem("appCode", this.isApp);

      this.menus = []
      if (this.userPrivilege.application.length != 0) {
        for (let i = 0; i < this.userPrivilege.application.length; i++) {
          if (this.isApp == null) {

              this.isApp = this.userPrivilege.application[0].appCode
            }
          else{
            this.isApp=res;
          }
          if (this.userPrivilege.application[i].appCode == this.isApp) {
            let prntMnuList=this.userPrivilege.application[i].menu;
            prntMnuList.sort((a:any,b:any) => a.srtOrd > (b.srtOrd));
            for (let j = 0; j < prntMnuList.length; j++) {
              let test = {
                name: prntMnuList[j].dispName,
                url: prntMnuList[j].actnUrl,
                icon: 'icon-pencil',
                // attributes: { disabled: true }

              }
              let childMenuList=prntMnuList[j].childMenu;
              if(childMenuList && childMenuList.length>0)
              {
                this.test["children"] = []
                childMenuList.sort((a:any,b:any) => a.srtOrd > (b.srtOrd));
                for (let k= 0; k < childMenuList.length; k++) {
                  let child = {
                    name: childMenuList[k].dispName,
                    url: childMenuList[k].actnUrl,
                    icon: 'icon-pencil',
                    // attributes: { disabled: true }
                  }
                  this.test["children"].push(child)
              }
            }
              this.menus.push(test);
            }
          }
          else {
            this.navItems = []
          }
        }
        this.navItems = this.menus;
      }
      else {
        this.menus=[]
        this.navItems = []
      }
    })
  }

  @HostListener("window:unload", ["$event"])
  unloadHandler(event:any) {
    if (!environment && this.router.url.split('?')[0] != '/multiTab') {
     localStorage.clear();

    }

  }
}
function unloadHandler(event: Event) {
  throw new Error('Function not implemented.');
}
