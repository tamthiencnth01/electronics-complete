package com.cg.study.model.dto;

import com.cg.study.model.Customer;
import com.cg.study.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


public interface IBillDTO {
    String getImage();
    Long getId();
    String getFirstStatus();
    String getStartDate();
    String getEndDate();
    String getRepairOperation();
    double getKilometer();
    double getTotal();
    String getStatus();
    String getCurrentAddress();
    String getCurrentPhone();
    String getCustomer();
    String getUser();
    Long getMonth();
}
