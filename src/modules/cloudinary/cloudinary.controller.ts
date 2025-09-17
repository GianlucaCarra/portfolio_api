import { Multer } from "multer";
import { CloudinaryService } from "./cloudinary.service";
import { UseInterceptors, Post } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

export class CloudinaryController {
  constructor(
    private readonly Execute: CloudinaryService,
  ) {}

  @Post()
  async create(@UploadedFile file: Express.Multer.File) {
    this.Execute.uploadImage(file);
  }
}