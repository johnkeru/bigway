import { Injectable } from "@nestjs/common";
import { Args, Mutation } from "@nestjs/graphql";
import { ProductService } from "src/services/product/product.service";

@Injectable()
export class DeleteResolver {
    constructor(private productService:ProductService) {}

    @Mutation(() => String)
    async delete(@Args('_id') _id: string): Promise<string> {
        return await this.productService.delete(_id)
    }
 
}