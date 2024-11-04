package com.example.homework5.service;

import com.example.homework5.entity.Ramen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface RamenService {

    List<Ramen> findAll();

    Page<Ramen> findAll(Pageable pageable);

    List<Ramen> findByFilter(int minEval, int maxEval);

    Page<Ramen> findByFilter(String keyword,int minEval, int maxEval, Pageable pageable);

    void insert(Ramen ramen);
}
