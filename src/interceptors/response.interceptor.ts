import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => ({
        error: false,
        errorMessage: null,
        code: response.statusCode || 200,
        body: data,
        metadata: null
      })),
      catchError((err) => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Ocorreu um erro interno no servidor. Tente novamente mais tarde ou tenta o contato direto pelo email.';

        if (err instanceof HttpException) {
          status = err.getStatus();
          message = err.message;
        }

        response.status(status).json({
          error: true,
          errorMessage: message,
          code: status,
          body: null,
          metadata: null
        })

        return new Observable();
      })
    );

  }
}
