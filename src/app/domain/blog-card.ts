import { Description } from './description'
import { Image } from './image'

export class BlogCard {
    id: string
    category: string
    brief: Description
    title: Description
    date: Date
    coverageImage: Image
    viewCount: number    
}