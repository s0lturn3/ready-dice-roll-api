import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadService } from 'src/services/upload.service';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: 'Realiza o envio de e-mail com os dados fornecidos no formulário de contato.' })
  @ApiResponse({ status: 200, description: 'E-mail enviado com sucesso' })
  @ApiResponse({ status: 400, description: 'Todos os campos do formulário são obrigatórios' })
  @ApiResponse({ status: 500, description: 'Ocorreu um erro ao enviar o e-mail' })
  @Post("/")
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any) {
    console.log(file);
  }
}
