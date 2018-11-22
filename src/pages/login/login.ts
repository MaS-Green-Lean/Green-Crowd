import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams } from "ionic-angular";
import { AuthService } from "../../services/auth.service";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {
    loginForm: FormGroup;

    constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService) {
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
            console.log(this.loginForm.value)
            this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(user => {
                console.log(user)
            })
        }
    }
}
