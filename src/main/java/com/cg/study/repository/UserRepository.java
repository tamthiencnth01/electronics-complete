package com.cg.study.repository;

import com.cg.study.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);

    @Query("select u from User u where u.role.id = 3")
    public Iterable<User> selectTechnicans();
}
