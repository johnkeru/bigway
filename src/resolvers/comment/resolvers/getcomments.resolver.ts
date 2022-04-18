import { Args, Query, Resolver } from "@nestjs/graphql";
import { CommentService } from "src/services/comment/comment.service";
import { FTGetCommentsResponse, GetCommentsInput } from "../dto/comment.dto";


@Resolver()
export class GetComments {
    constructor(private commentService:CommentService){}

    @Query(() => FTGetCommentsResponse)
    async getComments(@Args('input')input:GetCommentsInput):Promise<FTGetCommentsResponse>{
        const {limit, cursor, productId} = input
        try{
            const comments = await this.commentService.getComments(limit, cursor, productId)
            comments.comments.map(comment => {
                comment.createdAt = new Date(comment.createdAt)
                comment.updatedAt = new Date(comment.updatedAt)
            })
            return {comments}
        }catch (e){
            console.log(e)
            return {fault_tolerance: 'Something went wrong. Please try again later.'}
        }
    }

    @Query(() => String)
    sayHi(){
        return 'Hello'
    }

}