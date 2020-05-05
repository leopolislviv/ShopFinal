import { ICart, TShirt, ICartResponse } from 'src/app/interfaces/car.interface';
// import { CrudService } from 'src/app/services/crud.service';
import { CartService } from 'src/app/services/cart.service';
import { User } from 'src/app/interfaces/user';


export class ShoppingCart {
    public cartList: any;
    public totalPrice: number;
    public totalQ: number;
    public cart: ICart;
    public shirt: TShirt;

    constructor (protected cartService: CartService) {
        this.loadCart();
    }

    loadCart() {
        this.cartService.getBasket().subscribe((res) => {
                this.cartList = res; //res.basket
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

    addToOrders(user: User) {
        this.cartService.order(user).subscribe((newOrderList: ICartResponse) => {
            console.log(newOrderList)
            this.cartList = newOrderList.basket
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
        console.log(this.totalQ)
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