


export interface AuthorResponse {
    success: boolean,
    message: string,
    data: Author[]
}


export interface Author {
    id: string,
    name: string,
    slug: string,
    image: string
}