import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Response } from 'express';
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  signUp(@Body() singUpDto: SignUpDto) {
    return this.authenticationService.signUp(singUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() singInDto: SignInDto,
  ) {
    const access_token = await this.authenticationService.signIn(singInDto);
    response.cookie('accessToken', access_token, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
    });
    return { message: 'Logged in successfully' };
  }
}
