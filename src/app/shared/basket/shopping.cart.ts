import { ICart, TShirt, ICartResponse } from 'src/app/interfaces/car.interface';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/user';
import { HttpClient } from '@angular/common/http';


export class ShoppingCart {
    public cartList: any;
    public totalPrice: number;
    public totalQ: number;
    public cart: ICart;
    public shirt: TShirt;
    public httpClient: HttpClient;

    constructor (protected cartService: CartService) {
        this.loadCart();
    }

    loadCart() {
        this.cartService.getBasket().subscribe((res) => {
                this.cartList = res;
                this.calculateTotal();
                this.calculateQuantity();
                console.log(this.cartList)
            });
    }

    removeFromCart (cart: ICart) {

        this.cartService.remove(cart.shirt.id, cart.quantity).subscribe((newCartList: ICartResponse) => {
            console.log(newCartList)
            this.cartList = newCartList.basket
            this.calculateTotal();
            this.calculateQuantity();
        });
    }

    addToOrders(cartList: ICart[]) {
        this.cartService.order(cartList).subscribe((newOrderList: ICartResponse) => {
            console.log(newOrderList)
            this.cartList = newOrderList
        })
    }

    public calculateTotal() {
        let total = 0;
        for (let cart of this.cartList) {
            total += cart.shirt.price * cart.quantity;
        }
        this.totalPrice = total;
    }

    public calculateQuantity() {
        let totalQuantity = 0;
        for (let cart of this.cartList) {
            totalQuantity += cart.quantity
        }
        this.totalQ = totalQuantity;
    }

    public plusOne(shirt: TShirt) {
        this.cartService.add(shirt).subscribe((newCartList: ICartResponse) => {
            this.cartList = newCartList.basket;
            this.calculateTotal();
            this.calculateQuantity();
        })
    }

    public minusOne(shirt: TShirt) {
        this.cartService.remove(shirt.id).subscribe((newCartList: ICartResponse) => {
            this.cartList = newCartList.basket;
            this.calculateTotal();
            this.calculateQuantity();
        })
    }
 
}