import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Store } from '../../model/store';
import { Subscription } from 'rxjs/Subscription';
import { StoreService } from '../../services/store.service';
import {
  GoogleMaps,
  GoogleMap
} from '@ionic-native/google-maps';
import { ItemDetailPage } from '../item-detail/item-detail';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the StoreDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-store-detail',
  templateUrl: 'store-detail.html',
})
export class StoreDetailPage {
  id: string
  store: Store
  store$: Subscription
  map: GoogleMap

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeSerivce: StoreService, private authService: AuthService) {
    this.id = this.navParams.get('storeId');
    if (!this.id) {
      if (this.authService.user.value.role === 'Manager') {
        this.id = this.authService.user.value.storeManaged;
      } // else break
    }
  }

  loadMap() {
    console.log(this.store.location.coordinates)
    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat: this.store.location.coordinates[1],
          lng: this.store.location.coordinates[0]
        },
        zoom: 18,
        tilt: 30
      },
      gestures: {
        scroll: false,
        tilt: false,
        zoom: false,
        rotate: false
      }
    });
    this.map.addMarker({
      position: {
        lat: this.store.location.coordinates[1],
        lng: this.store.location.coordinates[0]
      }
    })
  }

  ionViewDidLoad() {
    this.store$ = this.storeSerivce.getStoreById(this.id).subscribe((store: Store) => {
      this.store = store
    }, err => {
      console.error(err) // should display toast
    }, () => {
      this.loadMap()
    })
  }

  itemTapped(_, item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
