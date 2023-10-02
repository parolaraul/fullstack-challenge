import { Test, TestingModule } from '@nestjs/testing';
import { Task, TaskDocument, TasksSchema } from './schemas/task.schema';
import { TaskStatesEnum } from './enums/task-states.enum';
import { TaskRepository } from './schemas/task.repository';
import { TaskKindEnum } from './enums/task-kind.enum';
import { ExportTypeEnum } from './enums/export-type.enum';
import { ExportImportProcessor } from './export-import.processor';
import { model, Types } from 'mongoose';
import { ImportTypeEnum } from './enums/import-type.enum';

describe('ExportImportProcessor', () => {
  let exportImportProcessor: ExportImportProcessor;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExportImportProcessor,
        {
          provide: TaskRepository,
          useValue: {
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    exportImportProcessor = module.get<ExportImportProcessor>(
      ExportImportProcessor,
    );
    taskRepository = module.get<TaskRepository>(TaskRepository);
    jest.useFakeTimers();
  });

  it('should be defined', () => {
    expect(exportImportProcessor).toBeDefined();
  });

  describe('execute', () => {
    it('should execute a task and update its state when its export-epub', async () => {
      const expectedDuration = 10000;
      const taskModel = model<any>(Task.name, TasksSchema);
      const task: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        createdAt: new Date(),
        bookId: 'some-book-id',
        kind: TaskKindEnum.Export,
        type: ExportTypeEnum.Epub,
        state: TaskStatesEnum.Pending,
      });

      setTimeout(async () => {
        const updatedTask: TaskDocument = await exportImportProcessor.execute(
          task,
        );
        expect(updatedTask).toBeDefined();
        expect(updatedTask.state).toEqual(TaskStatesEnum.Finished);
        expect(taskRepository.update).toHaveBeenCalledWith(
          task._id,
          updatedTask,
        );
        jest.useRealTimers();
      }, expectedDuration);
    });

    it('should execute a task and update its state when its export-pdf', async () => {
      const expectedDuration = 25000;
      const taskModel = model<any>(Task.name, TasksSchema);
      const task: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        createdAt: new Date(),
        bookId: 'some-book-id',
        kind: TaskKindEnum.Export,
        type: ExportTypeEnum.Pdf,
        state: TaskStatesEnum.Pending,
      });

      setTimeout(async () => {
        const updatedTask: TaskDocument = await exportImportProcessor.execute(
          task,
        );
        expect(updatedTask).toBeDefined();
        expect(updatedTask.state).toEqual(TaskStatesEnum.Finished);
        expect(taskRepository.update).toHaveBeenCalledWith(
          task._id,
          updatedTask,
        );
        jest.useRealTimers();
      }, expectedDuration);
    });

    it('should execute a task and update its state when its default', async () => {
      const expectedDuration = 60000;
      const taskModel = model<any>(Task.name, TasksSchema);
      const task: TaskDocument = new taskModel({
        _id: new Types.ObjectId(),
        createdAt: new Date(),
        bookId: 'some-book-id',
        kind: TaskKindEnum.Import,
        type: ImportTypeEnum.Evernote,
        state: TaskStatesEnum.Pending,
      });

      setTimeout(async () => {
        const updatedTask: TaskDocument = await exportImportProcessor.execute(
          task,
        );
        expect(updatedTask).toBeDefined();
        expect(updatedTask.state).toEqual(TaskStatesEnum.Finished);
        expect(taskRepository.update).toHaveBeenCalledWith(
          task._id,
          updatedTask,
        );
        jest.useRealTimers();
      }, expectedDuration);
    });
  });
});
