package com.cg.study.model.dto;

import com.cg.study.model.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto implements Serializable {
    @Column(name = "id")
    private Long id;
    @Column(name = "product_name")
    private String productName;
    @Column(name = "product_description")
    private String productDescription;
    @Column(name = "service_tag")
    private String serviceTag;
    @Column(name = "serial_number")
    private String serialNumber;
    @Column(name = "purchase_day")
    private String purchaseDay;

    @Column(name = "start_dated")
    private Date startDate;
    @Column(name = "finish_date")
    private Date finishDate;
    @Column(name = "customer_id")
    private Customer customer;
    @Column(name = "remaining_day")
    private Long remainingDay;
}
