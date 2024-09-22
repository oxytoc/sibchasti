import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Buffer } from 'buffer';

import { Part } from '../../../interfaces';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../../services/api.service';


@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrl: './part.component.scss'
})
export class PartComponent {
  @Input() set setPart(part: Part) {
    this.part = part;
    // const base64 = Buffer.from(part.partImage.data).toString('base64');
    // let base64Source = 'data:image/jpeg;base64,' + base64;
    // this.base64String = this.sanitizer.bypassSecurityTrustUrl(base64Source);

    this.imageUrl = `${this.baseUrl}/databaseFile/${part.partImageId}`
    this._loading.next(false);
  };
  // base64String: any;
  private baseUrl = this.service.baseUrl;
  imageUrl = '';

  part: Part = null;
  private _loading = new BehaviorSubject<boolean>(true);
  loading$ = this._loading.asObservable();

  constructor(
    // private sanitizer: DomSanitizer,
    private service: ApiService,
  ) { }
}
