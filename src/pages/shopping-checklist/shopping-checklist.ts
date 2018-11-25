import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-shopping-checklist',
  templateUrl: 'shopping-checklist.html',
})
export class ShoppingChecklistPage {
  todos: string[] = [];
  todo: string;

  constructor(public navCtrl: NavController) {

  }

  add() {
      if (this.todo!=undefined 
            && this.todo.length!=0 
            && this.todo!="") {
        this.todos.push(this.todo);
        this.todo = "";
      }
  }

  delete(item) {
      var index = this.todos.indexOf(item, 0);
      if (index > -1) {
          this.todos.splice(index, 1);
      }
  }

}
