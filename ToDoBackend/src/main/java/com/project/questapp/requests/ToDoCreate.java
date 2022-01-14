package com.project.questapp.requests;

import lombok.Data;

@Data
public class ToDoCreate {
    Long id;
    String description;
    Long userId;
    Boolean status;
}
