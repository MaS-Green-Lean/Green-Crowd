import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ReceiptServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReceiptServiceProvider {
  constructor(public http: HttpClient) {
    console.log('Hello ReceiptServiceProvider Provider');
    let headers = new HttpHeaders({'apikey': '6cdb2770be9011e8b187f3e9d1401099'});
  }

  getReceiptData(fileName: string) {
  return new Promise(resolve => {
    this.https.get('INSERT URL').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

}
