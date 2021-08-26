package com.cg.study.service.customer;

import com.cg.study.model.Customer;
import com.cg.study.service.IGeneralService;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ICustomerService extends IGeneralService<Customer> {
    void deleteCustomer(Long id);
    Iterable<Customer> findAllByCustomer();
}
