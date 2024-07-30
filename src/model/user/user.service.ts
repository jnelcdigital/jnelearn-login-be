import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, ILike, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}
  private user = this.dataSource.getRepository(User);

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.user.save(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(findUserDto: FindUserDto) {
    const { kode_cabang, nama_cabang, username, limit, page } = findUserDto;
    const skip = ((page ?? 1) -1) * (limit ?? 10)
    console.log('skip',skip)
    const take = limit ?? 10
    try {
      const [result, total] = await this.user.findAndCount({
        where: {
          nama_cabang: ILike('%' + nama_cabang + '%'),
          kode_cabang: ILike('%' + kode_cabang + '%'),
          username: ILike('%' + username + '%'),
        },
        skip,
        take
      });
      return { data: result, total };
    } catch (error) {
      console.log('error', error)
      throw new InternalServerErrorException();
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
