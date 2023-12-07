import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  templateUrl: '404.component.html'
})
export class P404Component {

  constructor(private _route:Router) { }

  routeFunction(){
    this._route.navigate(['dashboard'])
  }

}
