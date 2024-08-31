package com.example.homework5.service;

import com.example.homework5.entity.Ramen;

import java.util.List;

public interface RamenService {

    List<Ramen> findAll();

    void insert(Ramen ramen);
}
