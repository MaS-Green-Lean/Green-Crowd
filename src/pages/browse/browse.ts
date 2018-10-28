import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  Geocoder,
  GeocoderResult
} from '@ionic-native/google-maps';
import { StoreService } from '../../services/store.service';
import { Store } from '../../model/store';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-browse',
  templateUrl: 'browse.html',
})
export class BrowsePage {
  stores$: Subscription;
  stores: Store[];
  map: GoogleMap;
  item: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public storeService: StoreService) {
  }

  ngOnInit() {
    this.stores$ = this.storeService.getAllStores().subscribe((stores: Store[]) => {
      this.stores = stores;
    })
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 33.7756,
          lng: -84.3963
        },
        zoom: 18,
        tilt: 30
      }
    });

    for (let store of this.stores) {
      this.setMarker(store.address, store.name);
    }

    this.map.getMyLocation()
    .then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      })
      .then(() => {
        // add a marker
        let marker: Marker = this.map.addMarkerSync({
          snippet: 'Current Location',
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });

        // show the infoWindow
        marker.showInfoWindow();
      });
    });
  }

  onSearchButtonClick() {
    this.map.clear();
    for (let store of this.stores) {
      this.setMarkersPostSearch(store.address, store.name, this.item, this.getRandomPrice());
    }

    this.map.getMyLocation()
      .then((location: MyLocation) => {
        console.log(JSON.stringify(location, null ,2));

        // add a marker
        let marker: Marker = this.map.addMarkerSync({
          snippet: 'Current Location',
          position: location.latLng,
          animation: GoogleMapsAnimation.DROP
        });

        // show the infoWindow
        marker.showInfoWindow();
      });
  }

  setMarker(address: string, title: string) {
    Geocoder.geocode({
      "address": address
    }).then((results: GeocoderResult[]) => {
      console.log(results);
  
      if (!results.length) {
        return null;
      }
  
      // Add a marker
      let marker: Marker = this.map.addMarkerSync({
        'snippet': title,
        'position': results[0].position,
        'title':  title
      });

    });
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

  showToast(message: string) {    
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

  getRandomPrice() {
    let dollar = Math.floor(Math.random() * 5) + 1;
    let ten_cents = Math.floor(Math.random() * 9) + 1;

    let total = dollar + (0.1 * ten_cents);
    return String(total);
  }
}
