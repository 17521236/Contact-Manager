import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { ContactAddComponent } from 'src/app/shared/components/contact-add/contact-add.component';
import { ContactDetailComponent } from 'src/app/shared/components/contact-detail/contact-detail.component';
import { ToastController } from '@ionic/angular';
import { SearchComponent } from 'src/app/shared/components/search/search.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  constructor(
    private contactService: ContactService, 
    private modalController: ModalController, 
    public toastController: ToastController
    ) { }

  ngOnInit() {
    this.contactService.getContacts();
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
        arrContact: this.contactService.contacts
      }
    });
    return await modal.present();
  }

  
}
