import { Image } from './image'
import { Description } from './description'

export class User {
    id: string;
    firstName: string;
    lastName: string;
    displayName: Description = new Description();
    email: string;
    homePage: string;
    portrait: Image = new Image();
    barcode: Image = new Image();
    signature: Image = new Image();
    phoneNumber: string;
    officePhoneNumber: string;
    faxNumber: string;
    aboutMe: Description = new Description();
    purchaseService: Description = new Description();
    saleService: Description = new Description();
    owner: boolean;
    facebook: string;
    instagram: string;
    youtube: string;    
    version: number;  
}