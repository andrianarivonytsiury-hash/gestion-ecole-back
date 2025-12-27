import { Controller, Get } from '@nestjs/common';
import { UserRecord, UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  list(): UserRecord[] {
    return this.usersService.list();
  }
}
