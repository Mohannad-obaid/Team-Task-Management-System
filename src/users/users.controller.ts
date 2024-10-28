import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ParsUsernamePipe } from 'src/common/pipes/pars-username.pipe';
import { User } from 'src/database/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ParsEmailePipe } from 'src/common/pipes/pars-email.pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':username')
  async findOne(@Param('username', ParsUsernamePipe) username: string) {
    return await this.usersService.findOneByUsername(username);
  }

  @Get('email/:email')
  async findOneByEmail(@Param('email', ParsEmailePipe) email: string) {
    return await this.usersService.findOneByEmail(email);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: any, // يُفضل استخدام DTO للنوع بدلاً من `any`
    //@Req() req: Request,
  ) {
    // const currentUser = req.user;

    // if (currentUser.id !== id && currentUser.role !== 'Admin') {
    //   throw new ForbiddenException(
    //     'You do not have permission to update this user',
    //   );
    // }

    // if (currentUser.role !== 'Admin') {
    //   delete updateUserDto.role;
    //   delete updateUserDto.email;
    // }

    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.remove(id);
  }
}
