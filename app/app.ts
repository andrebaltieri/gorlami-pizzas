import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { Push } from 'ionic-native';
import { StatusBar } from 'ionic-native';
import * as firebase from 'firebase';

import { CartService }from './services/cart';

import { User } from './models/user';

import { HomePage } from './pages/home/home';
import { ProductsPage } from './pages/products/products';
import { ConfigurationPage } from './pages/configuration/configuration';
import { CartPage } from './pages/cart/cart';
import { HistoryPage } from './pages/history/history';
import { LogoutPage } from './pages/logout/logout';
import { LoginPage } from './pages/login/login';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  public user: User = new User('', '', '');
  public cartItems: number = 0;

  rootPage: any = HomePage;

  pages: Array<{ title: string, icon: string, component: any }>;

  constructor(public platform: Platform,  private cart: CartService) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Pizzas', icon: 'pizza', component: ProductsPage },
      { title: 'Meu Pedido', icon: 'cart', component: CartPage },
      { title: 'Configurações', icon: 'cog', component: ConfigurationPage },
      { title: 'Histórico', icon: 'list-box', component: HistoryPage },
      { title: 'Sair', icon: 'exit', component: LogoutPage }
    ];

    var config = {
      apiKey: "AIzaSyA68m-cW3depnrI5anzpdcDgLL-V3uLsF8",
      authDomain: "pizzaria-gorlami.firebaseapp.com",
      databaseURL: "https://pizzaria-gorlami.firebaseio.com",
      storageBucket: "",
      messagingSenderId: "447537226425"
    };
    firebase.initializeApp(config);

    let push: any = Push.init({
      android: {
        senderID: "447537226425"
      },
      ios: {},
      windows: {}
    });

    // Só funciona no Device
    // alert(push.error);

    // push.on('registration', (data) => {
    //   alert(data.registrationId);
    //   this.registrationId = data.registrationId;
    // });

    // push.on('notification', (data) => {
    //   alert(data.message);
    //   alert(data.title);
    //   alert(data.count);
    //   alert(data.sound);
    //   alert(data.image);
    //   alert(data.additionalData);
    // });    

    // push.on('error', (e) => {
    //   alert(e.message);
    // });

    firebase.auth().onAuthStateChanged((x) => {
      if (x) {
        var usr: User = new User(x.displayName, x.email, x.photoURL);
        localStorage.setItem('user', JSON.stringify(usr));
        this.user = usr;
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });

    this.cartItems = cart.getItemsCount();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  goToCart() {
    this.nav.setRoot(CartPage);
  }
}

ionicBootstrap(MyApp, [CartService]);
