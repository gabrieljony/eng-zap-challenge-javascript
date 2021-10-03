import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {

  @Input() product = null;

  constructor() { }

  ngOnInit() {

    console.log('this.product', this.product)
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)

  }

}
