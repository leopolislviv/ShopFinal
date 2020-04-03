import { ICart } from 'src/app/interfaces/car.interface';
import { CrudService } from 'src/app/services/crud.service';


export class ShoppingCart {
    public cartList: ICart[];
    public totalPrice: number;

    constructor (protected crudService: CrudService) {
        this.loadCart();
    }

    loadCart() {
        this.crudService.cartListSuject.subscribe(res => {
            this.cartList = res;
            this.calculateTotal();
        });
    }

    removeFromCart (index: number) {
        this.crudService.removeCart(index);
    }

    private calculateTotal() {
        let total = 0;
        for (let cart of this.cartList) {
            total += cart.car.price * cart.quantity;
        }
        this.totalPrice = total;
    }

}