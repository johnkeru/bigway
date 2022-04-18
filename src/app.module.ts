import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { AddComment } from './resolvers/comment/resolvers/addcomments.resolver';
import { GetComments } from './resolvers/comment/resolvers/getcomments.resolver';
import { ChangeProfilePicture } from './resolvers/guser/resolvers/changedp.resolver';
import { GuserResolver } from './resolvers/guser/resolvers/gusers.resolver';
import { LoginResolver } from './resolvers/guser/resolvers/login.resolver';
import { LogoutResolver } from './resolvers/guser/resolvers/logout.resolver';
import { MeResolver } from './resolvers/guser/resolvers/me.resolver';
import { RefreshResolver } from './resolvers/guser/resolvers/refresh.resolver';
import { RegisterResolver } from './resolvers/guser/resolvers/register.resolver';
import { CreateResolver } from './resolvers/product/product_resolvers/create.resolver';
import { DeleteResolver } from './resolvers/product/product_resolvers/delete.resolver';
import { FindByIdResolver } from './resolvers/product/product_resolvers/findbyid.resolver';
import { ProductResolver } from './resolvers/product/product_resolvers/product.resolver';
import { UpdateResolver } from './resolvers/product/product_resolvers/update.resolver';
import { CommentModule } from './services/comment/comment.module';
import { GuserModule } from './services/guser/guser.module';
import { ProductModule } from './services/product/product.module';

const dburl = 'mongodb+srv://kerutman:bXqvqNY6sL5fNdAz@bigway.dqi7m.mongodb.net/product?retryWrites=true&w=majority'

@Module({
  imports: [
    MongooseModule.forRoot(dburl),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      context: ({ req }) => ({ headers: req.headers }),
    }),
    GuserModule,
    ProductModule,
    CommentModule,
  ],
  providers: [
    GuserResolver,
    RegisterResolver,
    MeResolver,
    RefreshResolver,
    LoginResolver,
    ProductResolver,
    DeleteResolver,
    CreateResolver,
    LogoutResolver,
    AddComment,
    GetComments,
    UpdateResolver,
    FindByIdResolver,
    ChangeProfilePicture,
  ]
})
export class AppModule {}
