import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../model/produce';
import { Store } from '../../model/store';
import { ItemDetailPage } from '../item-detail/item-detail';
import { StoreService } from '../../services/store.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  produce: Produce[];
  allItems: Store;
  itemsObservable: Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storeServive: StoreService) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  ngOnInit() {
    this.itemsObservable = this.storeServive.getStoreById('5bd20f3f6b80b60edf6f4dbc').subscribe((stores: Store) => {
      this.allItems = stores;
      this.produce = this.allItems.produce
    })
  }

  itemTapped(event, item) {
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

  private cancelSearch(searchbar) {
    this.produce = this.allItems.produce;
  }
}
