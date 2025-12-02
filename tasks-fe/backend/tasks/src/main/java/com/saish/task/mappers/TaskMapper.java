package com.saish.task.mappers;

import com.saish.task.domain.dto.TaskDto;
import com.saish.task.domain.entities.Task;

public interface TaskMapper {

    Task fromDto (TaskDto taskDto);

    TaskDto toDto(Task task);

}
