import { Image } from './image'
import { Description } from './description'

export class User {
    id: string;
    firstName: string;
    lastName: string;
    displayName: Description;
    email: string;
    homePage: string;
    portrait: Image;
    barcode: Image;
    signature: Image;
    phoneNumber: string;
    officePhoneNumber: string;
    faxNumber: string;
    aboutMe: Description;
    purchaseService: Description;
    saleService: Description;
    owner: boolean;
    facebook: string;
    instagram: string;
    youtube: string;    
    version: number;  
    totalVisits: number
}