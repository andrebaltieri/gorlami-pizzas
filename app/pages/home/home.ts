import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartItem }from '../../models/CartItem';
import { CartService }from '../../services/cart';
import { CartPage } from '../../pages/cart/cart';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  public cartItems: number = 0;

  constructor(private navCtrl: NavController, private cart: CartService) {
    this.cartItems = cart.getItemsCount();
  }

  goToCart() {
    this.navCtrl.setRoot(CartPage);
  }
}
