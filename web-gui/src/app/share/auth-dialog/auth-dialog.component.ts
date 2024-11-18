import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, filter, Subscription, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

import { AuthService } from '../../services/auth.service';
import { LoginInterface, SignUp } from '../../interfaces';


@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrl: './auth-dialog.component.scss'
})
export class AuthDialogComponent {
  private _isSignInForm = new BehaviorSubject<boolean>(true);
  isSignInForm$ = this._isSignInForm.asObservable();
  private _isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading.asObservable();

  signInForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  })

  signUpForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(null, Validators.required),
    gender: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    secondName: new FormControl<string>('', Validators.required),
    thirdName: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required)
  })

  subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AuthDialogComponent>
  ) { }

  changeToSignUp(): void {
    this._isSignInForm.next(false);
  }

  changeToSignIn(): void {
    this._isSignInForm.next(true);
  }

  signIn(): void {
    const loginValue = this.signInForm.value as LoginInterface;
    this._isLoading.next(true);
    this.subscription.add(this.authService.login(loginValue)
      .pipe(
        tap(() => this._isLoading.next(false)),
        filter((value => !!value))
      )
      .subscribe(
        () => this.dialogRef.close(true)
      )
    );
  }

  signUp(): void {
    const signUp: SignUp = this.signUpForm.value;
    signUp.role = 'user';
    this._isLoading.next(true);
    this.subscription.add(this.authService.signUp(signUp)
      .pipe(tap(() => this._isLoading.next(false)))
      .subscribe(
        () => this.dialogRef.close(true)
      )
    );
  }
}
