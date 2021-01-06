import { Injectable } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  data: Contact[] = [];
  constructor() { }

  async search(searchText: string, arr: Contact[]){
      if(searchText == ''){
        this.reset();
        return;
      }
      searchText = searchText.toLowerCase();
      this.data = arr.filter( x => x.name.toLowerCase().indexOf(searchText) !== -1);
  }

  reset(){
    this.data = [];
  }

}
