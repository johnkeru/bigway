import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { GuserService } from "src/services/guser/guser.service";
import { AuthGuard } from "../guard/currentuser.guard";
import { FTRefreshResponse } from "../Types/refresh.dto";

@Resolver()
export class RefreshResolver {
    constructor(private guserService:GuserService){}

    @UseGuards(AuthGuard)
    @Query(() => FTRefreshResponse, {nullable: true})
    async refresh(@Context('email')email:string):Promise<FTRefreshResponse>{
        if(!email) return null
        try{
            const refresh_token = await this.guserService.refresh(email)
            return {refresh_token}
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
}