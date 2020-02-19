import { Description } from './description'
import { Image } from './image'

export class Blog {
    id: string
    category: string
    brief: Description
    title: Description
    content: Description
    date: Date
    videoLink: string
    videoCaption: Description
    version: Number
    coverImage: Image
    viewCount: number
    images: Image[]
}
