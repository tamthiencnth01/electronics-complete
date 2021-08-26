package com.cg.study.service.role;

import com.cg.study.model.Role;
import com.cg.study.repository.IRoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService implements IRoleService{
    @Autowired
    private IRoleRepository roleRepository;


    @Override
    public Iterable<Role> findAll() {
        return roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public Role save(Role role) {
        return null;
    }

    @Override
    public void remove(Long id) {

    }

    @Override
    public Iterable<Role> getAllRoles() {
        return roleRepository.getAllRoles();
    }
}
