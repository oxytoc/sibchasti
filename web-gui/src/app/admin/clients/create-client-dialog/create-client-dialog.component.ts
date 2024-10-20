import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ApiService } from '../../../services/api.service';
import { Role } from '../../../interfaces';

@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.component.html',
  styleUrl: './create-client-dialog.component.scss'
})
export class CreateClientDialogComponent {
  readonly roles = Object.keys(Role);

  form: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required]),
    secondName: new FormControl('', [Validators.required]),
    thirdName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required])
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
    this.service.createUser(this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
      }
    )
  }
}
