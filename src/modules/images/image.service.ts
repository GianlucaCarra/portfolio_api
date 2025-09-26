import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(file: Express.Multer.File) {
    const imageData = await this.cloudinaryService.create(file);

    const newImage = this.imagesRepository.create({
      imageUrl: imageData.secure_url,
      publicId: imageData.public_id,
    });

    try {
      return await this.imagesRepository.save(newImage);
    } catch (error) {
      throw new BadRequestException('Failed to save image to database');
    }
  }

  async remove(id: number): Promise<number> {
    const imageToDelete = await this.imagesRepository.findOne({
      where: { id },
    });

    if (!imageToDelete) {
      throw new BadRequestException('Image not found');
    }

    try {
      await this.cloudinaryService.delete(imageToDelete.publicId);
      return (await this.imagesRepository.remove(imageToDelete)).id;
    } catch (error) {
      throw new BadRequestException('Failed to delete image');
    }
  }
}
