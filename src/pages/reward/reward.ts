import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

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

  ranks: string[] = [
    "Lowly Apple",
    "Beginner Bannana",
    "Competent Cucumber",
    "Dill Pickle",
    "Egg Plant"
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardPage');
    this.ctr = 0;
    this.item = "";
  }

  onSumbitButtonClick() {
    if (this.item === "") {
      this.showToast("Please enter valid produce");
    } else {
      this.ctr += 1;
      this.item = "";
      this.price = null;
      this.showToast("Congradulations you have reached rank : " + this.ranks[this.ctr]);
    }
  }

  showToast(message: string) {    
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present(toast);
  }

}
