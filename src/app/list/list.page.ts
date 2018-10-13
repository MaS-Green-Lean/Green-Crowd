import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Produce } from '../../models/produce';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;
  private items = [
    new Produce('Gala Apple', 1.10),
    new Produce('Zucchini', 1.10),
    new Produce('Pear', 1.10),
    new Produce('Cucumber', 1.10),
    new Produce('Butternut Squash', 1.10),
    new Produce('Pumkin', 1.10),
    new Produce('Peach', 1.10),
    new Produce('Orange', 1.10)
  ];
  private allItems = this.items;

  //constructor(public navCtrl: NavController){}

  ngOnInit() {
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

  // public openItem(event, item){
  //   this.navCtrl.push(item,{
  //     item:item
  //   });
  // }
}
