export class Property {
    id: string;
    address: string;
    primaryImgUrl: string;
    imgUrls: string[];
    propertyType: string;
    houseStatus: string;
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