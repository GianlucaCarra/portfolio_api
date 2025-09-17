import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse, UploadStream } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload: UploadStream = cloudinary.uploader.upload_stream(
        { folder: 'nestjs_uploads' },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) {
            return reject(error);
          }

          resolve(result.toString());
        },
      );

      Readable.from(file.buffer).pipe(upload);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          return reject(new BadRequestException('Failed to delete image'));
        }

        resolve();
      });
    });
  }
}
