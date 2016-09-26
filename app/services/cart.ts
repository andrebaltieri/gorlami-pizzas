import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';

@Injectable()
export class CartService {
  public items: CartItem[] = [];

  constructor() {
    if (localStorage.getItem('cart')) {
      this.loadItems();
    } else {
      localStorage.setItem('cart', '[]');
    }
  }

  loadItems(): void {
    this.items = JSON.parse(localStorage.getItem('cart'));
  }

  saveItems(): void {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  getTotal(): number {
    this.loadItems();

    var total: number = 0;
    for (var item of this.items) {
      total += (item.product.price * item.quantity);
    }
    return total;
  }

  getItems(): CartItem[] {
    this.loadItems();
    return this.items;
  }

  getItemsCount(): number {
    this.loadItems();
    return this.items.length;
  }

  addItem(item: CartItem): void {
    this.loadItems();

    if (this.hasItem(item)) {
      var index: number = this.getIndex(item);
      this.incrementQuantity(index);
    } else {
      this.items.push(item);
    }

    this.saveItems();
  }

  removeItem(index: number): void {
    this.loadItems();
    this.items.splice(index, 1);
    this.saveItems();
  }

  hasItem(item: CartItem): boolean {
    for (var x of this.items) {
      if (x.product.title == item.product.title) {
        return true;
      }
    }

    return false;
  }

  getIndex(item: CartItem): number {
    var index: number = -1;
    this.items.forEach((x, i) => {
      if (item.product.title == x.product.title) {
        index = i;
      }
    });

    return index;
  }

  incrementQuantity(index: number): void {
    this.loadItems();
    this.items[index].quantity++;

    this.saveItems();
  }

  decrementQuantity(index: number): void {
    this.loadItems();
    this.items[index].quantity--;

    this.saveItems();
  }
}

