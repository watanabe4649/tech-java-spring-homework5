package com.example.homework5.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Generated;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
public class Ramen {
    @Id
    private Integer id;
    private String name;
    private String shopName;
    private int evaluation;
}
