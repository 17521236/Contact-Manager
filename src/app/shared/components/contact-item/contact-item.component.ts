import { Component, Input, OnInit } from '@angular/core';
import { Photo } from '../../models/photo';

@Component({
  selector: 'app-contact-item',
  templateUrl: './contact-item.component.html',
})
export class ContactItemComponent implements OnInit {

  @Input() title       = '';
  @Input() avatar: Photo;
  @Input() description = '';
  @Input() isShowStar  = true;
  @Input() isFavorite  = false;


  constructor() { }

  ngOnInit() {
  }

  
}
