import { UseGuards } from "@nestjs/common";
import { Args, Context, Field, Mutation, ObjectType, Resolver } from "@nestjs/graphql";
import { CommentService } from 'src/services/comment/comment.service';
import { GuserService } from 'src/services/guser/guser.service';
import { ProductService } from 'src/services/product/product.service';
import { AuthGuard } from "../guard/currentuser.guard";

@ObjectType()
class FTChangeDPRespo{
    @Field({nullable: true})
    image?: string
    @Field({nullable: true})
    fault_tolerance?: string
}

@Resolver()
export class ChangeProfilePicture{
    constructor(
        private guserService:GuserService,
        private commentService:CommentService,
        private productService:ProductService
        ){}
    
    @UseGuards(AuthGuard)
    @Mutation(() => FTChangeDPRespo, {nullable: true})
    async changedp(
        @Context('guserid')guserid:string, 
        @Context('email')email:string, 
        @Args('image')img:string):Promise<FTChangeDPRespo>{
        try{
            await this.productService.updateImage(img, guserid)
            await this.commentService.changeImage(img, email)
            const image = await this.guserService.changeImage(img, guserid)
            return {image}
        }catch{
            return {fault_tolerance: "Something went wrong. Please try again later."}
        }
    }
}