import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CartItem }from '../../models/CartItem';
import { CartService } from '../../services/cart';

import { AddressPage } from '../../pages/address/address';

@Component({
  templateUrl: 'build/pages/checkout/checkout.html',
})
export class CheckoutPage {
  public items: CartItem[] = [];
  public total: number = 0;

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private cart: CartService) {
    this.getData();
  }

  getData(): void {
    this.items = this.cart.getItems();
    this.total = this.cart.getTotal();
  }

  goToAddress() {
    this.navCtrl.setRoot(AddressPage);
  }
}
