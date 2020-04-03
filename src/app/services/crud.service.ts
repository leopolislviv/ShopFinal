import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {filter, map } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';
import {Car, ICart} from '../interfaces/car.interface';
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

  public get cars(): Observable<Car[]> {
    return this.http.get(`${this.URL}/cars`).pipe(
      map((cars: Car[]) => cars),
    );
  }

  public getCarById(id: string): Observable<Car> {
    return this.http.get(`${this.URL}/cars/${id}`).pipe(
      filter(Boolean),
      map((car: Car) => car),
    );
  }


  public get navList(): Observable<string[]> {
    return this.http.get(`${this.URL}/cars`)
      .pipe(
        map((cars: Car[]) => cars.map((car: Car) => car.brand)),
        map((brands: string[]) => [...new Set(brands)]),
        map((brands: string[]) => brands.sort((a: string, b: string) => a > b ? 1 : -1)),
      );
  }


  public getFilteredCars(params: QueryParams): Observable<Car[]> {
    return this.http.get(`${this.URL}/cars`)
      .pipe(
        map((cars: Car[]) => {
          if (params.hasOwnProperty('male')) {
            return cars.filter((car: Car) => params.male ? car.male : !car.male);
          }

          if (params.hasOwnProperty('female')) {
            return cars.filter((car: Car) => params.female ? car.female : !car.female);
          }

          if (params.hasOwnProperty('brand')) {
            return cars.filter((car: Car) => car.brand === params.brand);
          }
          return cars;
        }) 
      )
  }

  public modifyCar(car: Car): void {
    this.http.put(`${this.URL}/cars/${car.id}`, car)
      .subscribe((res) => console.log(res));
  }


  //
addToCart(cart: ICart) {
  let current = this.cartListSuject.getValue();
  let dup = current.find(c => c.car.id === cart.car.id);
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

public cartChanged: EventEmitter<Car> = new EventEmitter<Car>();
  //

}
