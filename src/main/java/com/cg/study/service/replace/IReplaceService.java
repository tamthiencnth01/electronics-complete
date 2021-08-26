package com.cg.study.service.replace;

import com.cg.study.model.Replaced;
import com.cg.study.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface IReplaceService extends IGeneralService<Replaced> {

    public void updateFinishDay(@Param("replacedId") Long replacedId, @Param("numberMonth") int numberMonth);


    Set<Replaced> selectAllReplacedsById(Long id);
}
