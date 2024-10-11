import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-base-component-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './base-component-button.component.html',
  styleUrls:['./base-component-button.component.css']
})
export class BaseComponent {
  @Input() label: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() type: string = 'button';
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() cssClass: string = '';

  onClick(): void {
    this.clicked.emit();
  }
}
