package com.project.questapp.responses;

import com.project.questapp.entities.ToDo;
import com.project.questapp.entities.User;
import lombok.Data;

@Data
public class ToDoResponse {
    Long id;
    String description;
    Long userId;
    Boolean status;
    public ToDoResponse(ToDo entity) {
        this.id = entity.getId();
        this.description = entity.getDescription();
        this.status = entity.getStatus();
        this.userId = entity.getUser().getId();
    }
}
