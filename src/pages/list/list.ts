import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../model/produce';
import { Store } from '../../model/store';
import { ItemDetailPage } from '../item-detail/item-detail';
import { StoreService } from '../../services/store.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage implements OnInit {
  produce: Produce[];
  allItems: Store;
  itemsObservable: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeServive: StoreService, private authService: AuthService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  ionViewCanEnter(): boolean {
    if (this.authService.user.value.role === 'Shopper') {
      return true;
    }
    return false;
  }

  ngOnInit() {
    this.itemsObservable = this.storeServive.getStoreById('5bd20f3f6b80b60edf6f4dbc').subscribe((stores: Store) => {
      this.allItems = stores;
      this.produce = this.allItems.produce
    })
  }

  itemTapped(_, item) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  private searchItems(searchbar) {
    this.produce = this.allItems.produce
    var query = searchbar.srcElement.value;
    if(!query) {return;}
    this.produce = this.produce.filter((item) => {
    if(item.name && query) {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  }

  private cancelSearch() {
    this.produce = this.allItems.produce;
  }
}
