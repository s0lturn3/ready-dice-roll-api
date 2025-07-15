import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { jwtConstants } from 'src/models/constants/constants';

//import { ExpiredTokenException } from 'src/models/exceptions/expired-token.exception';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Usuário não logado');

    try {
      const payload = await this.jwtService.verifyAsync( token, { secret: jwtConstants.secret } )
      request['user'] = payload;
    }
    catch (error) {
      if (error.name === 'TokenExpiredError') { throw new UnauthorizedException("Sessão expirada. Faça login novamente."); }
      throw new UnauthorizedException(error);
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Token' ? token : undefined;
  }
}
