import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../project-tags.service';
import { ProjectsController } from '../../project-tags.controller';

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
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  describe('Delete functions', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });

    it('should remove a project and return its ID in response when a valid ID are provided', async () => {
      const projectId = 1;

      jest.spyOn(service, 'remove').mockResolvedValue(projectId);

      const result = await controller.remove(projectId);

      expect(result).toEqual({
        success: true,
        data: projectId,
        timestamp: expect.any(String),
      });
      expect(service.remove).toHaveBeenCalledWith(projectId);
    });
  });
});
