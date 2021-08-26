package com.cg.study.repository;

import com.cg.study.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

@Repository
public interface ICustomerRepository extends JpaRepository<Customer, Long> {

    @Query("select c from Customer c where c.isDelete = false order by c.id desc ")
    Iterable<Customer> findAllByCustomer();



    @Transactional
    @Modifying
    @Query("update Customer c set c.isDelete = true where c.id = :id")
    void deleteCustomer(@Param("id") Long id);
}
