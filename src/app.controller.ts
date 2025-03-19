import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Contato')
@Controller('api/app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Realiza o envio de e-mail com os dados fornecidos no formulário de contato.' })
  @ApiResponse({ status: 200, description: 'E-mail enviado com sucesso' })
  @ApiResponse({ status: 400, description: 'Todos os campos do formulário são obrigatórios' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro ao enviar o e-mail' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
