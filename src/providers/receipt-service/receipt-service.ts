import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ReceiptServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReceiptServiceProvider {
  private postAPIUrl = 'https://api.taggun.io/api/receipt/v1/verbose/file'
  // private postAPIUrl = 'https://api.tabscanner.com/YHFGIucsBOWzf5RGezEGaQvUR3EegIoFtrIiPb447aeBbEUL3EJRqIcaCCvGnx7v/process/'

  public headers = new HttpHeaders({
      apikey: '1a5725a0f05711e8ac04312517c48982'
    });
  // public headers = new HttpHeaders({
  //     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  //     'cache-control': 'no-cache'
  //   });

  constructor(public http: HttpClient) {
    console.log('Hello ReceiptServiceProvider Provider');
  }

  postReceiptData(fileData: string) {
    var blob = this.convertBase64ToBlob(fileData);
    var formData = new FormData()
    formData.append('file', blob)
    // let formData = JSON.stringify({ file_contents:
    //   { value: blob,
    //     options:
    //      { filename: 'receipt.jpg',
    //        contentType: null } } });
    return new Promise((resolve, reject) => {
      this.http.post(this.postAPIUrl, formData, {headers:this.headers }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
        console.log(JSON.stringify(err));
      });
    });
  }

  private convertBase64ToBlob(base64: string) {
    const info = this.getInfoFromBase64(base64);
    const sliceSize = 512;
    const byteCharacters = window.atob(info.rawBase64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: info.mime });
  }

  private getInfoFromBase64(base64: string) {
    const meta = base64.split(',')[0];
    const rawBase64 = base64.split(',')[1].replace(/\s/g, '');
    const mime = /:([^;]+);/.exec(meta)[1];
    const extension = /\/([^;]+);/.exec(meta)[1];

    return {
      mime,
      extension,
      meta,
      rawBase64
    };
  }


}
