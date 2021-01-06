import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ICopyContact } from 'src/app/models/contact.model';
import { ContactAddComponent } from 'src/app/shared/components/contact-add/contact-add.component';


@Component({
  selector: 'app-recent',
  templateUrl: './recent.page.html',
  styleUrls: ['./recent.page.scss'],
})
export class RecentPage implements OnInit {

  copyContact: ICopyContact;

  constructor(private barcodeScanner: BarcodeScanner, private modalController:ModalController) { }

  ngOnInit() {
  }

  async scanCode(){
    try {
      const dataScanner = await this.barcodeScanner.scan();
      this.copyContact = JSON.parse(dataScanner.text);
      await this.showAddContact(this.copyContact);
    } catch (error) {
      alert(error);
    }
  }

  async showAddContact(copyContact: ICopyContact){
    const modal = await this.modalController.create({
      component: ContactAddComponent,
      componentProps:{
        copyContact
      }
    });
    return await modal.present();
  }
}
