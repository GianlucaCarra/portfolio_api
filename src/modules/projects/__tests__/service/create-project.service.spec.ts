import { Test, TestingModule } from '@nestjs/testing';
import { ProjectsService } from '../../projects.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Project } from '../../project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../../dto/create-project.dto';

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

  describe('Create functions', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
      expect(repo).toBeDefined();
    });

    it('should create a project', async () => {
      const dto: CreateProjectDto = { 
        name: 'Test Project', 
        description: 'A test project', 
        frontendUrl: 'http://example.com', 
        backendUrl: 'http://example.com/image.png',
        liveUrl: 'http://example.com/image.png' 
      };

      const newEntity = { id: 1, ...dto } as Project;

      jest.spyOn(repo, 'create').mockReturnValue(newEntity);
      jest.spyOn(repo, 'save').mockResolvedValue(newEntity);

      const result = await service.create(dto);

      expect(result).toEqual(newEntity);
      expect(repo.create).toHaveBeenCalledWith(dto);
      expect(repo.save).toHaveBeenCalledWith(newEntity);
    });
  });
});
