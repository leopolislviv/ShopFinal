import { ICart } from 'src/app/interfaces/car.interface';
import { CrudService } from 'src/app/services/crud.service';
import { CartService } from 'src/app/services/cart.service';


export class ShoppingCart {
    public cartList: ICart[];
    public totalPrice: number;

    constructor (protected cartService: CartService) {
        this.loadCart();
    }

    loadCart() {
        this.cartService.cart$.subscribe(res => {
            this.cartList = res;
            this.calculateTotal();
        });
    }

    removeFromCart (index: number) {
        this.cartService.remove(index);
    }

    private calculateTotal() {
        let total = 0;
        for (let cart of this.cartList) {
            total += cart.car.price * cart.quantity;
        }
        this.totalPrice = total;
    }

}