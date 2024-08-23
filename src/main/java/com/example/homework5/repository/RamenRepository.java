package com.example.homework5.repository;

import com.example.homework5.entity.Ramen;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;

import java.util.List;

public interface RamenRepository extends Repository<Ramen, Integer> {

    @Query(value = "SELECT * FROM ramen_table")
    List<Ramen> findAll();
}
