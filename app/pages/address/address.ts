import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { CartPage } from '../../pages/cart/cart';
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


  constructor(private navCtrl: NavController, private cart: CartService, public data: DataProvider, public alertCtrl: AlertController, public formBuilder: FormBuilder) {
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
      console.log(item);
      this.addresses.push(item);
    });
  }

  onSubmit(): void {
    var user: User = JSON.parse(localStorage.getItem('user'));
    this.data.createAddress(new Address(
      user.email,
      this.addressForm.value.zipCode,
      this.addressForm.value.street,
      this.addressForm.value.number,
      this.addressForm.value.district,
      this.addressForm.value.city,
      this.addressForm.value.state));

    let prompt = this.alertCtrl.create({
      title: 'Endereço Cadastrado',
      message: "Seu endereço foi cadastrado com sucesso!",
    });
    prompt.present();
  }

  goToCart() {
    this.navCtrl.setRoot(CartPage);
  }

}
