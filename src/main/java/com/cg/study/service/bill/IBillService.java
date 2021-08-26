package com.cg.study.service.bill;

import com.cg.study.model.Bill;
import com.cg.study.model.dto.IBillDTO;
import com.cg.study.service.IGeneralService;
import org.springframework.data.repository.query.Param;

public interface IBillService extends IGeneralService<Bill> {
    public Iterable<Bill> selectBillDoing();
    public void updateTechnician(Long userId,Long id);
    public Iterable<Bill> selectAllBillForTechnician(@Param("userId") Long userId);
    public Iterable<Bill> showHistoryAllBillForTechnician(@Param("userId") Long userId);
    public void updateDoing(@Param("repairOperation")String repairOperation,@Param("endDate")String endDate, @Param("accesoryId") Long accesoryId,@Param("id")  Long id);
    public void updateDoingAccessory(@Param("accesoryId") Long accesoryId);
    public Iterable<Bill> selectAllBillDoneByTechnician();
    public void updateKilometer(@Param("km") double km, @Param("bill_id") Long id);
    public Iterable<Bill> selectAllBillsComplete();
    public Iterable<Bill> statisticalTechnicians();
}
