import { UseGuards } from "@nestjs/common";
import { Context, Mutation, Resolver } from "@nestjs/graphql";
import { GuserService } from "src/services/guser/guser.service";
import { ProductService } from "src/services/product/product.service";
import { AuthGuard } from "../guard/currentuser.guard";

@Resolver()
export class LogoutResolver {
    constructor(
        private guserService:GuserService,
        private productService:ProductService
        ){}
    
    @UseGuards(AuthGuard)
    @Mutation(() => String)
    async logout(@Context('email')email:string):Promise<string>{
        try{
            await this.productService.isGuserOffline(email);
            const res = await this.guserService.logout(email)
            return !res ? 'try again.' : res
        }catch{
            return "Something went wrong. Please try again later."
        }
    }
}