import { Module } from '@nestjs/common';
import { UniqueUsernameController } from './unique-username.controller';
import { UniqueUsernameService } from './unique-username.service';

@Module({
  controllers: [UniqueUsernameController],
  providers: [UniqueUsernameService],
})
export class UniqueUsernameModule {}
