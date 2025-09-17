import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProjectsModule } from './modules/projects/projects.module';
import { CloudinaryModule } from './src/modules/cloudinary/cloudinary/cloudinary.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
      TypeOrmModule.forRootAsync({
      imports: [ConfigModule],         
      inject: [ConfigService],        
      useFactory: (configService: ConfigService) => typeOrmConfig(configService),
    }),
    ProjectsModule,
    CloudinaryModule, 
  ],
})
export class AppModule {}
