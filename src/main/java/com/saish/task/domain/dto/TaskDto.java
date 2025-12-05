package com.saish.task.domain.dto;

import com.saish.task.domain.entities.TaskPriority;
import com.saish.task.domain.entities.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status

) {
}
