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
  shops_addres: string[] = [
    "1715 Howell Mill Rd NW, Atlanta, GA 30318",
    "1380 Atlantic Dr NW Ste 14135, Atlanta, GA 30363",
    "375 18th St NW, Atlanta, GA 30363"
  ];

  shop_names: string[] = [
    "Kroger",
    "Publix",
    "Target"
  ];


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
          lat: 43.0741704,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    });

    for(let i in [0,1,2]) {
      this.setMarker(this.shops_addres[i],this.shop_names[i]);
    }
  }

  onButtonClick() {
    // Get the location of you
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
        snippet: title,
        'position': results[0].position,
        'title':  title
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
}
