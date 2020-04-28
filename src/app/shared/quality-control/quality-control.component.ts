import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TShirt, ICart } from 'src/app/interfaces/car.interface';
import { ShoppingCart } from '../basket/shopping.cart';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.component.html',
  styleUrls: ['./quality-control.component.scss']
})
export class QualityControlComponent extends ShoppingCart {
  @Input() quantity: number;
  @Output() onChange = new EventEmitter<number>();

// public cartService: CartService;
public cart: ICart;

constructor(protected cartService: CartService) {
  super(cartService)
}

  ngOnInit() {
  }

  plusOne(cart) {
    if (this.quantity < 1000) {
      this.cartService.add(cart)
      this.quantity++;
      this.onChange.emit(this.quantity);
    }
  }

  minusOne(cart) {
    if (this.quantity > 1) {
      this.cartService.add(cart)
      this.quantity--;
      this.onChange.emit(this.quantity);
    }
  }

}
