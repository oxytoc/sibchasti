import { Component, Input } from '@angular/core';

import { Part } from '../../interfaces';


@Component({
  selector: 'app-parts',
  templateUrl: './parts.component.html',
  styleUrl: './parts.component.scss'
})
export class PartsComponent {
  @Input() parts: Part[] = [];

}
