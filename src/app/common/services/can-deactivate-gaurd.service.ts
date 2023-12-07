import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { MultiTabRestrictionComponent } from '../../common/multi-tab-restriction/multi-tab-restriction.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGaurdService implements CanDeactivate<MultiTabRestrictionComponent> {
  constructor(private router: Router) { }
  canDeactivate(component: MultiTabRestrictionComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate ? component.canDeactivate() : true;

  }
}
