package com.saish.task.controllers;

import com.saish.task.domain.dto.TaskDto;
import com.saish.task.domain.entities.Task;
import com.saish.task.mappers.TaskMapper;
import com.saish.task.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/task-lists")
public class TaskController {

    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(TaskService taskService, TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @GetMapping("/{taskListId}/tasks")
    public List<TaskDto> listTask(@PathVariable UUID taskListId) {
        return taskService.listTasks(taskListId)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }

    @PostMapping("/{taskListId}/tasks")
    public TaskDto createTask(@PathVariable UUID taskListId, @RequestBody TaskDto taskDto) {
        Task createdTask = taskService.createTask(taskListId, taskMapper.fromDto(taskDto));
        return taskMapper.toDto(createdTask);
    }

    @GetMapping("/{taskListId}/tasks/{taskId}")
    public Optional<TaskDto> getTask(
            @PathVariable UUID taskListId,
            @PathVariable UUID taskId
    ) {
        return taskService.getTask(taskListId, taskId).map(taskMapper::toDto);
    }


    @PutMapping("/{taskListId}/tasks/{taskId}")
    public TaskDto updateTask(
            @PathVariable UUID taskListId,
            @PathVariable UUID taskId,
            @RequestBody TaskDto taskDto
    ) {
        Task updatedTask = taskService.updateTask(taskListId, taskId, taskMapper.fromDto(taskDto));
        return taskMapper.toDto(updatedTask);
    }


    @DeleteMapping("/{taskListId}/tasks/{taskId}")
    public void deteleTask(
            @PathVariable UUID taskListId,
            @PathVariable UUID taskId
    ){
        taskService.deleteTask(taskListId , taskId);
    }

}
