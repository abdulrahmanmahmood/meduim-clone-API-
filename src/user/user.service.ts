import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    this.userRepository.save(newUser);
    return {
      message: 'User created successfully',
    };
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.findOne(id);

    if (!user) {
      return {
        message: 'User not found',
      };
    }

    const updatedUser = Object.assign(user, updateUserDto);
    this.userRepository.save(updatedUser);
    return {
      message: 'User updated successfully',
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
