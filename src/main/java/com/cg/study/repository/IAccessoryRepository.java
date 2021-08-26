package com.cg.study.repository;

import com.cg.study.model.Accessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface IAccessoryRepository extends JpaRepository<Accessory, Long> {
    @Query("select a from Accessory a where a.isDelete = false order by a.id desc ")
    Iterable<Accessory> findAllByAccessory();

    @Transactional
    @Modifying
    @Query("update Accessory a set a.isDelete = true where a.id = :id")
    void deleteAccessory(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("update Accessory a set a.quantity = a.quantity - 1 where a.id = :id")
    void updateAccessory(@Param("id") Long id);
}
