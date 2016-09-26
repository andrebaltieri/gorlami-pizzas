import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/logout/logout.html',
  providers: [AuthProvider]
})
export class LogoutPage {

  constructor(private navCtrl: NavController, public authData: AuthProvider) {
    this.logOut();
  }

  logOut() {
    this.authData.logoutUser().then(() => {
      localStorage.removeItem('user');
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
