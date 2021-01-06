import { Photo } from "../shared/models/photo";

export interface ICopyContact{
    name: string;
    mobile: string;
    fax?: string;
    email?: string;
    facebook?: string;
    address?: string;
    isFavorite?: boolean;
    organization?: string;
}

export interface Contact {
    id: number;
    name: string;
    mobile: string;
    fax?: string;
    email?: string;
    facebook?: string;
    address?: string;
    avatar?: Photo;
    background?: Photo;
    isFavorite?: boolean;
    organization?: string;
}

export class ContactCreate {
    name: string;
    mobile: string;
    fax?: string;
    email?: string;
    facebook?: string;
    address?: string;
    avatar?: Photo;
    background?: Photo;
    isFavorite?: boolean;
    organization?: string;

    constructor(name , mobile, fax = null, email = null, facebook = null, address = null, avatar = null, background = null, organization = null){
        this.name           = name;
        this.organization   = organization;
        this.mobile         = mobile;
        this.fax            = fax;
        this.email          = email;
        this.facebook       = facebook;
        this.address        = address;

        if(!avatar || avatar.webviewPath == ''){
            this.avatar = {
                filepath:new Date().getTime() + '.jpeg',
                webviewPath:'https://www.gqmiddleeast.com/sites/all/themes/gq/images/user-default.png'
            }
        }else{
            this.avatar = avatar;
        }

        if(!background || background.webviewPath == ''){
            this.background = {
                filepath:new Date().getTime() + '.jpeg',
                webviewPath:'https://www.litmus.com/wp-content/uploads/2020/04/ultimate-guide-to-background-images-in-email.png'
            }
        }else{
            this.background = background;
        }
        
        this.isFavorite = false;
    }
}