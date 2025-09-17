import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { cloudinaryProvider } from 'src/common/providers/cloudinary.provider';

@Module({
  providers: [CloudinaryService, cloudinaryProvider],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
