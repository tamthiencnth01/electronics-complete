package com.cg.study.service;


import com.cg.study.model.User;
import com.cg.study.security.UserPrincipal;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    Iterable<User> findAll();
    User createUser(User user);
    public Iterable<User> selectTechnicans();
    UserPrincipal findByUsername(String username);
}
