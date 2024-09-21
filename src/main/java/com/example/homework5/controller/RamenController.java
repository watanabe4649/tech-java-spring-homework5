package com.example.homework5.controller;

import com.example.homework5.entity.Ramen;
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

    @GetMapping("/findByFilter")
    public List<Ramen> findByFilter(
            @RequestParam(required = false, defaultValue = "0") int minEval,
            @RequestParam(required = false, defaultValue = "5") int maxEval
    ){
        return ramenService.findByFilter(minEval, maxEval);
    }

    @PostMapping("/insert")
    public void insert(@RequestBody Ramen ramen){
        ramenService.insert(ramen);
    }
}
