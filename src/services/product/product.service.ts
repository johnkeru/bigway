import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, ProductDto } from './utils/product.dto';
import { ProductResponse, ProductResponseList } from './utils/product.response';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductDto.name)private product: Model<ProductDocument>){}
    async findAll(cursor: string, limit: number, category?:string, search?:string, guserid?:string): Promise<ProductResponseList> {
        const limit_plus_one = Math.min(10, limit) + 1;
        let products:ProductDocument[] = [] 
        try{
            if(search && cursor && category && guserid){
                products = await this.product.find({
                    $and: [
                        {_id: {$lt: cursor}},
                        {category: category},
                        {guserid: guserid},
                        {$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {body: {$regex: search, $options: 'i'}},
                            {username: {$regex: search, $options: 'i'}},
                            {guserid: {$regex: search, $options: 'i'}},
                        ]}
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(search && cursor && category){
                products = await this.product.find({
                    $and: [
                        {_id: {$lt: cursor}},
                        {category: category},
                        {$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {body: {$regex: search, $options: 'i'}},
                            {username: {$regex: search, $options: 'i'}},
                            {guserid: {$regex: search, $options: 'i'}},
                        ]}
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }


            if(cursor && category && guserid){
                products = await this.product.find({
                    _id: {$lt: cursor},
                    category: category,
                    guserid: guserid
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(cursor && category){
                products = await this.product.find({
                    _id: {$lt: cursor},
                    category: category
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }

            if(search && category && guserid){
                products = await this.product.find({
                    $and: [
                        {category: category},
                        {guserid: guserid},
                        {$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {body: {$regex: search, $options: 'i'}},
                            {username: {$regex: search, $options: 'i'}},
                            {guserid: {$regex: search, $options: 'i'}},
                        ]}
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(search && category){
                products = await this.product.find({
                    $and: [
                        {category: category},
                        {$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {body: {$regex: search, $options: 'i'}},
                            {username: {$regex: search, $options: 'i'}},
                            {guserid: {$regex: search, $options: 'i'}},
                        ]}
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(search && cursor && guserid){
                products = await this.product.find({
                    $and: [
                        {_id: {$lt: cursor}},
                        {guserid: guserid},
                        {$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {body: {$regex: search, $options: 'i'}},
                            {category: {$regex: search, $options: 'i'}},
                            {username: {$regex: search, $options: 'i'}},
                            {guserid: {$regex: search, $options: 'i'}},
                        ]}
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(search && cursor){
                products = await this.product.find({
                    $and: [
                        {_id: {$lt: cursor}},
                        {$or: [
                            {name: {$regex: search, $options: 'i'}},
                            {description: {$regex: search, $options: 'i'}},
                            {body: {$regex: search, $options: 'i'}},
                            {username: {$regex: search, $options: 'i'}},
                            {guserid: {$regex: search, $options: 'i'}},
                        ]}
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }

            if(cursor && guserid){
                products = await this.product.find({
                    _id: {$lt: cursor},
                    guserid: guserid
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(cursor){
                products = await this.product.find({
                    _id: {$lt: cursor}
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }

            if(category && guserid){
                products = await this.product.find({
                    category: category,
                    guserid: guserid
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(category){
                products = await this.product.find({
                    category: category
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }

            if(search && guserid){
                products = await this.product.find({
                    guserid: guserid,
                    $or: [
                        {name: {$regex: search, $options: 'i'}},
                        {category: {$regex: search, $options: 'i'}},
                        {description: {$regex: search, $options: 'i'}},
                        {body: {$regex: search, $options: 'i'}},
                        {username: {$regex: search, $options: 'i'}},
                        {guserid: {$regex: search, $options: 'i'}},
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(search){
                products = await this.product.find({
                    $or: [
                        {name: {$regex: search, $options: 'i'}},
                        {category: {$regex: search, $options: 'i'}},
                        {description: {$regex: search, $options: 'i'}},
                        {body: {$regex: search, $options: 'i'}},
                        {username: {$regex: search, $options: 'i'}},
                        {guserid: {$regex: search, $options: 'i'}},
                    ]
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            if(guserid){
                products = await this.product.find({
                    guserid: guserid
                }).limit(limit_plus_one).sort({_id: -1})
                return {
                    products: products.slice(0, limit),
                    hasMore: products.length === limit_plus_one
                }
            }
            products = await this.product.find({}).limit(limit_plus_one).sort({_id: -1})
            return {
                products: products.slice(0, limit),
                hasMore: products.length === limit_plus_one
            }
        }catch{
            return {
                products: [],
                hasMore: false
            }
        }
    }
    async findById(_id: string): Promise<ProductDocument> {
        return await this.product.findById(_id).exec();
    }
    async delete(_id:string):Promise<string>{
        await this.product.findByIdAndRemove(_id).exec();
        return _id
    }
    // posting area
    async post(prod: ProductDocument): Promise<ProductResponse> {
        // const error = productAuth(prod.name ? prod.name : '')
        // if(error.field) return {error} 
        prod.isUserOnline = true
        prod.image = (prod.image && prod.image.includes('http://')) ? prod.image.replace('http://', 'https://') : prod.image
        const product = await this.product.create(prod);
        return {product}
    }
    async update(prod: ProductDocument):Promise<ProductResponse>{
        prod.image = (prod.image && prod.image.includes('http://')) ? prod.image.replace('http://', 'https://') : prod.image
        try{
            const {name, description, image, body, price, code, isPrivate, updatedAt} = prod
            const product = await this.product.findByIdAndUpdate(prod._id, {
                name, description, image, body, price, code, isPrivate, updatedAt,
            }, {new: true}).exec();
            return {product}
        }catch(e){return null}
    }
    

    // GUSER CHANGE PROFILE PICTURE
    async updateImage(image: string, guserid: string) {
        try{
            image = (image && image.includes('http://')) ? image.replace('http://', 'https://') : image
            await this.product.updateMany({guserid}, {guserImage: image})
        }catch{
            return
        }
    }

    // IS USER ONLINE ??
    
    async isGuserOnline(guserEmail: string){
        try{
            await this.product.updateMany({email: guserEmail}, {isUserOnline: true})
        }catch{
            return
        }
    }
    async isGuserOffline(guserEmail: string){
        try{
            await this.product.updateMany({email: guserEmail}, {isUserOnline: false})
        }catch{
            return
        }
    }


    // COMMENTS AREA...

    async addComment(_id:string){
        try{
            await this.product.updateOne({_id},{$inc: {commentsLength: 1}})
        }catch{
            return
        }
    }

    async removeComment(_id:string){
        try{
            await this.product.updateOne({_id},{$inc: {commentsLength: -1}})
        }catch{
            return
        }
    }
}









// const {commentsLength, createdAt, category, email, guserImage, isUserOnline, username} = prod
