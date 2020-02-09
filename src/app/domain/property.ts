import { Image } from './image'
import { Description } from './description';

export class Property {
    id: string;
    address: string;
    primaryImage: Image;
    additionalImages: Image[];
    source: string;
    propertyType: string;
    propertyStatus: string;
    yearBuilt: number;
    description: Description = new Description();
    descriptionEnglish: string;
    numberOfRooms: number;
    numberOfWashrooms: number;
    area: number;
    askingPrice: number;
    finalPrice: number;
    onMarketSince: Date;
    dealDate: Date;
    hide: boolean;
    location: {lat: number; lng: number;};
    aboutPageComment: string;
    youtubeLink: string;
    tag: string;
    neighborhood: string;
    levels: number;
    propertyTax: number;
    listingNumber: number;
    garageType: string;
    basementCondition: string;
    upgrades: string[] = [];
    upgradesEnglish: string;
    lotArea: number;
}