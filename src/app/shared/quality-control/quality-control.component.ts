import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'events';

@Component({
  selector: 'app-quality-control',
  templateUrl: './quality-control.component.html',
  styleUrls: ['./quality-control.component.scss']
})
export class QualityControlComponent implements OnInit {
  @Input() quantity: number;
  @Output() onChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  plusOne() {
    if (this.quantity < 1000) {
      this.quantity++;
      this.onChange.emit(this.quantity);
    }
  }

  minusOne() {
    if (this.quantity > 1) {
      this.quantity--;
      this.onChange.emit(this.quantity);
    }
  }

}
