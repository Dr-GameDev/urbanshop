

export type ProductProps = {
    _id?: string;
    name: string;
    slug?: string;
    description?: string;
    price: number;
    imageUrl: string;
    category: string;
    quantity?: number
}