package com.example.homework5.service;

import com.example.homework5.entity.Ramen;
import com.example.homework5.repository.RamenRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
