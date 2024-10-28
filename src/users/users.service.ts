import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) readonly userRepository: Repository<User>,
  ) {}

  async checkIfEmailExists(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return !!user;
  }

  async create(user: CreateUserDto): Promise<User> {
    const isExist: boolean = await this.checkIfEmailExists(user.email);

    if (isExist) {
      throw new ConflictException(
        `User with this email ${user.email} already exists`,
      );
    }

    const newUser = await this.userRepository.save(user);

    if (!newUser) {
      throw new InternalServerErrorException(
        'User could not be created please try again',
      );
    }

    return newUser;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOneByUsername(name: string): Promise<User[]> {
    const lowerCaseName = name.toLowerCase(); // تحويل الاسم إلى أحرف صغيرة

    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('LOWER(user.name) = :name', { name: lowerCaseName }) // استخدام LOWER في شرط WHERE
      .getMany();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, user: User): Promise<User> {
    const userToUpdate = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.save({
      ...userToUpdate,
      ...user,
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'User could not be updated please try again',
      );
    }

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.remove(user);

    return;
  }
}
