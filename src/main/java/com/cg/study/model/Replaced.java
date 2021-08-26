package com.cg.study.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "replaces")
public class Replaced {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accessoryName;
    private String accessoryDescription;
    private double retailPrice;
    @Basic(optional = false)
    @Column(name = "StartDated", insertable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date startDate;

    private Date finishDate;
    private String purchaseDay;
    private int status;
    private String reason;

    private String photo;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
