package com.cg.study.repository;

import com.cg.study.model.Bill;
import com.cg.study.model.dto.IBillDTO;
import com.cg.study.model.dto.IBillStaticDTO;
import com.cg.study.model.dto.IProductDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.StoredProcedureParameter;

@Repository
public interface IBillRepository extends JpaRepository<Bill, Long> {
    @Query("select b from Bill b where b.user.id is null ")
    public Iterable<Bill> selectBillDoing();

    @Transactional
    @Modifying
    @Query("select b from Bill b where b.user.id = :userId and b.accessory.id is null and b.product.status = 0 ")
    public Iterable<Bill> selectAllBillForTechnician(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query("select b from Bill b where b.user.id = :userId and b.accessory.id is not null and b.total is not null order by b.id desc ")
    public Iterable<Bill> showHistoryAllBillForTechnician(@Param("userId") Long userId);

    @Transactional
    @Modifying
    @Query("update Bill b set b.user.id = :userId where b.id = :id")
    public void updateTechnician(@Param("userId") Long userId,@Param("id")  Long id);



    @Transactional
    @Modifying
    @Procedure(procedureName = "sp_update_doing")
    public void updateDoing(@Param("repairOperation")String repairOperation,@Param("endDate")String endDate, @Param("accesoryId") Long accesoryId,@Param("id")  Long id);


    @Transactional
    @Modifying
    @Query("select b from Bill b where (b.accessory.id is not null or b.product.status = 1) and b.kilometer = 0 ")
    public Iterable<Bill> selectAllBillDoneByTechnician();


    @Transactional
    @Modifying
    @Query("update Bill b set b.kilometer = :km, b.total = (:km *7000)+300000 where b.id = :id")
    public void updateKilometer(@Param("km") double km, @Param("id") Long id);

    @Transactional
    @Modifying
    @Query("select user.fullName, sum(total) from Bill group by user.id order by user.id")
    public Iterable<Bill> statisticalTechnicians();


    @Transactional
    @Modifying
    @Query("select b from Bill b where b.kilometer <> 0 ")
    public Iterable<Bill> selectAllBillsComplete();

//    @Transactional
//    @Query(value = "select (select u.full_name from users u where id = user_id) as user, sum(b.total) as total from bills b where month(b.end_date) group by b.user_id;", nativeQuery = true)
//    public Iterable<IBillDTO> statisticalTechnicians();

    @Query(nativeQuery = true,value = "SELECT month(finish_date) as month, sum(total) as total, u.full_name as userName, count(b.id) as count from bills b\n" +
            "inner join users u\n" +
            "on b.user_id = u.id \n" +
            "where month(finish_date) = ?1 and year(finish_date)=?2\n" +
            "group by user_id\n" +
            "order by total desc;")
    Iterable<IBillStaticDTO> findTotalMonth(int month, int year);
}
