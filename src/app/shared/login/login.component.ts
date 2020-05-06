import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public hide = true;
  public loginForm: FormGroup;
  public matcher: MyErrorStateMatcher;
  public cartList: any;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService,
  ) {
    this.hide = true;
    this.matcher = new MyErrorStateMatcher();
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [Validators.required])
    });
  }

  public ngOnInit(): void {
  }

  private openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {duration: 2000});
  }

  public submit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const {email, password} = this.loginForm.getRawValue();
    this.authService.login(email, password).subscribe(
      () => this.router.navigate(['']),
      ({error}) => this.openSnackBar(error.message, 'Error !')
    );
    this.cartService.getBasket().subscribe((res) => {
      this.cartList = res
  })
  }
}
