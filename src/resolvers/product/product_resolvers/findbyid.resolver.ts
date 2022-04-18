import { Injectable } from '@nestjs/common';
import { Args, Query } from '@nestjs/graphql';
import { ProductService } from 'src/services/product/product.service';
import { FTOnlyOneProductResponse } from './../ProductTypes/productresponse';

@Injectable()
export class FindByIdResolver {
    constructor(private productService:ProductService) {}

    @Query(() => FTOnlyOneProductResponse)
    async findById(@Args("_id")_id: string): Promise<FTOnlyOneProductResponse> {
        try {
            if(!_id)return{fault_tolerence: "No id provided"}
            const product = await this.productService.findById(_id)
            product.createdAt = new Date(product.createdAt);
            product.updatedAt = new Date(product.updatedAt);
            product.guserImage = product.guserImage ? product.guserImage : ""
            //@ts-ignore
            return {product}
        } catch {
            return {fault_tolerence: "Something went wrong. Please try again later."}
        }
    }
}