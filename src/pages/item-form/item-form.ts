import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { Produce } from "../../model/produce";
import { StoreService } from "../../services/store.service";
import { StoreDetailPage } from "../store-detail/store-detail";


@Component({
    selector: 'app-item-form',
    templateUrl: 'item-form.html',
})
export class ItemFormPage {
    produceForm: FormGroup;
    item: Produce;

    constructor(public navCtrl: NavController, private navParams: NavParams, private formBuilder: FormBuilder, private storeService: StoreService, private authService: AuthService) {
        this.item = this.navParams.get("item");

        if (this.item) {
            this.produceForm = this.formBuilder.group({
                name: [
                    this.item.name,
                    [Validators.required]
                ],
                description: [
                    this.item.description,
                    [Validators.required]
                ],
                price: [
                    this.item.price,
                    [Validators.required]
                ]
            });
        } else {
            this.produceForm = this.formBuilder.group({
                name: [
                    '',
                    [Validators.required]
                ],
                description: [
                    '',
                    [Validators.required]
                ],
                price: [
                    null,
                    [Validators.required]
                ]
            });
        }
    }

    randomNumber() {
        return Math.random() * (3 - 0.1) + 0.1;
    }

    save() {
        if (this.produceForm.valid) {
            if (this.item) {
                let produce = {
                    name: this.produceForm.value.name,
                    description: this.produceForm.value.description,
                    price: this.produceForm.value.price
                }
                this.storeService.updateProduceById(this.item._id, produce).subscribe(() => {
                    this.navCtrl.setRoot(StoreDetailPage, {}, { animate: true, direction: "forward" });
                })
            } else {
                let produce = {
                    name: this.produceForm.value.name,
                    description: this.produceForm.value.description,
                    price: this.produceForm.value.price,
                    carbon: this.randomNumber()
                }
                this.storeService.createProduce(this.authService.user.value.storeManaged, produce).subscribe(() => {
                    this.navCtrl.setRoot(StoreDetailPage, {}, { animate: true, direction: "forward" });
                })
            }
        }
    }

    cancel() {
        this.navCtrl.pop();
    }
}
