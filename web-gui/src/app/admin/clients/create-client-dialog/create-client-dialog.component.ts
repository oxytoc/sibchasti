import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '../../../services/api.service';
import { Gender, Role } from '../../../interfaces';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrl: './create-client-dialog.component.scss'
})
export class CreateClientDialogComponent {
  readonly roles = Object.keys(Role);
  readonly genders = Object.keys(Gender);

  form: FormGroup = this.formBuilder.group({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    age: new FormControl<number>(null, Validators.required),
    gender: new FormControl<Gender>(Gender.m, Validators.required),
    email: new FormControl<string>('', Validators.required),
    firstName: new FormControl<string>('', Validators.required),
    secondName: new FormControl<string>('', Validators.required),
    thirdName: new FormControl<string>('', Validators.required),
    phoneNumber: new FormControl<string>('', Validators.required),
    role: new FormControl<Role>(Role.user, Validators.required)
  })

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private dialogRef: MatDialogRef<CreateClientDialogComponent>
  ) { }

  isSavingDisable(): boolean {
    return this.form.invalid;
  }

  createClient(): void {
    this.service.createUser(this.form.value).subscribe({
      next: () => {
        this.dialogRef.close(true);
      }
    }
    )
  }
}
