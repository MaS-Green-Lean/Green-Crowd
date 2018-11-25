import { Component } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { NavController, ToastController } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { PasswordValidation } from "../validators/password-validator";
import { ListPage } from "../list/list";
import { StoreDetailPage } from "../store-detail/store-detail";


@Component({
    selector: 'page-register',
    templateUrl: 'register.html'
})
export class RegisterPage {
    registerForm: FormGroup;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private authService: AuthService, private toastCtrl: ToastController) {
        this.registerForm = this.formBuilder.group({
            firstName: [
                '',
                [Validators.required]
            ],
            lastName: [
                '',
                [Validators.required]
            ],
            email: [
                '',
                [Validators.email,
                Validators.required]
            ],
            password: [
                '',
                [Validators.minLength(6),
                Validators.required]
            ],
            confirmPassword: [
                '',
                [Validators.required,
                Validators.minLength(6)]
            ]
        }, { validators: PasswordValidation });
    }

    register() {
        if (this.registerForm.valid) {
            let user = {
                firstName: this.registerForm.value.firstName,
                lastName: this.registerForm.value.lastName,
                email: this.registerForm.value.email,
                password: this.registerForm.value.password
            }
            this.authService.register(user).subscribe((user) => {
                if (user.role === 'Manager') {
                    this.navCtrl.push(StoreDetailPage);
                    this.navCtrl.remove(1);
                } else if (user.role === 'Shopper') { // bad, this doesn't error handle
                    this.navCtrl.push(ListPage).catch(e => console.error(e));
                    this.navCtrl.remove(1);
                } else {
                    this.toastCtrl.create({
                        message: 'Error registering you.',
                        duration: 2000
                    }).present();
                }
            })
        }
    }
}
