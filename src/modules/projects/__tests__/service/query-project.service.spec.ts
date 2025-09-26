import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../../project.entity';
import { Repository } from 'typeorm';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: Repository<Partial<Project>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    repo = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  describe('Query functions', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repo).toBeDefined();
    });

    it('should show all projects', async () => {
      const projects: Project[] = [
        {
          id: 1,
          name: 'Project 1',
          description: 'A test project 1',
          frontendUrl: 'http://example.com',
          backendUrl: 'http://example.com/image.png',
          liveUrl: 'http://example.com/image.png',
        },
        {
          id: 2,
          name: 'Project 2',
          description: 'A test project 2',
          frontendUrl: 'http://example.com',
          backendUrl: 'http://example.com/image.png',
          liveUrl: 'http://example.com/image.png',
        },
      ];

      jest.spyOn(repo, 'find').mockResolvedValue(projects);

      const result = await service.findAll();

      expect(result).toEqual(projects);
      expect(repo.find).toHaveBeenCalledWith();
    });

    it('should return a project when a valid ID is provided', async () => {
      const project: Project = {
        id: 1,
        name: 'Project 1',
        description: 'A test project 1',
        frontendUrl: 'http://example.com',
        backendUrl: 'http://example.com/image.png',
        liveUrl: 'http://example.com/image.png',
      };

      jest.spyOn(repo, 'findOne').mockResolvedValue(project);

      const result = await service.findById(project.id);

      expect(result).toEqual(project);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: project.id } });
    });
  });
});
