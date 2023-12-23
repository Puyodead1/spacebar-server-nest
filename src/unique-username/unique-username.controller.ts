import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UniqueUsernameService } from './unique-username.service';

@Controller('unique-username')
export class UniqueUsernameController {
  constructor(private readonly uniqueUsernameService: UniqueUsernameService) {}

  @Get('username-suggestions-unauthed')
  async usernameSuggestionsUnauthed(@Query('global_name') globalName?: string) {
    this.uniqueUsernameService.usernameSuggestionsUnauthed(globalName);
  }

  @Post('username-attempt-unauthed')
  async usernameAttemptUnauthed(@Body('username') username: string) {
    return this.uniqueUsernameService.usernameAttemptUnauthed(username);
  }
}
