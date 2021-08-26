package com.cg.study.controller.api;

import com.cg.study.model.Role;
import com.cg.study.service.role.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.Access;
import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleAPI {
    @Autowired
    private IRoleService roleService;

    @GetMapping
    private ResponseEntity<Iterable<Role>> showAllRoles(){
        Iterable<Role> roles = roleService.getAllRoles();
        System.out.println(roles);
        if (((List) roles).isEmpty()){
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(roles,HttpStatus.OK);
    }
}
