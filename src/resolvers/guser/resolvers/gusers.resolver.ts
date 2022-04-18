import { Query, Resolver } from '@nestjs/graphql';
import { GuserService } from 'src/services/guser/guser.service';
import { FTGusersResponse } from '../Types/guser.dto';

@Resolver()
export class GuserResolver {
    constructor(private guserService:GuserService){}

  @Query(() => FTGusersResponse, {nullable: true})
    async findAllGuser():Promise<FTGusersResponse>{
        try{
            let gusers = await this.guserService.findAllGuser()
            gusers.map(g => {
                g.created_at = new Date(g.created_at)
                g.updated_at = new Date(g.updated_at)
            })
            return {gusers}
        }
        catch{
            return {
                fault_tolerance: 'Something went wrong. Please try again later.'
            }
        }
    }
}
