package com.cg.study.service.accessory;

import com.cg.study.model.Accessory;
import com.cg.study.service.IGeneralService;

public interface IAccessoryService extends IGeneralService<Accessory> {

    void deleteAccessory(Long id);

    Iterable<Accessory> findAllByAccessory();

    void updateAccessory(Long id);
}
