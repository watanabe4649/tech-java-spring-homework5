package com.example.homework5.repository;

import com.example.homework5.entity.Ramen;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RamenRepository extends Repository<Ramen, Integer> {

    @Query(value = "SELECT * FROM ramen_table")
    List<Ramen> findAll();

    @Modifying
    @Query(value = "INSERT INTO ramen_table(name, shop_name, evaluation) VALUES (:name, :shopName, :evaluation)")
    void insert(@Param("name") String name, @Param("shopName") String shopName, @Param("evaluation") int evaluation);
}

