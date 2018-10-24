import { Component } from '@angular/core';
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

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  shops_address: string[] = [
    "1715 Howell Mill Rd NW, Atlanta, GA 30318",
    "1380 Atlantic Dr NW Ste 14135, Atlanta, GA 30363",
    "375 18th St NW, Atlanta, GA 30363"
  ];

  shop_names: string[] = [
    "Kroger",
    "Publix",
    "Target"
  ];

  item: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
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

    for(let i in [0,1,2]) {
      this.setMarker(this.shops_address[i],this.shop_names[i]);
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
    for(let i in [0,1,2]) {
      this.setMarkersPostSearch(this.shops_address[i],this.shop_names[i],this.item, this.getRandomPrice());
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
