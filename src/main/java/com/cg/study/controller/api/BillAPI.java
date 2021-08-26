package com.cg.study.controller.api;

import com.cg.study.model.Bill;
import com.cg.study.model.Customer;
import com.cg.study.model.dto.IBillDTO;
import com.cg.study.service.bill.IBillService;
import com.cg.study.service.customer.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
public class BillAPI {
    @Autowired
    private IBillService billService;
    @Autowired
    private ICustomerService customerService;

    @GetMapping
    private ResponseEntity<Iterable<Bill>> showListBill(){
        Iterable<Bill> bills = billService.findAll();
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/doing")
    private ResponseEntity<Iterable<Bill>> showListBillDoing(){
        Iterable<Bill> bills = billService.selectBillDoing();
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/done")
    private ResponseEntity<Iterable<Bill>> showListBillDone(){
        Iterable<Bill> bills = billService.selectAllBillDoneByTechnician();
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/complete")
    private ResponseEntity<Iterable<Bill>> selectAllBillsComplete(){
        Iterable<Bill> bills = billService.selectAllBillsComplete();
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }
//    @GetMapping("/month")
//    private ResponseEntity<Iterable<IBillDTO>> selectAllBillsMonth(){
//        Iterable<IBillDTO> bills = billService.statisticalTechnicians();
//        if (((List) bills).isEmpty()){
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//        }
//        return new ResponseEntity<>(bills, HttpStatus.OK);
//    }


    @GetMapping("/statistical")
    private ResponseEntity<Iterable<Bill>> statisticalTechnicians(){
        Iterable<Bill> bills = billService.statisticalTechnicians();
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/technician/{userId}")
    private ResponseEntity<Iterable<Bill>> showListBillTechnicians(@PathVariable Long userId){
        Iterable<Bill> bills = billService.selectAllBillForTechnician(userId);
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }

    @GetMapping("/history/{userId}")
    private ResponseEntity<Iterable<Bill>> showHistoryAllBillForTechnician(@PathVariable Long userId){
        Iterable<Bill> bills = billService.showHistoryAllBillForTechnician(userId);
        if (((List) bills).isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(bills, HttpStatus.OK);
    }


    @PostMapping
    private ResponseEntity<Bill> createBill(@RequestBody Bill bill){
        if (bill.getId() != null){
            return new ResponseEntity<>(billService.save(bill),HttpStatus.OK);
        }
        Optional<Customer> customer = customerService.findById(bill.getCustomer().getId());
        if (customer.isPresent()){
            bill.setCustomer(customer.get());
            bill.setStartDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yyyy")));
            return new ResponseEntity<>(billService.save(bill),HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PatchMapping("/{userId}/{id}")
    private ResponseEntity<Bill> updateBill(@PathVariable Long userId,@PathVariable Long id){
        Optional<Bill> bill = billService.findById(id);
        if (!bill.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        billService.updateTechnician(userId,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("{repairOperation}/{endDate}/{accesoryId}/{id}")
    private ResponseEntity<Bill> updateBillDoing(@PathVariable String repairOperation,@PathVariable String endDate,@PathVariable Long accesoryId,@PathVariable Long id){
        Optional<Bill> bill = billService.findById(id);
        if (!bill.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        billService.updateDoingAccessory(accesoryId);
        billService.updateDoing(repairOperation,endDate,accesoryId,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/kilometer/{km}/{id}")
    private ResponseEntity<Bill> updateBillKilometer(@PathVariable double km,@PathVariable Long id){
        Optional<Bill> bill = billService.findById(id);
        if (!bill.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        billService.updateKilometer(km,id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
