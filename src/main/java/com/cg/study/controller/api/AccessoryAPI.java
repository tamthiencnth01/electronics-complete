package com.cg.study.controller.api;

import com.cg.study.model.Accessory;
import com.cg.study.model.Bill;
import com.cg.study.model.Product;
import com.cg.study.service.accessory.IAccessoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/accessories")
public class AccessoryAPI {

    @Autowired
    private IAccessoryService accessoryService;

    @GetMapping
    public ResponseEntity<Iterable<Accessory>> showListAccessory() {
        Iterable<Accessory> accessories = accessoryService.findAllByAccessory();
        if (((List) accessories).isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(accessories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accessory> getId(@PathVariable Long id) {
        Optional<Accessory> accessory = accessoryService.findById(id);
        if (accessory.isPresent()) {
            return new ResponseEntity<>(accessory.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Accessory> saveAccessory(@RequestBody Accessory accessory) {
        if(accessory.getId() != null){
            return new ResponseEntity<>(accessoryService.save(accessory),HttpStatus.OK);
        }
        return new ResponseEntity<>(accessoryService.save(accessory), HttpStatus.CREATED);
    }

    @PatchMapping("/decrease/{id}")
    private ResponseEntity<Accessory> updateAccessory(@PathVariable Long id){
        Optional<Accessory> accessory = accessoryService.findById(id);
        if (!accessory.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        accessoryService.updateAccessory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Accessory> deleteAccessory(@PathVariable Long id) {
        Optional<Accessory> accessory = accessoryService.findById(id);
        System.out.println(accessory);
        if (!accessory.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        accessoryService.deleteAccessory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
