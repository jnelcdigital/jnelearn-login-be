import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataSource, ILike, Like } from 'typeorm';
import { User } from './entities/user.entity';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';
import { roundsOfHashing } from '../auth/constant/auth.constant';

@Injectable()
export class UserService {
  constructor(private dataSource: DataSource) {}
  private user = this.dataSource.getRepository(User);

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;
    try {
      return await this.user.save(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll(findUserDto: FindUserDto) {
    const { kode_cabang, nama_cabang, username, size, page } = findUserDto;
    const skip = ((page ?? 1) - 1) * (size ?? 10);
    const take = size ?? 10;

    const where = [];
    if (nama_cabang) {
      where.push({ nama_cabang: ILike('%' + nama_cabang + '%') ?? '' });
    } else if (kode_cabang) {
      where.push({ kode_cabang: ILike('%' + kode_cabang + '%') ?? '' });
    } else if (username) {
      where.push({ username: ILike('%' + username + '%') ?? '' });
    }

    try {
      const [result, total] = await this.user.findAndCount({
        where,
        skip,
        take,
      });
      return { data: result, total };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.user.findOne({
        where: {
          id,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    try {
      const userResult = await this.user.findOne({ where: { id } });
      if (!userResult) {
        throw new NotFoundException('User does not exist');
      }

      userResult.kode_cabang = updateUserDto.kode_cabang;
      userResult.nama_cabang = updateUserDto.nama_cabang;
      userResult.password = updateUserDto.password;
      userResult.username = updateUserDto.username;
      userResult.role = updateUserDto.role;

      return await this.user.save(userResult);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    try {
      const result = this.user.delete(id);
      if (result) {
        return true;
      }
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
