import { Image } from './Image'

export class User {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    displayNameEnglish: string;
    email: string;
    homePage: string;
    portrait: Image;
    barcode: Image;
    signature: Image;
    phoneNumber: string;
    aboutMe: string;
    aboutMeEnglish: string;
    aboutCompany: string;
    aboutCompanyEnglish: string;
    aboutPageDescription: string;
    aboutPageDescriptionEnglish: string;
    owner: boolean;
    version: number;  
}