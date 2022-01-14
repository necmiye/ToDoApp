package com.project.questapp.repos;

import com.project.questapp.entities.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ToDoRepository  extends JpaRepository<ToDo, Long> {

    List<ToDo> findByUserId(Long userId);

    @Query(value = "select * from todo where user_id = :userId order by create_date desc limit 5",
            nativeQuery = true)
    List<ToDo> findTopByUserId(@Param("userId") Long userId);
}
