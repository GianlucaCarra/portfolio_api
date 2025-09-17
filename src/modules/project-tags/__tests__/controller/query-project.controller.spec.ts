import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../project-tags.service';
import { Project } from '../../entities/project-tag.entity';
import { ProjectsController } from '../../project-tags.controller';
import { project } from '../fixtures/entities/project.entity';

describe('ProjectsService', () => {
  let controller: ProjectsController;
  let service : ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            findAll: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('Query functions', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });

    it('should show all projects at one array in response', async () => {
      const projects: Project[] = [project, { ...project, id: 2}, { ...project, id: 3}];

      jest.spyOn(service, 'findAll').mockResolvedValue(projects);

      const result = await controller.findAll();

      expect(result).toEqual({
        success: true,
        data: projects,
        timestamp: expect.any(String),
      });
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('should return a project object in response when a valid ID are provided', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(project);

      const result = await controller.findById(project.id);

      expect(result).toEqual({
        success: true,
        data: project,
        timestamp: expect.any(String),
      });
      expect(service.findById).toHaveBeenCalledWith(project.id);
    });
  });
});
