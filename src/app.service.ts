import { Injectable } from '@nestjs/common';
import { ResponseStatus, ImagePreview, UploadForm } from '@src/types/';
import { S3, Credentials } from 'aws-sdk';
import { Repository } from 'typeorm';
import { Images } from '@src/entities/Images.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppService {
  @InjectRepository(Images)
  private readonly imageEntityRepository: Repository<Images>;
  private readonly awsS3: S3;
  constructor() {
    this.awsS3 = new S3();
    this.awsS3.config.update({
      credentials: new Credentials(
        process.env.AWS_ACCESS_KEY_ID,
        process.env.AWS_SECRET_ACCESS_KEY,
      ),
      region: process.env.AWS_S3_REGION,
    });
  }
  getHello(): string {
    return 'Hello Kirari!';
  }
  async uploadImage(
    image: Express.Multer.File,
    body: UploadForm,
  ): Promise<ResponseStatus> {
    const url = `original/${image.originalname}`;
    const previewUrl = `preview/resized-${image.originalname}`;
    // s3 save
    await this.awsS3
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: url,
        Body: image.buffer,
        ACL: 'public-read',
        ContentType: image.mimetype,
      })
      .promise();
    // db save
    const entity = this.imageEntityRepository.create({
      title: body.title,
      url,
      previewUrl,
      author: body.author,
    });
    await this.imageEntityRepository.save(entity);
    return { code: 200, id: entity.id };
  }
  async getImages(): Promise<ImagePreview[]> {
    const entity = await this.imageEntityRepository.find();
    const imagePreviews: ImagePreview[] = entity.map((image) => ({
      id: image.id,
      title: image.title,
      previewUrl: image.previewUrl, // 예제에서는 url을 사용하였지만 실제 필드에 따라 다를 수 있음
    }));
    return imagePreviews;
  }
  async getImageDetail(id: number): Promise<Images> {
    const entity = await this.imageEntityRepository.findOneBy({ id });
    return entity;
  }
  async updateImage(
    id: number,
    image: Express.Multer.File,
    body: UploadForm,
  ): Promise<ResponseStatus> {
    const url = `original/${image.originalname}`;
    const previewUrl = `preview/resized-${image.originalname}`;
    const entity = await this.imageEntityRepository.findOneBy({ id });
    // s3 delete
    await this.awsS3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: entity.url,
      })
      .promise();
    await this.awsS3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: entity.previewUrl,
      })
      .promise();
    // s3 save
    await this.awsS3
      .putObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: url,
        Body: image.buffer,
        ACL: 'public-read',
        ContentType: image.mimetype,
      })
      .promise();
    // db save
    entity.title = body.title;
    entity.author = body.author;
    entity.url = url;
    entity.previewUrl = previewUrl;
    await this.imageEntityRepository.save(entity);
    return { code: 200, id: entity.id };
  }
  async deleteImage(id: number): Promise<ResponseStatus> {
    const entity = await this.imageEntityRepository.findOneBy({ id });
    // s3 delete
    await this.awsS3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: entity.url,
      })
      .promise();
    await this.awsS3
      .deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: entity.previewUrl,
      })
      .promise();
    // db delete
    await this.imageEntityRepository.remove(entity);
    return { code: 200, id };
  }
}
