package com.project.questapp.controllers;

import com.project.questapp.entities.ToDo;
import com.project.questapp.requests.ToDoCreate;
import com.project.questapp.requests.ToDoUpdate;
import com.project.questapp.responses.ToDoResponse;
import com.project.questapp.services.ToDoServices;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/todos")
public class ToDoController {
    private ToDoServices toDoServices;

    public ToDoController(ToDoServices toDoServices) {
        this.toDoServices = toDoServices;
    }

    @GetMapping
    public List<ToDoResponse> getAllToDos(@RequestParam Optional<Long> userId) {
        return toDoServices.getAllToDos(userId);
    }

    @PostMapping
    public ToDo createOneToDo(@RequestBody ToDoCreate newToDo) {
        return toDoServices.createOneToDo(newToDo);
    }

    @GetMapping("/{toDoId}")
    public ToDoResponse getOneToDoById1(@PathVariable Long toDoId) {
        return toDoServices.getOneToDoById1(toDoId);
    }

    @PutMapping("/{toDoId}")
    public ToDo updateOneToDoById(@PathVariable Long toDoId, @RequestBody ToDoUpdate updateToDo) {
        return toDoServices.updateOneToDoById(toDoId, updateToDo);
    }

    @DeleteMapping("/{toDoId}")
    public void deleteOneToDoById(@PathVariable Long toDoId) {
        toDoServices.deleteOneToDoById(toDoId);
    }
}
