import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { TaskKindEnum } from '../enums/task-kind.enum';

@Injectable()
export class TaskRepository {
  private readonly logger = new Logger(TaskRepository.name);

  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(taskData: Partial<TaskDocument>): Promise<TaskDocument> {
    try {
      const task = new this.taskModel(taskData);
      const createdTask = await task.save();
      this.logger.log(`Created task with ID: ${createdTask._id}`);
      return createdTask;
    } catch (error) {
      this.logger.error(`Error creating task: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<TaskDocument[]> {
    try {
      const tasks = await this.taskModel.find().exec();
      this.logger.log(`Found ${tasks.length} tasks`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error fetching tasks: ${error.message}`);
      throw error;
    }
  }

  async findAllImports(): Promise<TaskDocument[]> {
    try {
      const tasks = await this.taskModel
        .find({ kind: TaskKindEnum.Import })
        .exec();
      this.logger.log(`Found ${tasks.length} tasks`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error fetching tasks: ${error.message}`);
      throw error;
    }
  }

  async findAllExports(): Promise<TaskDocument[]> {
    try {
      const tasks = await this.taskModel
        .find({ kind: TaskKindEnum.Export })
        .exec();
      this.logger.log(`Found ${tasks.length} tasks`);
      return tasks;
    } catch (error) {
      this.logger.error(`Error fetching tasks: ${error.message}`);
      throw error;
    }
  }

  async findOneById(id: string): Promise<TaskDocument | null> {
    try {
      const task = await this.taskModel.findById(id).exec();
      if (!task) {
        this.logger.warn(`Task with ID ${id} not found`);
      } else {
        this.logger.log(`Found task with ID: ${id}`);
      }
      return task;
    } catch (error) {
      this.logger.error(`Error fetching task by ID: ${error.message}`);
      throw error;
    }
  }

  async update(
    id: Types.ObjectId,
    updateData: Partial<TaskDocument>,
  ): Promise<TaskDocument | null> {
    try {
      const existingTask = await this.taskModel.findById(id).exec();
      if (!existingTask) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      Object.assign(existingTask, updateData);
      const updatedTask = await existingTask.save();
      this.logger.log(`Updated task with ID: ${id}`);
      return updatedTask;
    } catch (error) {
      this.logger.error(`Error updating task: ${error.message}`);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.taskModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 1) {
        this.logger.log(`Deleted task with ID: ${id}`);
        return true;
      } else {
        this.logger.warn(`Task with ID ${id} not found for deletion`);
        return false;
      }
    } catch (error) {
      this.logger.error(`Error deleting task: ${error.message}`);
      throw error;
    }
  }
}
