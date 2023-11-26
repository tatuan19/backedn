import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { AppService } from '@src/app.service';
import {
  // ResponseStatus,
  ImagePreview,
  ResponseStatus,
  UploadForm,
} from '@src/types/';
import { FileInterceptor } from '@nestjs/platform-express';
import { Images } from '@src/entities/Images.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('uploadImage')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadForm,
  ) {
    return await this.appService.uploadImage(file, body);
  }

  @Get('getImages')
  async getImages(): Promise<ImagePreview[]> {
    return await this.appService.getImages();
  }

  @Get('getImageDetail/:id')
  async getImageDetail(@Param('id') id: number): Promise<Images> {
    return await this.appService.getImageDetail(id);
  }

  @Put('updateImage/:id')
  async updateImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadForm,
  ): Promise<ResponseStatus> {
    return await this.appService.updateImage(id, file, body);
  }

  @Delete('deleteImage/:id')
  async deleteImage(@Param('id') id: number): Promise<ResponseStatus> {
    return this.appService.deleteImage(id);
  }
}
