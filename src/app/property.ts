export class Property {
    id: string;
    address: string;
    primaryImgUrl: string;
    imgUrls: string[];
    houseType: HouseType;
    houseStatus: HouseStatus;
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