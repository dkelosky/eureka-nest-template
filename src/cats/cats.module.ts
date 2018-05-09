import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  // providers: [CatsService],
  components: [CatsService],
})
export class CatsModule { }
