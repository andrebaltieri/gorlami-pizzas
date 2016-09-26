import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { CartItem }from '../../models/CartItem';
import { CartService } from '../../services/cart';

import { CheckoutPage } from '../../pages/checkout/checkout';

@Component({
  templateUrl: 'build/pages/cart/cart.html',
})

export class CartPage {
  public items: CartItem[] = [];
  public total: number = 0;

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, private cart: CartService) {
    this.getData();
  }

  getData(): void {
    this.items = this.cart.getItems();
    this.total = this.cart.getTotal();
  }

  increment(index: number): void {
    if (this.items[index].quantity >= 10) {
      let alert = this.alertCtrl.create({
        title: 'Limite excedido',
        subTitle: 'Não é possível adicionar a quantidade informada.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.cart.incrementQuantity(index);
    this.getData();
  }

  decrement(index: number): void {
    if (this.items[index].quantity <= 1) {
      this.remove(index)
    } else {
      this.cart.decrementQuantity(index);
      this.getData();
    }
  }

  remove(index: number): void {
    this.cart.removeItem(index);
    this.getData();
  }

  clear() {
    let prompt = this.alertCtrl.create({
      title: 'Cancelar Pedido',
      message: "Deseja remover todos os itens do carrinho?",
      buttons: [
        {
          text: 'Não',
          handler: data => {

          }
        },
        {
          text: 'Sim',
          handler: data => {
            this.cart.clear();
            this.getData();
          }
        }
      ]
    });
    prompt.present();
  }

  goToCheckout(){
    this.navCtrl.setRoot(CheckoutPage);
  }
}
