import { Injectable } from '@angular/core';
import { Contact, ContactCreate } from '../models/contact.model';
import { ProxyService } from '../proxy.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ProxyService {

  contacts = [];
  arrAlpha = [];

  contactsFavorites = [];
  arrAlphaFavorites = [];

  constructor() {
    super();
    //  this.removeObject('contact')
  }

  async getContacts(){
    this.contacts = await this.getObject('contact');
    if(this.contacts){
      this.contacts = await this.sortContacts(this.contacts);
      this.arrAlpha = await this.getArrAlpha( this.contacts);
    }
    return this.contacts?this.contacts:[];
  }

  async getContactsFavorites(){
    this.contactsFavorites = await this.getObject('contact');
    if(this.contactsFavorites){
      this.contactsFavorites = this.contactsFavorites.filter(x => x.isFavorite);
      this.contactsFavorites = this.sortContacts(this.contactsFavorites);
      this.arrAlphaFavorites = this.getArrAlpha(this.contactsFavorites);
    }
    return this.contacts?this.contacts:[];
  }

  sortContacts(contacts: Contact[]): Contact[] {
    contacts.sort((a, b) => {
      return a.name > b.name ? 1 : (a.name < b.name ? -1 : 0);
    });
    return contacts;
  }

  getArrAlpha(contacts: Contact[]): string[]{
    let arrAlpha = [];
    for (let contact of contacts){
      const index = arrAlpha.findIndex(x => x === contact.name[0]);
      if (index === -1){
        arrAlpha.push(contact.name[0]);
      }
    }
    return arrAlpha;
  }

  async createContact(item: ContactCreate): Promise<any> {
    let result =  await this.create(item, 'contact');
    await this.getContacts();
    await this.getContactsFavorites();
    return result;
  }

  async updateContact(item: Contact): Promise<any> {
    let result =  await this.update(item, 'contact');
    await this.getContacts();
    await this.getContactsFavorites();
    return result;
  }

  async deleteContact(id: number): Promise<any> {
    let result = await this.delete(id, 'contact');
    await this.getContacts();
    await this.getContactsFavorites();
    return result;
  }

  async getContact(id: number): Promise<any> {
    return await this.getOne(id, 'contact');
  }

}
