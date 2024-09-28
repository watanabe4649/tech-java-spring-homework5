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

    @PostMapping("/insert")
    public void insert(@RequestBody Ramen ramen){
        ramenService.insert(ramen);
    }

    @GetMapping("/findByFilter")
//    public List<Ramen> findByFilter(@RequestParam int minEval, @RequestParam int maxEval){
        public List<Ramen> findByFilter(@RequestParam (name="minEval", required=false)Integer minEval, @RequestParam (name="maxEval", required=false)Integer maxEval) {
//        public List<Ramen> findByFilter(@RequestParam (name="minEval", required=false)int minEval, @RequestParam (name="maxEval", required=false)int maxEval) {
        //return ramenService.findByFilter(minEval,maxEval);
        System.out.println(minEval);
        System.out.println(maxEval);
        List<Ramen> ramenList2 = null;
        if (minEval != null && maxEval != null) {
            List<Ramen> ramenList = ramenService.findByFilter();
            ramenList2 = ramenList.stream()
                    .filter(ramen -> ramen.getEvaluation() >= minEval && ramen.getEvaluation() <= maxEval)
                    .toList();
        }else if (minEval == null) {
            List<Ramen> ramenList = ramenService.findByFilter();
            ramenList2 = ramenList.stream()
                    .filter(ramen -> ramen.getEvaluation() <= maxEval)
                    .toList();
        }else{
            List<Ramen> ramenList = ramenService.findByFilter();
            ramenList2 = ramenList.stream()
                    .filter(ramen -> ramen.getEvaluation() >= minEval)
                    .toList();
        }
        return ramenList2;
    }
}
