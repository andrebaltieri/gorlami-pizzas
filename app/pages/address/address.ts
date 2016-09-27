import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { NavController, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';
import { CreateAddressPage } from '../../pages/create-address/create-address';
import { CartService } from '../../services/cart';
import { DataProvider } from '../../providers/data/data';
import { User } from '../../models/user';
import { Address } from '../../models/address';

@Component({
  templateUrl: 'build/pages/address/address.html',
  providers: [DataProvider]
})
export class AddressPage {
  public addressForm: any;
  public cartItems: number = 0;
  public addresses: Address[] = [];


  constructor(private navCtrl: NavController, private cart: CartService, public data: DataProvider, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder) {
    this.cartItems = cart.getItemsCount();
    this.addressForm = formBuilder.group({
      zipCode: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      district: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required]
    });
    this.getAll();
  }

  getAll() {
    var user: User = JSON.parse(localStorage.getItem('user'));
    this.data.getAddresses(user.email).subscribe(item => {
      this.addresses.push(item);
    });

    let loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    loading.present();
  }

  goToCart() {
    this.navCtrl.setRoot(CartPage);
  }

  addAddress() {
    this.navCtrl.setRoot(CreateAddressPage);
  }

}
