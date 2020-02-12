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
    aboutCompany: Description = new Description();
    aboutPageDescription: Description = new Description();
    owner: boolean;
    version: number;  
}