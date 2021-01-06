import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Contact, ContactCreate } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { CallService } from '../../services/call.service';
import { MapService } from '../../services/map.service';
import { ContactAddComponent } from '../contact-add/contact-add.component';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';
import { QrCodeComponent } from '../qr-code/qr-code.component';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact;

  constructor(
    private modalController: ModalController,
    private callService: CallService, 
    private mapService: MapService,
    private actionSheetController: ActionSheetController,
    private contactService: ContactService,
    private alertController: AlertController
    ) { 
  }

  ngOnInit() {
  }

  call(phoneNum){
    this.callService.call(phoneNum)
    .then(x => console.log(x))
    .catch(err => console.log(err));
  }

  goToMap(){
    this.mapService.goToMap(this.contact.address);
  }

  back(){
    this.modalController.dismiss().then().catch();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          await this.presentAlertConfirm();
        }
      }, {
        text: 'Edit',
        icon: 'create-outline',
        handler: async () => {
            await this.modalController.dismiss();
            await this.showEdit(this.contact);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => { }
      }]
    });
    await actionSheet.present();
  }

  async showEdit(contact: Contact){
      const modal = await this.modalController.create({
        component: ContactEditComponent,
        componentProps: {
          'contact': contact
        }
      });
      return await modal.present();
  }

  async updateFavorite(){
    this.contact.isFavorite = !this.contact.isFavorite;
    await this.contactService.updateContact(this.contact);
  }


  // alert
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you want remove this contact ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: async (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Remove',
          cssClass: 'danger',
          handler: async () => {
            await this.contactService.deleteContact(this.contact.id);
            this.back();
          }
        }
      ]
    });

    await alert.present();
  }



  // qrmodal

  async showQrModal(){
    const copyContact: any = [this.contact].map(({id,avatar,background,...rest}) => rest)[0];
    const modal = await this.modalController.create({
      component: QrCodeComponent,
      componentProps: {
        'valueQr': copyContact
      }
    });
    return await modal.present();
  }

}


