package com.cg.study.service.accessory;

import com.cg.study.model.Accessory;
import com.cg.study.repository.IAccessoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AccessoryService implements IAccessoryService{
    @Autowired
    private IAccessoryRepository accessoryRepository;
    @Override
    public Iterable<Accessory> findAll() {
        return accessoryRepository.findAll();
    }

    @Override
    public Optional<Accessory> findById(Long id) {
        return accessoryRepository.findById(id);
    }

    @Override
    public Accessory save(Accessory accessory) {
        return accessoryRepository.save(accessory);
    }

    @Override
    public void remove(Long id) {
        accessoryRepository.deleteById(id);
    }

    @Override
    public void deleteAccessory(Long id) {
        accessoryRepository.deleteAccessory(id);
    }

    @Override
    public Iterable<Accessory> findAllByAccessory() {
        return accessoryRepository.findAllByAccessory();
    }

    @Override
    public void updateAccessory(Long id) {
        accessoryRepository.updateAccessory(id);
    }
}
