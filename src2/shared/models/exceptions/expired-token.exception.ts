import { UnauthorizedException } from "@nestjs/common";

export class ExpiredTokenException extends UnauthorizedException {
   constructor() {
     super('Sessão expirada. Faça login novamente.', { cause: 'Token de acesso expirado. Necessário fazer login novamente.' });
   }
}