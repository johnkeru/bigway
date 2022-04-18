import { ProductDocument } from "./product.dto";

interface ProductError{
    field: string
    msg: string
}

export interface ProductResponse {
    product?: ProductDocument
    error?: ProductError;
}

export interface ProductResponseList {
    products?: ProductDocument[]
    hasMore: boolean
}