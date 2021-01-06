import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ContactAddComponent } from 'src/app/shared/components/contact-add/contact-add.component';
import { ContactDetailComponent } from 'src/app/shared/components/contact-detail/contact-detail.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(public modalController: ModalController, private contactService: ContactService) { }

  async ngOnInit() {
    await this.contactService.getContactsFavorites();
    console.log(this.contactService.arrAlphaFavorites);
    console.log(this.contactService.contactsFavorites);
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

  async showAddContact(){
    const modal = await this.modalController.create({
      component: ContactAddComponent
    });

    return await modal.present();
  }

  async showSearchModal(){
    const modal = await this.modalController.create({
      component: SearchComponent,
      componentProps:{
        arrContact: this.contactService.contactsFavorites
      }
    });
    return await modal.present();
  }

}
