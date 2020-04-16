import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {filter, tap} from 'rxjs/operators';
// import { Car } from '../interfaces/car.interface';
// import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL: string = environment.apiUrl;

  public isLogined$: BehaviorSubject<boolean>;
  public user$: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user'));
    this.isLogined$ = new BehaviorSubject<boolean>(!!user && !!user.email);
    this.user$ = new BehaviorSubject<User>(user);
  }

  // public addBasket(email: string, car: object): Observable<any> {
  //   return this.http.post(`${this.URL}/add-to-basket`, email, car) 
  // }

  public addBasket(user: User): Observable<any> {
    return this.http.post(`${this.URL}/add-to-basket`, user) 
  }

  public singUp(user: User): Observable<any> {
    return this.http.post(`${this.URL}/signin`, user);
    // {email: user.email, car: car} - add
    // {email: user.email, id: id} - remove
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/login`, { email, password }).pipe(
      filter(Boolean),
      tap(({user}: Record<string, User>) => {
        this.isLogined$.next(true);
        this.user$.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  // public addBasket(email: string, car: string): Observable<any> {
  //   return this.http.post(`${this.URL}/add-to-basket`, {email, car}).pipe(
  //     filter(Boolean),
  //     tap(({user, car}: Record<string, User>) => {
  //       this.isLogined$.next(true);
  //       this.user$.next(user);
  //       localStorage.setItem('user', JSON.stringify(user));
  //     })
  //   )
  // }

  public logOut(): void {
    localStorage.removeItem('user');
    this.isLogined$.next(false);
    this.user$.next(null);
  }
}
