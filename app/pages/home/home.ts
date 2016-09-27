import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { CartItem }from '../../models/CartItem';
import { CartService }from '../../services/cart';
import { CartPage } from '../../pages/cart/cart';
import { ProductsPage } from '../../pages/products/products';
import { User } from '../../models/user';
import { Product } from '../../models/product'

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [CartService, DataProvider]
})
export class HomePage implements OnInit {
  public products: Product[] = [];
  public user: User = new User('', '', '');
  public cartItems: number = 0;

  constructor(private navCtrl: NavController, public loadingCtrl: LoadingController, public data: DataProvider, private cart: CartService) {
    this.cartItems = cart.getItemsCount();
  }

  ngOnInit() {
    this.getUser();
    this.getProducts();
  }

  getProducts() {
    let loading = this.loadingCtrl.create();
    loading.present();

    this.data.getProducts().subscribe(item => {
      this.products.push(item);
      loading.dismiss();
    });
  }

  getUser() {
    this.user = this.data.getUser();
  }

  goToProducts() {
    this.navCtrl.setRoot(ProductsPage);
  }

  goToCart() {
    this.navCtrl.setRoot(CartPage);
  }
}
