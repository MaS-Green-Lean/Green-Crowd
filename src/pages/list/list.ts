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
    new Produce('GalaApple', 1.10),
    new Produce('Zucchini', 1.10),
    new Produce('Pear', 1.10),
    new Produce('Cucumber', 1.10),
    new Produce('ButternutSquash', 1.10),
    new Produce('Pumpkin', 1.10),
    new Produce('Peach', 1.10),
    new Produce('Orange', 1.10)
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
