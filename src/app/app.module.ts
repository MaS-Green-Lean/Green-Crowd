import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map';
import { RewardPage } from '../pages/reward/reward';
import { CamelCaseConvert } from '../pipe/camel-case.pipe';
import { PenaltyPage } from '../pages/penalty/penalty';
import { ShoppingChecklistPage } from '../pages/shopping-checklist/shopping-checklist';
import { UploadReceiptPage } from '../pages/upload-receipt/upload-receipt';
import { BrowsePage } from '../pages/browse/browse';


import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { StoreDetailPage } from '../pages/store-detail/store-detail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StoreService } from '../services/store.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ReceiptServiceProvider } from '../providers/receipt-service/receipt-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    RewardPage,
    ItemDetailPage,
    StoreDetailPage,
    CamelCaseConvert,
    PenaltyPage,
    ShoppingChecklistPage,
    UploadReceiptPage,
    BrowsePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage,
    RewardPage,
    ItemDetailPage,
    StoreDetailPage,
    PenaltyPage,
    ShoppingChecklistPage,
    UploadReceiptPage,
    BrowsePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StoreService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ReceiptServiceProvider
  ]
})
export class AppModule {}
