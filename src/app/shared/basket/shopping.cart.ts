import { ICart } from 'src/app/interfaces/car.interface';
import { CrudService } from 'src/app/services/crud.service';
import { CartService } from 'src/app/services/cart.service';


export class ShoppingCart {
    public cartList: ICart[];
    public totalPrice: number;
    public totalQ: number;
    // public selectedSize: number;
    // public newSize;
    public selectedSize: number;
    public newSize: string;

    constructor (protected cartService: CartService) {
        this.loadCart();
    }

    loadCart() {
        this.cartService.cart$.subscribe(res => {
            this.cartList = res;
            this.calculateTotal();
            this.calculateQuantity()
        });
    }

    removeFromCart (index: number) {
        this.cartService.remove(index);
    }

    private calculateTotal() {
        let total = 0;
        for (let cart of this.cartList) {
            total += cart.shirt.price * cart.quantity;
        }
        this.totalPrice = total;
    }

    private calculateQuantity() {
        let totalQuantity = 0;
        for (let cart of this.cartList) {
            totalQuantity += cart.quantity
        }
        this.totalQ = totalQuantity;
        // console.log(this.totalQ)
    }


    selectChange (cart: ICart, event: any) {
        let sizeNumber;
        this.selectedSize = event.target.selectedIndex - 1
        // this.sIndex = event.target.options
        // console.log(this.selectedSize)
        // console.log(this.cartList)
    
          sizeNumber = cart.shirt.size
          this.newSize = sizeNumber[this.selectedSize]
          console.log(this.newSize)
        }

    // private selectChange(event: any) {
    //     this.selectedSize = event.target.value - 1;
    //     console.log(this.selectedSize)
    // }

}