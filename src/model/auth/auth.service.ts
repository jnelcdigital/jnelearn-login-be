import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { roundsOfHashing } from './constant/auth.constant';

@Injectable()
export class AuthService {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .addSelect(['user.password'])
      .getOne();

    if (!user) {
      throw new NotFoundException(`No user found for username ${username}`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    const isValidUsername = username === user.username;

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    if (!isValidUsername) {
      throw new UnauthorizedException('Invalid username');
    }

    const accessToken = this.jwtService.sign({ id: user.id });

    // const authData = {
    //   accessToken: this.jwtService.sign({ id: user.id }),
    //   user,
    // };

    // const result = await this.dataSource.getRepository(Auth).save(authData);

    return {
      id: user.id,
      nama_cabang: user.nama_cabang,
      kode_cabang: user.kode_cabang,
      role: user.role,
      accessToken: accessToken,
    };
  }

  async forgotPassword(forgotPasswordDTO: LoginDto) {
    const { password, username } = forgotPasswordDTO;

    const userResult = await this.dataSource.getRepository(User).findOne({
      where: {
        username,
      },
    });

    const hashedPassword = await bcrypt.hash(password, roundsOfHashing);

    userResult.password = hashedPassword;

    const result = await this.dataSource.getRepository(User).save(userResult);
    if (!result) {
      return false;
    }

    return true;
  }

  async seeder() {
    const hashedPassword = await bcrypt.hash('admin123', roundsOfHashing);
    const request = {
      id: 1,
      kode_cabang: 'adm',
      nama_cabang: 'Admin',
      password: hashedPassword,
      username: 'admin',
      role: UserRole.Admin,
    };
    return await this.dataSource.getRepository(User).save(request);
  }
}
