import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/reset-password/reset-password.html',
  providers: [AuthProvider]
})
export class ResetPasswordPage {
  public resetPasswordForm: ControlGroup;

  constructor(public authData: AuthProvider, public formBuilder: FormBuilder, public nav: NavController,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController) {

    this.resetPasswordForm = formBuilder.group({
      email: ['', Validators.required],
    })
  }

  resetPassword() {

    if (!this.resetPasswordForm.valid) {
      console.log(this.resetPasswordForm.value);
    } else {
      this.authData.resetPassword(this.resetPasswordForm.value.email).then((user) => {
        let alert = this.alertCtrl.create({
          message: "Uma nova senha foi gerada e enviada para seu E-mail",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => {
                this.nav.pop();
              }
            }
          ]
        });
        alert.present();

      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: 'Não foi possível restaurar sua senha',
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });

        errorAlert.present();
      });
    }
  }
}
