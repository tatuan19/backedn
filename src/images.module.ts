import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Images } from '@src/entities/Images.entity';
import { ImagesRepository } from '@src/repository/Images.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Images])],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule.forFeature([Images, ImagesRepository])], // ImagesRepository를 export
})
export class ImagesModule {}
