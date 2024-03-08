import { UserErrors, UserRepository } from '../user/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({ username, password: hashedPassword });

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      if (error.code == UserErrors.DUPLICATE)
        throw new ConflictException('Username already in use!');
    }

    return this.userRepository.createUser(username, password);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
