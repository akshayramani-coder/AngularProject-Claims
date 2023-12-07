import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MultilevelNodes, MultilevelMenuService } from 'ng-material-multilevel-menu';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';

import { LoginService } from '../../common/services/login.service';
import { UserService } from '../../common/services/user.service';
import { INavData, navItems } from '../../_nav';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  config: any;
  public sidebarMinimized = false;
  public navItems: INavData[] = [];
  userPrivilege: any;
  isApp: any;
  menus: INavData[] = [];
  routeName: any;
  sideBarElem: any;
  test: any
  @Output()
  newAuctionReload: EventEmitter<string> = new EventEmitter<string>();





  constructor(private multilevelMenuService: MultilevelMenuService,
    private router: Router, private route: ActivatedRoute, private loginService: LoginService, private userService: UserService) {
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

    this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {

      
      if ((event.url == '/' || event.url == '/login')) {
        this.navItems = []
      }
      else {
        this.getSidebarUrls()
      }
    });

  }
  loading = false;
  appCodeData: any
  ngOnInit(): void {
    //  this.getSidebarUrls();
    this.config = {
      interfaceWithRoute: false,
      classname: 'side-menu-class',
      fontColor: `#14112d`,
      selectedListFontColor: `#4c84ff`,
      paddingAtStart: false,
      highlightOnSelect: false,
      collapseOnSelect: true,
      useDividers: false,
      rtlLayout: false
    };
    
    console.log(this.router.url)
    this.userPrivilege = JSON.parse(localStorage.getItem('userDetails') || '{}');
    console.log(this.userPrivilege)
    // if (this.userPrivilege.application.length < 2) 
    console.log("HERE")
    let route = localStorage.getItem("appcode") ? localStorage.getItem("appcode") : null;
    if(!route){
    
     route = this.userPrivilege.application[0].appCode 
    }
    // else{
    if(this.router.url == "/claims-intimation/claim-details" || this.router.url == "/claims-intimation/claim-acknowledgment"){
      
    }
    else{
      this.onClick(route); 
    }
    
    // }
    // else 
    // else {
    //   let content = 'Direct dashboard Avoided due to multiple Application assigned to user'
    //   let action = 'close'
    //   // this.snackBar.info(content, action)
    // }

    // this.userService.getAppDetails().subscribe((res: any) => {
    //   this.isApp = res;
    // })


  }
  app: any;
  appCode: any;
  setExpandCollapseStatus(type: any) {
    this.multilevelMenuService.setMenuExapandCollpaseStatus(type);
  }
  selectedItem(url: any) {
    this.router.navigate([url.link]);
    // this.newAuctionReload.emit('reload');
  }
  // get Sidebars Dynamically with the help of userService BehaviorSubject Added By Amir on 12-02-2021 Start
  getSidebarUrls() {


    
  //   this.userService.getAppDetails().subscribe(res => {
  //     this.isApp = res;

  //     this.menus = []
  //     if (this.userPrivilege.application.length != 0) {
  //       for (let i = 0; i < this.userPrivilege.application.length; i++) {
  //         if (this.isApp == null) {

  //           this.isApp = this.userPrivilege.application[0].appCode
  //         }
  //         else {
  //           this.isApp = res;
  //         }
  //         if (this.userPrivilege.application[i].appCode == this.isApp) {
  //           let prntMnuList = this.userPrivilege.application[i].menu;
  //           prntMnuList.sort((a: any, b: any) => a.srtOrd > (b.srtOrd));
  //           for (let j = 0; j < prntMnuList.length; j++) {
  //             let test = {
  //               name: prntMnuList[j].dispName,
  //               url: prntMnuList[j].actnUrl,
  //               icon: prntMnuList[j].icon
  //               // attributes: { disabled: true }

  //             }
  //             let childMenuList = prntMnuList[j].childMenu;
  //             if (childMenuList && childMenuList.length > 0) {
  //               // test["children"] = []
  //               childMenuList.sort((a: any, b: any) => a.srtOrd > (b.srtOrd));
  //               for (let k = 0; k < childMenuList.length; k++) {
  //                 let child = {
  //                   name: childMenuList[k].dispName,
  //                   url: childMenuList[k].actnUrl,
  //                   icon: childMenuList[k].icon
  //                   // attributes: { disabled: true }
  //                 }
  //                 // test["children"].push(child)
  //               }
  //             }
  //             this.menus.push(test);
  //           }
  //         }
  //         else {
  //           this.navItems = []
  //         }
  //       }
  //       this.navItems = this.menus;
  //     }
  //     else {
  //       this.menus = []
  //       this.navItems = []
  //     }
  //   })
  }
  onClick(data: any) {
    this.loading = true
    if (data) {
      switch (data) {
        case 'CI': {
          this.router.navigate(['/claims-intimation/']);
          this.userService.setAppDetails(data)
          localStorage.setItem('appcode', data)
          break;
        }
        case 'CR': {
          this.router.navigate(['/claims-registration/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          
          break;
        }
        case 'AS': {
          this.router.navigate(['/claims-assessment/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }
        case 'AP': {
          this.router.navigate(['/claims-approval/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }
        case 'PO': {
          this.router.navigate(['/claims-payout/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }
        case 'UT': {
          this.router.navigate(['/claims-reassignment/']);
          localStorage.setItem('appcode', data)
          this.userService.setAppDetails(data)
          break;
        }

      }

    }
    // this.router.navigate(['/dashboard'])
  }

}

