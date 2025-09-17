import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../projects.service';
import { Project } from '../../entities/project.entity';
import { createProjectDto } from '../fixtures/dto/create-project.dto';
import { ProjectsController } from '../../projects.controller';

describe('ProjectController', () => {
  let controller: ProjectsController;
  let service : ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('Create functions', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });

    it('should create a project and return its entity as an object in response', async () => {
      const createdProject = { id: 1, ...createProjectDto } as Project;

      jest.spyOn(service, 'create').mockResolvedValue(createdProject);

      const result = await controller.create(createProjectDto);

      expect(result).toEqual({
        success: true,
        data: createdProject,
        timestamp: expect.any(String),
      });
      expect(service.create).toHaveBeenCalledWith(createProjectDto);
    });
  });
});
