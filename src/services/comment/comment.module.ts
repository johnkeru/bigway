import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma_service/prisma.service';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentService, PrismaService],
  exports: [CommentService]
})
export class CommentModule {}
