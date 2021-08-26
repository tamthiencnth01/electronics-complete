package com.cg.study.service.replace;

import com.cg.study.model.Replaced;
import com.cg.study.repository.IReplacedRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class ReplaceService implements IReplaceService{
    @Autowired
    private IReplacedRepository replacedRepository;

    @Override
    public Iterable<Replaced> findAll() {
        return replacedRepository.findAll();
    }

    @Override
    public Optional<Replaced> findById(Long id) {
        return replacedRepository.findById(id);
    }

    @Override
    public Replaced save(Replaced replaced) {
        return replacedRepository.save(replaced);
    }

    @Override
    public void remove(Long id) {
        replacedRepository.deleteById(id);
    }

    @Override
    public void updateFinishDay(Long replacedId, int numberMonth) {
        replacedRepository.updateFinishDay(replacedId,numberMonth);
    }

    @Override
    public Set<Replaced> selectAllReplacedsById(Long id) {
        return replacedRepository.selectAllReplacedsById(id);
    }


}
