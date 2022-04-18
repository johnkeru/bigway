import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductDto, ProductSchema } from './utils/product.dto';
import { ProductService } from './product.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductDto.name, schema: ProductSchema }])],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule {}
