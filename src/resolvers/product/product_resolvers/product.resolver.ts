import { Args, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from 'src/services/product/product.service';
import { ProductsInput } from '../ProductTypes/input.dto';
import { FTProductResponseList } from '../ProductTypes/productresponse';

@Resolver()
export class ProductResolver {
    constructor(private productService:ProductService) {}

    @Query(() => FTProductResponseList,{nullable: true})
    async products(@Args('input') input: ProductsInput
    ):Promise<FTProductResponseList> {
        const {cursor, limit, category, search, guserid}:ProductsInput = input
        try{
            const products = await this.productService.findAll(cursor, limit, category, search, guserid)
            products.products.map(product => {
                product.createdAt = new Date(product.createdAt);
                product.updatedAt = new Date(product.updatedAt);
                product.guserImage = product.guserImage ? product.guserImage : ""
            })
            //@ts-ignore
            return products;
        }catch{
            return {
                fault_tolerence: "Error in getting products. Please try again later."
            }
        }
    }
}
