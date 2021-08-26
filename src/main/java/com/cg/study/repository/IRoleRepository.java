package com.cg.study.repository;

import com.cg.study.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    @Query("select r from Role r where r.id != 1")
    Iterable<Role> getAllRoles();
}
