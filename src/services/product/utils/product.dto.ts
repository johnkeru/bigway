import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProductDocument = ProductDto & Document;
@Schema()
export class ProductDto {
    @Prop()                     // required
    email: string;
    @Prop()
    guserid: string;
    @Prop()
    username: string;           // required
    @Prop({default: false})
    isUserOnline?: boolean;
    @Prop({default: 0})
    commentsLength?: number;
    @Prop({default: ''})
    guserImage: string
    @Prop()
    body: string
    @Prop({default: ''})
    backgroundColor: string
    @Prop()
    name: string;                // required
    @Prop({default: false})
    isPrivate: boolean
    @Prop({default: ''})
    code: string;
    @Prop({default: 0})
    price: number;                  // required
    @Prop({default: ''})
    description: string;
    @Prop({ default: '' })
    image: string;
    @Prop({default: ''})
    category: "Post" | "Picture" | "Product" | "";
    @Prop({default: Date.now()})
    createdAt: Date;
    @Prop({default: Date.now()})
    updatedAt: Date;
}
export const ProductSchema = SchemaFactory.createForClass(ProductDto);