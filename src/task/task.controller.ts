import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';
import { stringify } from 'querystring';
import { GetTasksFilterDto } from '../tasks/dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from '../tasks/pipes/task-status-validation.pipe';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService) {}
    @Get()
    getAllTasks(): Task[] {
       return this.taskService.getAllTasks();
    }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        console.log(filterDto)
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto);
        } else {
            return this.taskService.getAllTasks();
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.taskService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        console.log('mpilo');
        return this.taskService.createTask(createTaskDto);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        ) {
        return this.taskService.updateTaskStatus(id, status);
    }

    // @Post()
    // createTask(@Body() body) {
    //     console.log('body', body);
    // }

    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string,
    // ): Task {
    //     console.log('title', title);
    //     console.log('description', description);
    //     return this.taskService.createTask(title, description);
        
    // }
}
