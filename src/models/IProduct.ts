export interface IProduct {
    id: number
    category: string
    brand: string
    title: string
    price: string
    count: string
    image: string
    description: string
    color: string
    sex: string
}

export interface IProductCart extends IProduct {
    totalCount: number
}
