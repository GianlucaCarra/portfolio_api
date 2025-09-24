import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../../project.entity';
import { Repository } from 'typeorm';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo : Repository<Partial<Project>>;

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

  describe('Delete functions', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repo).toBeDefined();
    });

    it('should remove a project when a valid ID is provided', async () => {
      const project: Project = { 
        id: 1, 
        name: 'Project 1', 
        description: 'A test project 1', 
        frontendUrl: 'http://example.com', 
        backendUrl: 'http://example.com/image.png',
        liveUrl: 'http://example.com/image.png'  
      };

      jest.spyOn(service, 'findById').mockResolvedValue(project);
      jest.spyOn(repo, 'remove').mockResolvedValue(project);

      const result = await service.remove(project.id);

      expect(result).toEqual(project.id);
      expect(service.findById).toHaveBeenCalledWith(project.id);
      expect(repo.remove).toHaveBeenCalledWith(project);
    });
  });
});
