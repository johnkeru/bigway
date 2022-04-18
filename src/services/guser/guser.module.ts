import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma_service/prisma.service';
import { GuserService } from './guser.service';

@Module({
  providers: [GuserService, PrismaService],
  exports: [GuserService]
})
export class GuserModule {}
