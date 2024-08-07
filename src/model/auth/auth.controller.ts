import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './constant/auth.constant';

@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: LoginResponse })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @ApiOkResponse({ type: Boolean })
  async forgotPassword(@Body() loginDto: LoginDto) {
    return await this.authService.forgotPassword(loginDto);
  }

  @Get('seeder')
  @ApiOkResponse({ type: Boolean })
  async seeder() {
    return await this.authService.seeder();
  }
}
