import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ImageService } from './image.service';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
export class ImageController {
  constructor(private readonly Execute: ImageService) {}
}
