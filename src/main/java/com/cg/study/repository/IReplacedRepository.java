package com.cg.study.repository;

import com.cg.study.model.Replaced;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
public interface IReplacedRepository extends JpaRepository<Replaced, Long> {
    @Transactional
    @Modifying
    @Procedure(procedureName = "sp_update_replaced")
    public void updateFinishDay(@Param("replacedId") Long replacedId, @Param("numberMonth") int numberMonth);


    @Transactional
    @Modifying
    @Query("select r from Replaced r where r.product.id = ?1")
    Set<Replaced> selectAllReplacedsById(Long id);


}
