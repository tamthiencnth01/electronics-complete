package com.cg.study.service.role;

import com.cg.study.model.Role;
import com.cg.study.service.IGeneralService;

public interface IRoleService extends IGeneralService<Role> {
    Iterable<Role> getAllRoles();
}
