import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GuserService } from "src/services/guser/guser.service";
import { RegiserInput } from "../Types/inputs.ts";
import { FTRegisterResponse } from "../Types/response.dto";

@Resolver()
export class RegisterResolver {
    constructor(private guserService:GuserService) {}
    
    @Mutation(() => FTRegisterResponse, {nullable: true})
    async register(@Args('input')input:RegiserInput):Promise<FTRegisterResponse>{
        try{
            const register_response = await this.guserService.register(input)
            return {
                register: register_response
            }
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
}