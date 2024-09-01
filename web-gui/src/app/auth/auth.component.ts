import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { LoginInterface } from '../interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnDestroy {
  username = new FormControl<string>('', Validators.required);
  password = new FormControl<string>('', Validators.required);
  formGroup = new FormGroup({
    username: this.username,
    password: this.password,
  })

  subscription = new Subscription();

  constructor(
    private authService : AuthService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  login(): void {
    const loginValue = this.formGroup.value as LoginInterface;
    this.subscription.add(this.authService.login(loginValue).subscribe());
  }
}
