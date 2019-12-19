export interface Property {
    id: string;
    name: string;
    address: string;
    primaryImgUrl: string;
    imgUrls: string[];
    houseType: string;
    numberOfRooms: number;
    numberOfWashrooms: number;
    area: number;    
    askingPrice: number;
    finalPrice: number;
    onMarketSince: Date;
    dealDate: Date;
}

enum HouseType {
    DETACHED_HOUSE = "Detached House",
    TOWN_HOUSE = "Town House",
    CONDO = "Condo",
}



// private String primaryImgUrl;
// private List<String> imgUrls;
// private HouseType houseType;
// private BigDecimal askingForPrice;
// private BigDecimal finalPrice;
// private LocalDate listingDate;
// private LocalDate dealDate;
// private Integer numberOfRooms;
// private Integer numberOfWashRooms;
// private Double area;