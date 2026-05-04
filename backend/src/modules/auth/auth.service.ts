import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto';
import { createToken } from '../../common/auth/token.util';

@Injectable()
export class AuthService {
  login(dto: LoginDto) {
    const isValid = dto.username.trim().toLowerCase() === 'admin' && dto.password === 'admin';

    if (!isValid) {
      throw new UnauthorizedException('Login ou senha invalidos');
    }

    const token = createToken({ sub: 'admin', username: 'admin', role: 'admin' });

    return {
      accessToken: token,
      tokenType: 'Bearer',
      user: {
        name: 'Administrador',
        email: 'admin@local',
        username: 'admin',
      },
    };
  }
}
