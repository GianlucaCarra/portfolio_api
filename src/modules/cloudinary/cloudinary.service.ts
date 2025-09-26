import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
  UploadStream,
} from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  constructor(@Inject('CLOUDINARY') private readonly cloudinaryClient) {}

  async create(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload: UploadStream = cloudinary.uploader.upload_stream(
        { folder: 'nestjs_uploads' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject(new BadRequestException('Failed to upload image'));
          }

          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async delete(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error) => {
        if (error) {
          return reject(new BadRequestException('Failed to delete image'));
        }

        resolve();
      });
    });
  }
}
