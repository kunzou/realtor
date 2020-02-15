import { Image } from './image'
import { Description } from './description';
import { Highlight } from './highlight';

export class Property {
    id: string;
    address: string;
    primaryImage: Image;
    additionalImages: Image[];
    source: string;
    propertyType: string;
    propertyStatus: string;
    propertyStyle: string;
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
    tag: Description = new Description();
    neighborhood: string;
    levels: number;
    propertyTax: number;
    listingNumber: number;
    garage: string;
    garageSize: string;
    basementCondition: string;
    upgrades: string[] = [];
    upgradesEnglish: string;
    lotArea: number;
    usage: string;
    holdType: string;
    remaining: string[] = [];
    features: Highlight[] = [];
    openHouseDate: Date;
}