import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
})
export class SlideShowComponent implements OnInit {
  img_list = [];
  @Input() collectionImage = [];

  ngOnInit() {
    this.img_list = this.collectionImage;
  }

}
