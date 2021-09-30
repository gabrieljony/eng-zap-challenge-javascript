import { Component, Input, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))]),
      transition('* => void', [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]),
    ])
  ]
})
export class SlideShowComponent implements OnInit {

  current = 0;
  img_list = [];

  @Input() collectionImage = [];

  constructor() { }

  ngOnInit() {
    this.img_list = this.collectionImage;
  }

  previous() {
    if (this.current === 0) {
      this.current = this.img_list.length - 1;
      return;
    } else {
      this.current = --this.current;
      return;
    }
  }

  next() {
    this.current = ++this.current % this.img_list.length;
  }

}
