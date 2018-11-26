import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Produce } from '../../model/produce';
import { AuthService } from '../../services/auth.service';
import { StoreService } from '../../services/store.service';
import { ItemFormPage } from '../item-form/item-form';

/**
 * Generated class for the ItemDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html',
})
export class ItemDetailPage {
  item: Produce;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private alertCtrl: AlertController, private storeService: StoreService) {
    this.item = this.navParams.get("item");
  }

  deleteItem() {
    const alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Do you want to delete ' + this.item.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return null;
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.storeService.deleteProducebyId(this.item._id).subscribe(() => {
              this.navParams.get('parentPage').getStore();
              this.navCtrl.pop();
            })
          }
        }
      ]
    });
    alert.present();
  }

  editItem() {
    this.navCtrl.push(ItemFormPage, { item: this.item });
  }

}
