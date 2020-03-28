import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TaskService } from './task/task.service';
import { TaskController } from './task/task.controller';
import { TaskModule } from './task/task.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, TaskModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class AppModule {}
