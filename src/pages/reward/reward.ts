import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RewardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'reward-page',
  templateUrl: 'reward.html'
})
export class RewardPage {

  ctr: number;
  item: string;
  price: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardPage');
    this.ctr = 0;
  }

  onSumbitButtonClick() {
    this.ctr += 1;
    this.item = "";
    this.price = "";
  }

}
