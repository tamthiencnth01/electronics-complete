package com.cg.study.service.product;

import com.cg.study.model.Product;
import com.cg.study.model.dto.IProductDto;
import com.cg.study.model.dto.ProductDto;
import com.cg.study.service.IGeneralService;
import org.springframework.data.repository.query.Param;

public interface IProductService extends IGeneralService<Product> {
    Iterable<Product> findAllByCustomerId(Long id);
    Iterable<Product> findProductBySerialNumber(String serialNumber);
    Iterable<IProductDto> findAllBySerialNumber(String check);
    public void updateFinishDay(@Param("productId") Long productId, @Param("numberMonth") int numberMonth);
    public Iterable<IProductDto> listProducts();
    public void warrantyDisclaimer(@Param("status") int status,
                                   @Param("reason") String reason,
                                   @Param("photo")  String photo,
                                   @Param("id")  Long id);
}
