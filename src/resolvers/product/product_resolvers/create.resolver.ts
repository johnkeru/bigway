import { Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation } from "@nestjs/graphql";
import { AuthGuard } from "src/resolvers/guser/guard/currentuser.guard";
import { ProductService } from "src/services/product/product.service";
import { ProductInput } from "../ProductTypes/input.dto";
import { FTProductResponse } from "../ProductTypes/productresponse";

@Injectable()
export class CreateResolver {
    constructor(private productService:ProductService) {}

    @UseGuards(AuthGuard)
    @Mutation(() => FTProductResponse, {nullable: true})
    async create(
        @Context('email')email: string, 
        @Context('username')username:string,
        @Context('guserid')guserid:string,
        @Args('input'){...anything}: ProductInput): Promise<FTProductResponse> {
        if(!email) return {product:null}
        if(!username) return {product:null}
        const prod = Object.assign({email, username, guserid}, anything)
        try{
            let product = await this.productService.post(prod as any)
            product.product.createdAt = new Date(product.product.createdAt);
            product.product.updatedAt = new Date(product.product.updatedAt);
            product.product.guserImage = product.product.guserImage ? product.product.guserImage : ""
            if(product.error) product = {error: product.error, product: null} 
            //@ts-ignore
            return {product};
        }catch{
            return {
                fault_tolerence: "Error in creating product"
            }
        }
    }
}