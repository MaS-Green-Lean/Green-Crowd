import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera, PictureSourceType } from '@ionic-native/camera';
import * as Tesseract from 'tesseract.js'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedImage: string;
  imageText: string;
  

  constructor(public navCtrl: NavController, private camera: Camera, private actionSheetCtrl: ActionSheetController) {

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
      this.selectedImage = `data:image/jpeg;base64,${imageData}`;
    })
  }

  recognizeImage() {
    Tesseract.recognize(this.selectedImage)
      .progress(message => {
        console.log('progress', message);
        this.imageText = message.progress.toString();
      })
      .catch(err => console.error(err))
      .then(result => {
        this.imageText = result.text;
      })
      .finally(resultOrErro => {
        console.log("Finished");
    })
  }
}
