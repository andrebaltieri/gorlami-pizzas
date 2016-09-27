import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Product } from '../../models/product'
import { DataProvider } from '../../providers/data/data';
import { CartItem }from '../../models/CartItem';
import { CartService } from '../../services/cart';
import { CartPage } from '../../pages/cart/cart';

@Component({
  templateUrl: 'build/pages/products/products.html',
  providers: [DataProvider]
})
export class ProductsPage {

  public products: Product[] = [];
  public cartItems: number = 0;


  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, public data: DataProvider, private cart: CartService) {
    this.getAll();
    this.cartItems = cart.getItemsCount();
  }

  getAll() {
    this.data.getProducts().subscribe(item => {
      this.products.push(item);
    });

    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    loading.present();
  }

  addProduct(product: Product) {
    this.cart.addItem(new CartItem(product, 1));
    this.cartItems = this.cart.getItemsCount();
  }

  goToCart(){
    this.navCtrl.setRoot(CartPage);
  }
}
