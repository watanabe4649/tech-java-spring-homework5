package com.example.homework5.service;

import com.example.homework5.entity.Ramen;
import com.example.homework5.repository.RamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RamenServiceImpl implements RamenService{

    @Autowired
    RamenRepository ramenRepository;

    @Override
    public List<Ramen> findAll() {
        return ramenRepository.findAll();
    }

    @Override
    public Page<Ramen> findAll(Pageable pageable) {

        List<Ramen> ramenList = ramenRepository.findAll();
        int start = (int)pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), ramenList.size());

        return new PageImpl<>(ramenList.subList(start, end), pageable, ramenList.size());
    }

    @Override
    public List<Ramen> findByFilter(int minEval, int maxEval) {
        List<Ramen> ramenList = ramenRepository.findAll();
        List<Ramen> filteredRamenList = new ArrayList<>();
        for (Ramen ramen : ramenList) {
            if (ramen.getEvaluation() >= minEval && ramen.getEvaluation() <= maxEval) {
                filteredRamenList.add(ramen);
            }
        }
        return filteredRamenList;
    }

    @Override
    public void insert(Ramen ramen) {
        ramenRepository.insert(ramen.getName(), ramen.getShopName(), ramen.getEvaluation());
    }
}
