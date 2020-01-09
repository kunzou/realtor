export class Property {
    id: string;
    address: string;
    primaryImage: Image;
    additionalImages: Image[];
    source: string;
    propertyType: string;
    propertyStatus: string;
    yearBuilt: number;
    description: string;
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
}

class Image {
    link: string;
    smallLink: string;
    mediumLink: string;
    largeLink: string;
}

enum HouseType {
    DETACHED_HOUSE = "Detached House",
    TOWN_HOUSE = "Town House",
    CONDO = "Condo",
}

enum HouseStatus {
    ON_MARKET = "On market",
    SOLD = "Sold",
}