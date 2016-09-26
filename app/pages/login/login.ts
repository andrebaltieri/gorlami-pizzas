import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthProvider } from '../../providers/auth/auth';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { User } from '../../models/user';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthProvider]
})
export class LoginPage {
  public loginForm: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public authData: AuthProvider, public formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  loginUser() {

    if (!this.loginForm.valid) {
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then(authData => {
        var usr: User = new User(authData.displayName, authData.email, authData.photoURL);
        localStorage.setItem('user', JSON.stringify(usr));
        this.nav.setRoot(HomePage);
      }, error => {
        let alert = this.alertCtrl.create({
          message: 'Usuário ou senha inválidos',
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

  goToSignup() {
    this.nav.push(SignupPage);
  }

  goToResetPassword() {
    this.nav.push(ResetPasswordPage);
  }


}
