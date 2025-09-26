import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../../project.entity';
import { Repository } from 'typeorm';
import { UpdateProjectDto } from '../../dto/update-project.dto';

describe('ProjectService', () => {
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

  describe('Update function', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repo).toBeDefined();
    });

    it('should update a project when a valid ID and properties are provided', async () => {
      const projectId = 1;
      const dto: Partial<UpdateProjectDto> = {
        name: 'Test Project changed',
        description: 'A test project changed',
        frontendUrl: 'http://example.com/changed',
      };

      const preloadedProject = { id: projectId, ...dto } as Project;

      jest.spyOn(repo, 'preload').mockResolvedValue(preloadedProject);
      jest.spyOn(repo, 'save').mockResolvedValue(preloadedProject);

      const result = await service.update(projectId, dto);

      expect(result).toEqual(preloadedProject);
      expect(repo.preload).toHaveBeenCalledWith({ id: projectId, ...dto });
      expect(repo.save).toHaveBeenCalledWith(preloadedProject);
    });
  });
});
