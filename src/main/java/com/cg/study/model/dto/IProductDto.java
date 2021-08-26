package com.cg.study.model.dto;

import com.cg.study.model.Customer;
import com.cg.study.model.Product;
import com.cg.study.model.Replaced;

import java.util.Date;
import java.util.Set;

public interface IProductDto {
    Long getId();
    Long getRemainingDay();
    String getProductName();
    String getSerialNumber();
    String getServiceTag();
    String getProductDescription();
    String getPurchaseDay();
    Date getStartDate();
    Date getFinishDate();
    String getCustomer();
    int getStatus();
    String getReason();
    Set<Replaced> getReplaceds();
    public void setReplaceds(Set<Replaced> replaceds);

}
