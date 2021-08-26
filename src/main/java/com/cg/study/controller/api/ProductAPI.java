package com.cg.study.controller.api;

import com.cg.study.model.Bill;
import com.cg.study.model.Customer;
import com.cg.study.model.Product;
import com.cg.study.model.Replaced;
import com.cg.study.model.dto.IProductDto;
import com.cg.study.model.dto.ProductDto;
import com.cg.study.repository.IReplacedRepository;
import com.cg.study.service.customer.ICustomerService;
import com.cg.study.service.product.IProductService;
import com.cg.study.service.replace.IReplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/products")
public class ProductAPI {
    @Autowired
    private ICustomerService customerService;

    @Autowired
    private IProductService productService;

    @Autowired
    private IReplaceService replaceService;

    @GetMapping
    public ResponseEntity<Iterable<Product>> allProducts(@RequestParam("search") Optional<String> serialNumber) {
        Iterable<Product> products;
        if (serialNumber.isPresent()){
            products = productService.findProductBySerialNumber(serialNumber.get());
        } else {
            products = productService.findAll();
            if (((List) products).isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        }
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

//    @GetMapping("/cskh")
//    public ResponseEntity<Iterable<IProductDto>> allListProducts(@RequestParam("search") Optional<String> check) {
//        Iterable<IProductDto> products;
//        if (check.isPresent()){
//            products = productService.findAllBySerialNumber(check.get());
//        } else {
//            products = productService.listProducts();
//
//            if (((List) products).isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//            }
//        }
//        return new ResponseEntity<>(products,HttpStatus.OK);
//    }
    @GetMapping("/cskh")
    public ResponseEntity<Iterable<IProductDto>> allListProducts() {
        Iterable<IProductDto> products = productService.listProducts();
            if (((List) products).isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
        return new ResponseEntity<>(products,HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Iterable<Product>> findAllProductsByCustomerId(@PathVariable Long id) {
        Iterable<Product> products = productService.findAllByCustomerId(id);
        if (((List) products).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/getProducts/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.findById(id);
        if (product.isPresent()) {
            return new ResponseEntity<>(product.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    @PostMapping
//    public ResponseEntity<Product> saveProduct(@RequestBody Product product) {
//        if (product.getId() != null) {
//            return new ResponseEntity<>(productService.save(product), HttpStatus.OK);
//        }
//
//        Optional<Customer> customer = customerService.findById(product.getCustomer().getId());
//
//        if (customer.isPresent()) {
//            product.setCustomer(customer.get());
//            product.setPurchaseDay(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
//            return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//    }

    @PostMapping("/{numberMonth}")
    public ResponseEntity<Product> saveProduct(@RequestBody Product product, @PathVariable int numberMonth) {
        if (product.getId() != null) {
            return new ResponseEntity<>(productService.save(product), HttpStatus.OK);
        }

        Optional<Customer> customer = customerService.findById(product.getCustomer().getId());
        Iterable<Product> products = productService.findAll();
        for (Product p:
             products) {
            System.out.println(p.getSerialNumber().equals(product.getSerialNumber()));
            if (p.getSerialNumber().equals(product.getSerialNumber())){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }
        if (customer.isPresent()) {
            product.setCustomer(customer.get());
            product.setPurchaseDay(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
            productService.save(product);
            productService.updateFinishDay(product.getId(),numberMonth);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{status}/{reason}/{photo}/{id}")
    private ResponseEntity<Bill> updateBill(@PathVariable int status,
                                            @PathVariable String reason,
                                            @PathVariable String photo,
                                            @PathVariable Long id){
        Optional<Product> product = productService.findById(id);
        if (!product.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.warrantyDisclaimer(status,reason,photo,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @PatchMapping("/{status}/{reason}/{id}")
//    private ResponseEntity<Bill> updateBill(@PathVariable int status,@PathVariable String reason, @PathVariable Long id,
//                                            @RequestParam("image") MultipartFile multipartFile,
//                                            @RequestBody Product product){
//        product = productService.findById(id);
//        if (!product.isPresent()) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        productService.warrantyDisclaimer(status,reason,id);
//        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProvince(@PathVariable Long id) {
        Optional<Product> productOptional = productService.findById(id);
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        productService.remove(id);
        return new ResponseEntity<>(productOptional.get(), HttpStatus.NO_CONTENT);
    }
}
