import { Image } from './image'
import { Description } from './description'

export class PropertyCard {
    id: string
    primaryImage: Image
    tag: Description
    address: string
    neighborhood: string
    propertyType: string
    askingPrice: Number
    numberOfRooms: Number
    numberOfWashrooms: Number
    openHouseDate: Date
    location: {lat: number; lng: number;};
}