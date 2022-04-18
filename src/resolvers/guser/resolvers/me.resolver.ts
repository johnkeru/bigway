import { UseGuards } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { GuserService } from 'src/services/guser/guser.service';
import { ProductService } from 'src/services/product/product.service';
import { AuthGuard } from "../guard/currentuser.guard";
import { FTMeResponse } from "../Types/guser.dto";

@Resolver()
export class MeResolver {
    constructor(
        private guserService:GuserService,
        private productService:ProductService
    ){}
    
    @UseGuards(AuthGuard)
    @Query(() => FTMeResponse)
    async me(@Context('email')email:string):Promise<FTMeResponse>{
        try{
            if(!email)return {fault_tolerance: null, guser: null}
            await this.productService.isGuserOnline(email)
            const guser = await this.guserService.findByEmail(email)
            guser.created_at = new Date(guser.created_at)
            guser.updated_at = new Date(guser.updated_at)
            return {guser}
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }

    @Query(() => FTMeResponse)
    async findGuserById(@Args('id', {defaultValue: ""})id:string):Promise<FTMeResponse>{
        try{
            if(!id)return {guser: null}
            const guser = await this.guserService.findGuserById(id)
            guser.created_at = new Date(guser.created_at)
            guser.updated_at = new Date(guser.updated_at)
            return {guser}
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }

}