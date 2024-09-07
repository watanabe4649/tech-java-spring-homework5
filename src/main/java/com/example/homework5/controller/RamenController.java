package com.example.homework5.controller;

import com.example.homework5.entity.Ramen;
import com.example.homework5.entity.RamenRequest;
import com.example.homework5.service.RamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ramen")
public class RamenController {

    @Autowired
    RamenService ramenService;

    @GetMapping("/findAll")
    public List<Ramen> findAll(){
        return ramenService.findAll();
    }

    @PostMapping("/insert")
    public String insert(@RequestBody RamenRequest ramenRequest){
        ramenService.insert(ramenRequest);
        return "insert success";
    }
}
