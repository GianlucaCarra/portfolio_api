import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProjectsModule } from './modules/projects/projects.module';
import { ImageModule } from './modules/images/image.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { AuthModule } from './modules/auth/auth.module';
import { SuperModule } from './modules/super/super.module';
import { ThrottlerModule } from '@nestjs/throttler';

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
    ImageModule,
    CloudinaryModule,
    AuthModule,
    SuperModule,
    ThrottlerModule.forRoot([
      {
        ttl: 240,
        limit: 30,
      },
    ]),
  ],
})
export class AppModule {}
