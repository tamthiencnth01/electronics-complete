package com.cg.study.service.bill;

import com.cg.study.model.Bill;
import com.cg.study.model.dto.IBillDTO;
import com.cg.study.model.dto.IBillStaticDTO;
import com.cg.study.repository.IBillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BillService implements IBillService{
    @Autowired
    private IBillRepository billRepository;

    @Override
    public Iterable<Bill> findAll() {
        return billRepository.findAll();
    }

    @Override
    public Optional<Bill> findById(Long id) {
        return billRepository.findById(id);
    }

    @Override
    public Bill save(Bill bill) {
        return billRepository.save(bill);
    }

    @Override
    public void remove(Long id) {
        billRepository.deleteById(id);
    }

    @Override
    public Iterable<Bill> selectBillDoing() {
        return billRepository.selectBillDoing();
    }

    @Override
    public void updateTechnician(Long userId,Long id) {
        billRepository.updateTechnician(userId, id);
    }

    @Override
    public Iterable<Bill> selectAllBillForTechnician(Long userId) {
        return billRepository.selectAllBillForTechnician(userId);
    }

    @Override
    public Iterable<Bill> showHistoryAllBillForTechnician(Long userId) {
        return billRepository.showHistoryAllBillForTechnician(userId);
    }

    @Override
    public void updateDoing(String repairOperation, String endDate, Long accesoryId, Long id) {
        billRepository.updateDoing(repairOperation,endDate,accesoryId,id);
    }

    @Override
    public void updateDoingAccessory(Long accesoryId) {

    }

    @Override
    public Iterable<Bill> selectAllBillDoneByTechnician() {
        return billRepository.selectAllBillDoneByTechnician();
    }

    @Override
    public void updateKilometer(double km, Long id) {
        billRepository.updateKilometer(km, id);
    }

    @Override
    public Iterable<Bill> selectAllBillsComplete() {
        return billRepository.selectAllBillsComplete();
    }

    @Override
    public Iterable<Bill> statisticalTechnicians() {
        return billRepository.statisticalTechnicians();
    }

    @Override
    public Iterable<IBillStaticDTO> findTotalMonth(int month, int year) {
        return billRepository.findTotalMonth(month,year);
    }


}
