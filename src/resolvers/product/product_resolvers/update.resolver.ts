import { Injectable, UseGuards } from "@nestjs/common";
import { Args, Context, Mutation } from '@nestjs/graphql';
import { AuthGuard } from "src/resolvers/guser/guard/currentuser.guard";
import { ProductService } from 'src/services/product/product.service';
import { ProductInput } from './../ProductTypes/input.dto';
import { FTProductResponse } from './../ProductTypes/productresponse';

@Injectable()
export class UpdateResolver{
    constructor(private productService:ProductService){}
    
    @UseGuards(AuthGuard)
    @Mutation(() => FTProductResponse, {nullable: true})
    async update(
        @Context('email')email:string,
        @Context('username')username:string,
        @Args('input'){...input}:ProductInput):Promise<FTProductResponse>{
            
            if(!email || !username) return {fault_tolerence: 'Unauthorized'}
            const payload = Object.assign({email, username}, input)
            try{
                const product = await this.productService.update(payload as any)
                product.product.createdAt = new Date(product.product.createdAt);
                product.product.updatedAt = new Date(product.product.updatedAt);
                product.product.guserImage = product.product.guserImage ? product.product.guserImage : ""
                //@ts-ignore
                return {product}
            }catch{
                return {fault_tolerence: 'Something went wrong. Please try again later.'}
            }
    }
}