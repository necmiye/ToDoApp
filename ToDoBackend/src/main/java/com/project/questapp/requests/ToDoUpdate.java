package com.project.questapp.requests;

import lombok.Data;

@Data
public class ToDoUpdate {
    String description;
    Boolean status;
}
