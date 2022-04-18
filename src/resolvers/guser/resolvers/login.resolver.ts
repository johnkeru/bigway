import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { GuserService } from "src/services/guser/guser.service";
import { LoginInput } from "../Types/inputs.ts";
import { FTRegisterResponse } from "../Types/response.dto";

//experimentalDecorators

@Resolver()
export class LoginResolver {
    constructor(private guserService:GuserService){}

    @Mutation(() => FTRegisterResponse, {nullable: true})
    async login(@Args('input')input:LoginInput):Promise<FTRegisterResponse>{
        try{
            const login_response = await this.guserService.login(input)
            return {login: login_response}
        }catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
        
}