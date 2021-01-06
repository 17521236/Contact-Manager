import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { SearchService } from '../../services/search.service';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  @Input() arrContact:Contact[];
  searchText = '';
  constructor(
    public searchService: SearchService,
    private modalController:ModalController
    ) { }

  ngOnInit() {
  }

  async search(){
    await this.searchService.search(this.searchText, this.arrContact);
  }

  async showDetail(contact: Contact){
    const modal = await this.modalController.create({
      component: ContactDetailComponent,
      componentProps: {
        'contact': contact
      }
    });
    return await modal.present();
  }

  async back(){
    this.searchService.reset();
    await this.modalController.dismiss();
  }
}
