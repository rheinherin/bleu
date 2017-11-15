import { Component } from '@angular/core';

import { NavPage } from '../navigation/navigation';
import { RecPage } from '../records/records';
import { LightPage } from '../light/light';
import { LockPage } from '../lock/lock';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = NavPage;
  tab2Root = RecPage;
  tab3Root = LightPage;
  tab4Root = LockPage;

  constructor() {

  }
}
