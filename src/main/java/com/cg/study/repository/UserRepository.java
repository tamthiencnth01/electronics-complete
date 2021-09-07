package com.cg.study.repository;

import com.cg.study.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("select u from User u where u.role.id = 3")
    public Iterable<User> selectTechnicans();
    @Query("select u from User u where u.id <> 1")
    List<User> findAll();
}
