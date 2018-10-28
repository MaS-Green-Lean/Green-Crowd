import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { RewardPage } from '../pages/reward/reward';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { PenaltyPage } from '../pages/penalty/penalty';
import { ShoppingChecklistPage } from '../pages/shopping-checklist/shopping-checklist';
import { UploadReceiptPage } from '../pages/upload-receipt/upload-receipt';
import { BrowsePage } from '../pages/browse/browse';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ListPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'List', component: ListPage },
      { title: 'Shopping Checklist', component: ShoppingChecklistPage },
      { title: 'Upload Receipt', component: UploadReceiptPage },
<<<<<<< HEAD
      { title: 'Browse Items', component:BrowsePage}
=======
      { title: 'Map', component: MapPage },
      { title: 'Reward', component:RewardPage },
      { title: 'Penalty', component:PenaltyPage }
>>>>>>> 340c22d9f641559a3cf619e58e6b825dc9b4c6de
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
