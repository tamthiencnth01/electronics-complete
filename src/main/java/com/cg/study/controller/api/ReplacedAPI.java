package com.cg.study.controller.api;

import com.cg.study.model.Customer;
import com.cg.study.model.Product;
import com.cg.study.model.Replaced;
import com.cg.study.service.product.IProductService;
import com.cg.study.service.replace.IReplaceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/replaceds")
public class ReplacedAPI {

    @Autowired
    private IReplaceService replaceService;

    @Autowired
    private IProductService productService;

    @GetMapping
    public ResponseEntity<Iterable<Replaced>> showListReplaced(){
        Iterable<Replaced> replaceds = replaceService.findAll();
        if (((List) replaceds).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(replaceds,HttpStatus.OK);
    }

    @PostMapping("/{numberMonth}")
    public ResponseEntity<Replaced> saveReplaced(@RequestBody Replaced replaced, @PathVariable int numberMonth) {
        if (replaced.getId() != null) {
            return new ResponseEntity<>(replaceService.save(replaced), HttpStatus.OK);
        }

        Optional<Product> product = productService.findById(replaced.getProduct().getId());

        if (product.isPresent()) {
            replaced.setProduct(product.get());
            replaced.setPurchaseDay(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
            replaceService.save(replaced);
            replaceService.updateFinishDay(replaced.getId(),numberMonth);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
