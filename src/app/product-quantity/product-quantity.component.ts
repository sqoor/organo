import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
 // tslint:disable-next-line:no-input-rename
 @Input('product') product: Product;
 // tslint:disable-next-line:no-input-rename
 @Input('shopping-cart') shoppingCart: ShoppingCart;

 cart$: Observable<ShoppingCart>;

 constructor(private cartService: ShoppingCartService) { }

 async ngOnInit() {
  this.cart$ = (await this.cartService.getCart());
 }

 addToCart() {
   this.cartService.addToCart(this.product);
 }

 removeFromCart() {
   this.cartService.removeCart(this.product);
 }
}
