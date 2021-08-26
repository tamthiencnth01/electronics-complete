package com.cg.study.service.product;

import com.cg.study.model.Product;
import com.cg.study.model.dto.IProductDto;
import com.cg.study.model.dto.ProductDto;
import com.cg.study.repository.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository productRepository;

    @Override
    public Iterable<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return productRepository.save(product);
    }

    @Override
    public void remove(Long id) {
        productRepository.deleteById(id);
    }


    @Override
    public Iterable<Product> findAllByCustomerId(Long id) {
        return productRepository.findAllByCustomerId(id);
    }

    @Override
    public Iterable<Product> findProductBySerialNumber(String serialNumber) {
        return productRepository.findProductBySerialNumber(serialNumber);
    }

    @Override
    public Iterable<IProductDto> findAllBySerialNumber(String check) {
        return productRepository.findAllBySerialNumber(check);
    }

//    @Override
//    public Iterable<IProductDto> findProductDtoBySerialNumber(String serialNumber) {
//        return productRepository.findProductDtoBySerialNumber(serialNumber);
//    }

    @Override
    public void updateFinishDay(Long productId, int numberMonth) {
        productRepository.updateFinishDay(productId,numberMonth);
    }

    @Override
    public Iterable<IProductDto> listProducts() {
        System.out.println(productRepository.listProducts());
        return productRepository.listProducts();
    }

    @Override
    public void warrantyDisclaimer(int status, String reason, String photo, Long id) {
        productRepository.warrantyDisclaimer(status,reason,photo,id);
    }


}
