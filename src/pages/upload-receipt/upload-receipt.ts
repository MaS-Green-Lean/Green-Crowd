import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import { ReceiptServiceProvider } from '../../services/receipt-service';

@Component({
  selector: 'page-upload-receipt',
  templateUrl: 'upload-receipt.html',
})
export class UploadReceiptPage {
  selectedImage: string;
  processingMsg: string;
  response: any;

  public receiptItems;
  public lineItems = [];

  constructor(public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController, public receiptProvider: ReceiptServiceProvider) {
  }

  ionViewDidLoad(){

    this.receiptItems = [
      { title: 'Clementines', cost: 4.99  },
      { title: 'Graeters Ice Cream', cost: 5.49 },
      { title: 'Cambles Soup', cost: 2.49 },
      { title: 'Butter', cost:2.99 },
      { title: 'Quaker Oatmeal', cost:5.29},
      { title: 'Peanuts', cost:1.69 },
      { title: 'Almonds', cost:4.49 },
      { title: 'HoneyCrisp Apples', cost:2.71 },
      { title: 'Green Beans', cost: 1.69}
    ];

  }

  selectSource() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Use Library',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }, {
          text: 'Capture Image',
          handler: () => {
            this.getPicture(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'Cancel',
          role: 'Cancel'
        }
      ]
    })
    actionSheet.present();
  }

  getPicture(sourceType : PictureSourceType) {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.selectedImage = `data:image/jpg;base64,${imageData}`;
      this.processingMsg = "Image Processed";
      this.uploadPicture(this.selectedImage);
    })
  }

  uploadPicture(image: string) {
    this.receiptProvider.postReceiptData(image).then((result) => {
      this.response = result['lineAmounts'];
      this.parseJSON();
    }, (err) => {
      console.log(err);
    });
  }

  parseJSON() {
    for (let i = 0; i < this.response.length ; i++) {
      var description = this.response[i]['description'].split(this.response[i]['data'])
      let item = {title: description[0].trim(), cost: this.response[i]['data']};
      this.lineItems.push(item);
    }
    console.log(JSON.stringify(this.lineItems))
  }
}
