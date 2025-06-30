import {
  Body,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingService } from '../hashing/hashing.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      await this.userRepository.save(user);
    } catch (error) {
      throw new ConflictException(
        `User with this email already exists ${error}`,
      );
    }
  }
  async signIn(signInDto: SignInDto) {
    console.log(signInDto);
    const user = await this.userRepository.findOne({
      where: { email: signInDto.email },
      select: ['id', 'email', 'password'],
    });
    if (!user)
      throw new UnauthorizedException('Email or password is incorrect');
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) new UnauthorizedException('Email or password is incorrect');
    return true;
  }
}
