import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Product } from '../../models/product';
import { Address } from '../../models/address';

@Injectable()
export class DataProvider {
  private products: any;
  private addresses: any;

  constructor(private http: Http) {
    this.products = firebase.database().ref('products');
    this.addresses = firebase.database().ref('address');
  }

  getProducts(): Observable<Product> {
    return Observable.create(observer => {
      let listener = this.products.on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Product(
          data.title, 
          data.description,
          data.price,
          data.inStock
        ));
      }, observer.error);

      return () => {
        this.products.off('child_added', listener);
      };
    });
  }

  getAddresses(email: string): Observable<Address> {
    return Observable.create(observer => {
      let listener = this.addresses.orderByChild('email').equalTo(email).on('child_added', snapshot => {
        let data = snapshot.val();
        observer.next(new Address(
          data.email,
          data.zipCode, 
          data.street, 
          data.number, 
          data.district, 
          data.city, 
          data.state
        ));
      }, observer.error);

      return () => {
        this.addresses.off('child_added', listener);
      };
    });
  }

  createAddress(address: Address): void {
    this.addresses.push(address);
  }
}