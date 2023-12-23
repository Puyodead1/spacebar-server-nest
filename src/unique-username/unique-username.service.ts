import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UniqueUsernameService {
  private readonly logger = new Logger(UniqueUsernameService.name);

  async usernameSuggestionsUnauthed(globalName: string | undefined) {
    // TODO: Implement this
    // TODO: check if pomelo is enabled
    this.logger.log(`usernameSuggestionsUnauthed: ${globalName}`);
    return { username: globalName ?? 'user28192' };
  }

  async usernameAttemptUnauthed(username: string) {
    // TODO: Implement this
    // TODO: check if pomelo is enabled
    this.logger.log(`uniqueUsernameAttemptUnauthed: ${username}`);
  }
}
