import { CreateProjectDto } from 'src/modules/projects/dto/create-project.dto';

export const createProjectDto: CreateProjectDto = {
  name: 'Test Project',
  description: 'A test project',
  frontendUrl: 'http://example.com',
  backendUrl: 'http://example.com/backend.png',
  liveUrl: 'http://example.com/live.png',
};
