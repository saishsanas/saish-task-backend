package com.saish.task.mappers;

import com.saish.task.domain.dto.TaskListDto;
import com.saish.task.domain.entities.TaskList;

public interface TaskListMapper {

    TaskList fromDto(TaskListDto taskListDto);

    TaskListDto toDto (TaskList taskList);
}
