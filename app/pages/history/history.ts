import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';

@Component({
  templateUrl: 'build/pages/history/history.html',
})
export class HistoryPage {

  constructor(private navCtrl: NavController) {

  }

  goToCart() {
    this.navCtrl.setRoot(CartPage);
  }
}
