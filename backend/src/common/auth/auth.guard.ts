import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { verifyToken } from './token.util';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization as string | undefined;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token nao informado');
    }

    const token = authHeader.replace('Bearer ', '').trim();
    const payload = verifyToken(token);

    if (!payload) {
      throw new UnauthorizedException('Token invalido');
    }

    request.user = payload;
    return true;
  }
}
