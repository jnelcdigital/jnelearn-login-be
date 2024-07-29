import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Auth } from './entities/auth.entity';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';

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

    const isPasswordValid = user.password === password;
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const token = await this.dataSource
      .getRepository(Auth)
      .findOne({ where: { employee: { id: user.id } } });

    if (token) {
      token.accessToken = this.jwtService.sign({ userId: user.id });
    }

    const authData = {
      accessToken: this.jwtService.sign({ userId: user.id }),
      user,
    };

    const result = await this.dataSource
      .getRepository(Auth)
      .save(token ? token : authData);

    return {
      accessToken: result.accessToken,
    };
  }
}
