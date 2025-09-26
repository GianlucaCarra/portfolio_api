import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../projects.service';
import { ProjectsController } from '../../projects.controller';
import { project } from '../fixtures/entities/project.entity';
import { updateProjectDto } from '../fixtures/dto/update-project.dto';

describe('ProjectService', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('Update function', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });

    it('should return a project in response when a valid ID and properties are provided', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(project);

      const result = await controller.update(project.id, updateProjectDto);

      expect(result).toEqual({
        success: true,
        data: project,
        timestamp: expect.any(String),
      });
      expect(service.update).toHaveBeenCalledWith(project.id, updateProjectDto);
    });
  });
});
