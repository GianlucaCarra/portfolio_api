import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('projects')
export class TagsController {
  constructor(
    private readonly Execute: TagsService,
  ) {}

  @Post()
  async create(@Body() body: CreateTagDto) {
    return this.Execute.create(body);
  }

  // @Patch(':id')
  // async update(@Param('id') id: number, @Body() body: UpdateTagDto) {
  //   return await this.Execute.update(id, body);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: number) {
  //   return await this.Execute.remove(id);
  // }
}
