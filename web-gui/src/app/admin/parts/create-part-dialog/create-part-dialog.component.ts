import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { getMakes, getModels } from 'car-info';

import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-create-part-dialog',
  templateUrl: './create-part-dialog.component.html',
  styleUrl: './create-part-dialog.component.scss'
})
export class CreatePartDialogComponent {
  readonly brands = getMakes();

  form: FormGroup = this.formBuilder.group({
    brand: new FormControl('', [Validators.required]),
    carModel: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    price: new FormControl(null, [Validators.required, Validators.min(0)]),
    quantity: new FormControl(null, [Validators.required, Validators.min(1)]),
    article: new FormControl(null, [Validators.required, Validators.min(0)]),
    vin: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
  })

  constructor(
    private formBuilder: FormBuilder,
    private service: ApiService,
    private dialogRef: MatDialogRef<CreatePartDialogComponent>
  ) { }

  isSavingDisable(): boolean {
    return this.form.invalid;
  }

  createPart(): void {
    this.service.createPart(this.form.value).subscribe(
      () => {
        this.dialogRef.close(true);
      }
    )
  }

  getModelsCar(carBrand: string): string[] {
    if (!carBrand.length) {
      return [];
    }
    return getModels(carBrand);
  }
}
