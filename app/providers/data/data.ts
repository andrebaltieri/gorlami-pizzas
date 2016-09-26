import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import { Product } from '../../models/product'

@Injectable()
export class DataProvider {
  private products: any;

  constructor(private http: Http) {
    this.products = firebase.database().ref('products');
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

  // create(title: string, description: string): void {
  //   this.db.push({
  //     title,
  //     description,
  //   });
  // }
}