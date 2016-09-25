import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import * as firebase from 'firebase';

import { HomePage } from './pages/home/home';
import { ProductsPage } from './pages/products/products';
import { ConfigurationPage } from './pages/configuration/configuration';
import { HistoryPage } from './pages/history/history';
import { LogoutPage } from './pages/logout/logout';
import { LoginPage } from './pages/login/login';

@Component({
  templateUrl: 'build/app.html'
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Pizzas', component: ProductsPage },
      { title: 'Configurações', component: ConfigurationPage },
      { title: 'Histórico', component: HistoryPage },
      { title: 'Sair', component: LogoutPage }
    ];

    var config = {
      apiKey: "AIzaSyCXZj6nE3QwzdbKi6Y1NgTKYjqCrNpPlkA",
      authDomain: "mia-pizza.firebaseapp.com",
      databaseURL: "https://mia-pizza.firebaseio.com",
      storageBucket: "mia-pizza.appspot.com",
      messagingSenderId: "757275110490"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
