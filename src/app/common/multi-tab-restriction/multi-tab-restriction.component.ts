import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-tab-restriction',
  templateUrl: './multi-tab-restriction.component.html',
  styleUrls: ['./multi-tab-restriction.component.scss']
})
export class MultiTabRestrictionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  canDeactivate(): boolean {

    if (localStorage.getItem("sessionFlag")) {
      return false
    } else {
      localStorage.setItem("sessionFlag", "true");
      return true
    }
  }
}
