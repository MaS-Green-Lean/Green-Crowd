import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../model/produce';
import { ItemDetailPage } from '../item-detail/item-detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private items = [
    new Produce('GalaApple', 1.99, 0.28),
    new Produce('Zucchini', 2.19, 0.21),
    new Produce('BoscPear', 1.19, 0.31),
    new Produce('Cucumber', 0.89, 2.1),
    new Produce('ButternutSquash', 1.19, 0.25),
    new Produce('Pumpkin', 1.19, 0.44),
    new Produce('Peach', 3.29, 0.49),
    new Produce('Orange', 1.89, 0.35)
  ];
  private allItems = this.items;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

  private searchItems(searchbar) {
    this.items = this.allItems
    var query = searchbar.srcElement.value;
    if(!query) {return;}
    this.items = this.items.filter((item) => {
    if(item.name && query) {
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return true;
      }
      return false;
    }
  });
  }

  private cancelSearch(searchbar) {
    this.items = this.allItems;
  }
}
