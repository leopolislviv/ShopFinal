import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {ICart, TShirt} from '../interfaces/car.interface';
import {QueryParams} from '../interfaces/query-params';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private readonly URL: string = environment.apiUrl;
//
  cartListSuject = new BehaviorSubject([]);
//  
  constructor(private http: HttpClient) {}

  public get cars(): Observable<TShirt[]> {  //cars()
    return this.http.get(`${this.URL}/shirts`).pipe(
      map((shirts: TShirt[]) => shirts),
    );
  }

  public getCarById(id: string): Observable<TShirt> { //
    return this.http.get(`${this.URL}/shirts/${id}`).pipe(
      filter(Boolean),
      map((shirt: TShirt) => shirt),
    );
  }


  public get navList(): Observable<string[]> {
    return this.http.get(`${this.URL}/shirts`)
      .pipe(
        map((shirts: TShirt[]) => shirts.map((shirt: TShirt) => shirt.brand)),
        map((brands: string[]) => [...new Set(brands)]),
        map((brands: string[]) => brands.sort((a: string, b: string) => a > b ? 1 : -1)),
      );
  }


  public getFilteredCars(params: QueryParams): Observable<TShirt[]> {
    return this.http.get(`${this.URL}/shirts`)
      .pipe(
        map((shirts: TShirt[]) => {
          if (params.hasOwnProperty('male')) {
            return shirts.filter((shirt: TShirt) => params.male ? shirt.male : !shirt.male);
          }

          if (params.hasOwnProperty('female')) {
            return shirts.filter((shirt: TShirt) => params.female ? shirt.female : !shirt.female);
          }

          if (params.hasOwnProperty('brand')) {
            return shirts.filter((shirt: TShirt) => shirt.brand === params.brand);
          }
          return shirts;
        }) 
      )
  }

  public modifyCar(shirt: TShirt): void {
    this.http.put(`${this.URL}/shirts/${shirt.id}`, shirt)
      .subscribe((res) => console.log(res));
  }


  //
addToCart(cart: ICart) {
  let current = this.cartListSuject.getValue();
  let dup = current.find(c => c.shirt.id === cart.shirt.id);
  if (dup) dup.quantity += cart.quantity;
  else current.push(cart);
  this.cartListSuject.next(current);
}

removeCart(index: number) {
  let current = this.cartListSuject.getValue();
  current.splice(index, 1);
  this.cartListSuject.next(current);
}

reloadCart(cartList: ICart[]) {
  this.cartListSuject.next(cartList);
}

clearCart() {
  this.cartListSuject.next([]);
}

public cartChanged: EventEmitter<TShirt> = new EventEmitter<TShirt>();
  //

}
