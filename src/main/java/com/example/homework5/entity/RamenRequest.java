package com.example.homework5.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor //デフォルトコンストラクタ作成する@なぜか作成する必要あり、使わないとJSON PARSE ERROR

public class RamenRequest {
    private String name;
}
