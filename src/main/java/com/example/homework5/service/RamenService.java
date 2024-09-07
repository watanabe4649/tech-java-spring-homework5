package com.example.homework5.service;

import com.example.homework5.entity.Ramen;
import com.example.homework5.entity.RamenRequest;

import java.util.List;

public interface RamenService {

    List<Ramen> findAll();

    void insert(RamenRequest ramenRequest);
}
