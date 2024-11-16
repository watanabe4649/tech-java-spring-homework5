package com.example.homework5.controller;

import com.example.homework5.entity.Ramen;
import com.example.homework5.exception.BadRequestException;
import com.example.homework5.service.RamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("ramen")
public class RamenController {

    @Autowired
    RamenService ramenService;

    @GetMapping("/findAll")
    public Page<Ramen> findAll(Pageable pageable){
        return ramenService.findAll(pageable);
    }

    @GetMapping("/findByFilter")
    public Page<Ramen> findByFilter(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false, defaultValue = "0") int minEval,
            @RequestParam(required = false, defaultValue = "5") int maxEval,
            Pageable pageable
    ) {

        if(minEval <= 0 || maxEval >= 6 || minEval>maxEval) {

            throw new BadRequestException("値が不適切です。");
        }

        return ramenService.findByFilter(keyword, minEval, maxEval, pageable);
    }

    @PostMapping("/insert")
    public void insert(@RequestBody Ramen ramen){
        ramenService.insert(ramen);
    }
}
