import { Image } from './Image'

export class User {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
    homePage: string;
    portrait: Image;
    barcode: Image;
    signature: Image;
    phoneNumber: string;
    aboutMe: string;
    aboutCompany: string;
    aboutPageDescription: string;
    owner: boolean;
    version: number;  
}