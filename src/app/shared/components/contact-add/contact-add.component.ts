import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ContactCreate, ICopyContact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['../contact-detail/contact-detail.component.scss']
})
export class ContactAddComponent implements OnInit {

  @Input() copyContact: ICopyContact;
  contact: ContactCreate ;
  formGroup: FormGroup ; 

  constructor(private fb: FormBuilder, private modalController: ModalController, private contactService:ContactService, private photoService:PhotoService) { 
  }

  ngOnInit() {
    if(this.copyContact){
      this.contact = new ContactCreate(this.copyContact.name,this.copyContact.mobile,this.copyContact.fax,this.copyContact.email,this.copyContact.facebook,this.copyContact.address,null,null,this.copyContact.organization);
    }else{
      this.contact = new ContactCreate('','');
    }

    this.formGroup = this.fb.group({
      name:[this.contact.name, Validators.required],
      mobile: [this.contact.mobile,Validators.required],
      fax: this.contact.fax, 
      email: this.contact.email,
      facebook: this.contact.facebook,
      address: this.contact.address,
      organization: this.contact.organization
    })
  }

  async onSubmit(){
    if(this.formGroup.valid){
      this.saveContact();
      await this.contactService.createContact(this.contact);
      this.modalController.dismiss().then().catch();
    }else{
      this.formGroup.markAllAsTouched();
    }
  }

  back(){
    this.modalController.dismiss().then().catch();
  }

  saveContact(){
    this.contact.name = this.formGroup.controls['name'].value;
    this.contact.mobile = this.formGroup.controls['mobile'].value;
    this.contact.fax = this.formGroup.controls['fax'].value;
    this.contact.email = this.formGroup.controls['email'].value;
    if(this.formGroup.controls['facebook'].value){
      let fbLink = this.formGroup.controls['facebook'].value;
      fbLink = fbLink.indexOf('https://') == -1 ? 'https://' + fbLink : fbLink;
      this.contact.facebook = fbLink;
    }
    this.contact.address = this.formGroup.controls['address'].value;
    this.contact.organization = this.formGroup.controls['organization'].value;
  }

  async takePhoto(){
    let img = await this.photoService.addNewToGallery();
    if(img){
      img = await this.photoService.loadSavedOne(img);
      this.contact.avatar = img;
    }
  }

  async takePhotoBackground(){
    let img = await this.photoService.addNewToGallery();
    if(img){
      img = await this.photoService.loadSavedOne(img);
      this.contact.background = img;
    }
  }
}
