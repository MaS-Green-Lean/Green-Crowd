import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-shopping-checklist',
  templateUrl: 'shopping-checklist.html',
})
export class ShoppingChecklistPage {

  public items;
 
  constructor(public navCtrl: NavController) {
 
  }
 
  ionViewDidLoad(){
 
    this.items = [
      { title: 'Orange' },
      { title: 'Pumpkin' },
      { title: 'Butternut Squash' },
      { title: 'Cucumber' },
      { title: 'Bosc Pear'},
      { title: 'Zucchini' },
      { title: 'Gala Apple' },
      { title: 'Peach' }
    ];
 
  }

}
