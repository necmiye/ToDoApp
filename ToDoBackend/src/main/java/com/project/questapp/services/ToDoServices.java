package com.project.questapp.services;

import com.project.questapp.entities.ToDo;
import com.project.questapp.entities.User;
import com.project.questapp.repos.ToDoRepository;
import com.project.questapp.requests.ToDoCreate;
import com.project.questapp.requests.ToDoUpdate;
import com.project.questapp.responses.ToDoResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ToDoServices {

    private ToDoRepository toDoRepository;
    //private LikeService likeService;
    private UserService userService;

    public ToDoServices(ToDoRepository toDoRepository,
                       UserService userService) {
        this.toDoRepository = toDoRepository;
        this.userService = userService;
    }

    public List<ToDoResponse> getAllToDos(Optional<Long> userId) {
        List<ToDo> list;
        if(userId.isPresent()) {
            list = toDoRepository.findByUserId(userId.get());
        }else
            list = toDoRepository.findAll();
        return list.stream().map(td -> {
             Optional.of(td.getId());
            return new ToDoResponse(td);}).collect(Collectors.toList());
    }

    public ToDo getOneToDoById(Long toDoId) {
        return toDoRepository.findById(toDoId).orElse(null);
    }

    public ToDoResponse getOneToDoById1(Long toDoId) {
        ToDo toDo = toDoRepository.findById(toDoId).orElse(null);
        return new ToDoResponse(toDo);
    }

    public ToDo createOneToDo(ToDoCreate newToDo) {
        User user = userService.getOneUserById(newToDo.getUserId());
        if(user == null)
            return null;
        ToDo toSave = new ToDo();
        toSave.setId(newToDo.getId());
        toSave.setStatus(newToDo.getStatus());
        toSave.setDescription(newToDo.getDescription());
        toSave.setUser(user);
        return toDoRepository.save(toSave);
    }

    public ToDo updateOneToDoById(Long toDoId, ToDoUpdate toDoUpdate) {
        Optional<ToDo> toDo = toDoRepository.findById(toDoId);
        if(toDo.isPresent()) {
            ToDo toUpdate = toDo.get();
            toUpdate.setDescription(toDoUpdate.getDescription());
            toUpdate.setStatus(toDoUpdate.getStatus());
            toDoRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public void deleteOneToDoById(Long toDoId) {
        toDoRepository.deleteById(toDoId);
    }

}
