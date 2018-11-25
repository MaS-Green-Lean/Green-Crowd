import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  Geocoder,
  GeocoderResult,
  ILatLng
} from '@ionic-native/google-maps';
import { StoreService } from '../../services/store.service';
import { Store } from '../../model/store';
import { Subscription } from 'rxjs/Subscription';
import { Geolocation } from '@ionic-native/geolocation';
import { StoreDetailPage } from '../store-detail/store-detail';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {

  stores$: Subscription;
  stores: Store[] = [];
  map: GoogleMap;
  item: string;
  markers: Marker[] = [];
  bounds: ILatLng[] = [];
  storeSelected = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storeService: StoreService, public geolocation: Geolocation, public changeDetectorRef: ChangeDetectorRef) {
  }

  ionViewDidLoad() {
    this.stores$ = this.storeService.getAllStores().subscribe((stores: Store[]) => {
      this.stores = stores;
    }, err => {
      console.error(err)
    }, () => {
      this.getCurrentLocation()
    })
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then((pos) => {
      let currPos: ILatLng = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }
      this.loadMap(currPos)
    }).catch(err => {
      this.errorToast(err)
      console.error(err)
    })
  }

  loadMap(currentPosition: ILatLng) {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: currentPosition,
        zoom: 30,
        tilt: 30
      },
      controls: {
        myLocationButton: true,
        myLocation: true
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      for (let store of this.stores) {
        this.setMarker(store)
      }
      console.log(this.bounds)
      this.map.moveCamera({
        target: this.bounds
      }).then(() => console.log('camera moved'))
    })
  }

  setMarker(store: Store) {
    this.map.addMarker({
      title: store.name,
      icon: 'red',
      animation: 'DROP',
      position: {
        lat: store.location.coordinates[1],
        lng: store.location.coordinates[0]
      }
    }).then((marker: Marker) => {
      this.bounds.push(marker.getPosition())
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.storeSelected = marker.getTitle()
        this.changeDetectorRef.detectChanges()
      })
      marker.on(GoogleMapsEvent.INFO_CLOSE).subscribe(() => {
        this.storeSelected = ''
        this.changeDetectorRef.detectChanges()
      })
    })
  }

  openStore(title: string) {
    let store = this.stores.filter(store => store.name === title)
    this.navCtrl.push(StoreDetailPage, {
      storeId: store[0]._id
    })
  }

  onSearchButtonClick() {
    this.map.clear();
  }

  errorToast(message: string) {
    const toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  setMarkersPostSearch(address: string, title: string, item: string, price: string) {
    Geocoder.geocode({
      "address": address
    }).then((results: GeocoderResult[]) => {
      console.log(results);
  
      if (!results.length) {
        return null;
      }
  
      // Add a marker
      let marker: Marker = this.map.addMarkerSync({
        'position': results[0].position,
        'title':  title,
        'snippet': "Item : " + item + " | Costs $" + price + "0",
      });
    });
  }
}
