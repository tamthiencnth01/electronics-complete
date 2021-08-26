package com.cg.study.repository;

import com.cg.study.model.Product;
import com.cg.study.model.dto.IProductDto;
import com.cg.study.model.dto.ProductDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface IProductRepository extends JpaRepository<Product, Long> {
    Iterable<Product> findAllByCustomerId(Long id);
    Iterable<Product> findProductBySerialNumber(String serialNumber);

    @Transactional
    @Modifying
    @Query(value = "SELECT p.id as id, p.product_name as productName, (select customer_full_name from customers c where" +
            " c.id = p.customer_id) as customer,  p.serial_number as serialNumber, p.service_tag as serviceTag, " +
            "(SELECT TIMESTAMPDIFF(day, now(), finish_date)) as remainingDay FROM products p where p.serial_number = :check;", nativeQuery = true)
    public Iterable<IProductDto> findAllBySerialNumber(@Param("check") String check);

    @Transactional
    @Modifying
    @Procedure(procedureName = "sp_update_products")
    public void updateFinishDay(@Param("productId") Long productId, @Param("numberMonth") int numberMonth);


    @Transactional
    @Query(value = "SELECT p.id as id, p.product_name as productName,p.status, p.reason, (select customer_full_name from" +
            " customers c where c.id = p.customer_id) as customer,  p.serial_number as serialNumber, p.service_tag as " +
            "serviceTag, (SELECT TIMESTAMPDIFF(day, now(), finish_date)) as remainingDay FROM products p;", nativeQuery = true)
    public Iterable<IProductDto> listProducts();

//    @Transactional
//    @Query("select new com.cg.study.model.dto.ProductDto (p.id) from Product p")
//    public Iterable<ProductDto> listProducts();

    @Transactional
    @Modifying
    @Query("update Product p set p.status = :status, p.reason = :reason, p.photo = :photo where p.id = :id")
    public void warrantyDisclaimer(@Param("status") int status,
                                   @Param("reason") String reason,
                                   @Param("photo")  String photo,
                                   @Param("id")  Long id);



}
