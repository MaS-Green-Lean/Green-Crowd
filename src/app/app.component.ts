import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { RewardPage } from '../pages/reward/reward';
import { PenaltyPage } from '../pages/penalty/penalty';
import { ShoppingChecklistPage } from '../pages/shopping-checklist/shopping-checklist';
import { UploadReceiptPage } from '../pages/upload-receipt/upload-receipt';
import { BrowsePage } from '../pages/browse/browse';
import { AuthService } from '../services/auth.service';
import { StoreDetailPage } from '../pages/store-detail/store-detail';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  authSub$: Subscription;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public authService: AuthService) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    // check for user type here
  }

  ngOnInit() {
    this.authSub$ = this.authService.user.subscribe((user) => {
      if (user && user.role === 'Shopper') {
        this.rootPage = ListPage;
        console.log(this.rootPage)
        this.pages = [
          { title: 'List', component: ListPage },
          { title: 'Shopping Checklist', component: ShoppingChecklistPage },
          { title: 'Upload Receipt', component: UploadReceiptPage },
          { title: 'Browse Stores', component: BrowsePage }
        ];
      } else if (user && user.role === 'Manager') {
        this.rootPage = StoreDetailPage;
        this.pages = [
          { title: 'Store',  component: StoreDetailPage } // you will need to have this page pull store from manager details
        ]
      } else {
        this.pages = null;
        this.rootPage = LoginPage;
      }
    })
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

  ngOnDestroy() {
    this.authSub$.unsubscribe();
  }
}
