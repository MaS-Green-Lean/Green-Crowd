import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';


import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { RecieptScannerPage } from '../pages/reciept-scanner/reciept-scanner';
import { RewardPage } from '../pages/reward/reward';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { PenaltyPage } from '../pages/penalty/penalty';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {//, private admobFree : AdMobFree) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Shopping Lists', component: ListPage },
      { title: 'Upload Reciept', component: RecieptScannerPage },
      { title: 'Browse Stores', component: MapPage }
    ];

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      //this.showAdmobBannerAds();
    });
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
  /*
  showAdmobBannerAds() {
    const bannerConfig: AdMobFreeBannerConfig = {
      isTesting:true,
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
    .then(() => {

    })
    .catch(e => console.log(e));
  }
  */
}
