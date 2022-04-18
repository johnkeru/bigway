import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "src/resolvers/guser/guard/currentuser.guard";
import { CommentService } from 'src/services/comment/comment.service';
import { ProductService } from 'src/services/product/product.service';
import { AddCommentInput, FTAddCommentResponse } from "../dto/comment.dto";


@Resolver()
export class AddComment{
    
    constructor(
        private commentService:CommentService,
        private productService:ProductService
    ){}

    @UseGuards(AuthGuard)
    @Mutation(() => FTAddCommentResponse)
    async addComment(
        @Context('email')email:string,
        @Context('username')username:string,
        @Args('input'){...input}: AddCommentInput):Promise<FTAddCommentResponse>
        {
            const {productId} = input
            const body = Object.assign({email, username}, input);
            if(!email || !username) return {comment: null, fault_tolerance: 'no_user'}
            try{
                await this.productService.addComment(productId)
                const comment = await this.commentService.addComment(body as any)
                comment.createdAt = new Date(comment.createdAt)
                comment.updatedAt = new Date(comment.updatedAt)
                return {comment}
            }catch{
                return {fault_tolerance: 'Something went wrong. Please try again later.'}
            }
        }
}