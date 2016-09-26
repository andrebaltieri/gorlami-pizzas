import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'build/pages/signup/signup.html',
  providers: [AuthProvider]
})
export class SignupPage {
  public signupForm: ControlGroup;

  constructor(public nav: NavController, public authData: AuthProvider, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.signupForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    })
  }

  signupUser() {

    if (!this.signupForm.valid) {
      console.log(this.signupForm.value);
    } else {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        this.nav.setRoot(HomePage);
      }, (error) => {
        var errorMessage: string = error.message;
        let alert = this.alertCtrl.create({
          message: 'Falha ao realizar seu cadastro!',
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });

      let loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      loading.present();
    }
  }
}