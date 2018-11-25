import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams, ToastController, ViewController } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { ListPage } from "../list/list";
import { RegisterPage } from "../register/register";
import { StoreDetailPage } from "../store-detail/store-detail";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService, private toastCtrl: ToastController) {
        this.loginForm = this.formBuilder.group({
            email: [
                '',
                [Validators.email,
                Validators.required]
            ],
            password: [
                '',
                [Validators.minLength(6),
                Validators.required]
            ]
        });
    }

    signIn() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
                if (user.role === 'Manager') {
                    this.navCtrl.push(StoreDetailPage);
                } else if (user.role === 'Shopper') {
                    this.navCtrl.push(ListPage).catch(e => console.error(e))
                } else {
                    this.toastCtrl.create({
                        message: 'Error logging you in.',
                        duration: 2000
                    }).present();
                }
            })
        }
    }

    register() {
        this.navCtrl.push(RegisterPage)
    }
}
