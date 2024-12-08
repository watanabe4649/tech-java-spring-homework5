package com.example.homework5.controller;

import com.example.homework5.entity.Ramen;
import com.example.homework5.exception.BadRequestException;
import com.example.homework5.exception.NotFoundException;
import com.example.homework5.exception.UnprocessableEntityException;
import com.example.homework5.service.RamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
    ){

//        if(Strings.isEmpty(keyword)){
//            throw new NotFoundException("見つかりませんでした" );
//        }


        // 入力バリデーション
        if (minEval < 0) {
            throw new BadRequestException("最小評価は1以上で入力してください。");
        }
        if (maxEval > 5) {
            throw new BadRequestException("最大評価は5以下で入力してください。");
        }
        if (minEval > maxEval) {
            throw new UnprocessableEntityException("最小評価は最大評価以下で入力してください。");
        }

        Page<Ramen> ramen =ramenService.findByFilter(keyword, minEval, maxEval, pageable);

        if(ramen.getTotalElements() == 0){
            throw new NotFoundException("該当するラーメンが見つかりませんでした" );
        }
        return ramen;
    }

//    @GetMapping("/findByFilter")
//    public ResponseEntity<?> findByFilter(
//            @RequestParam(required = false, defaultValue = "") String keyword,
//            @RequestParam(required = false, defaultValue = "0") int minEval,
//            @RequestParam(required = false, defaultValue = "5") int maxEval,
//            Pageable pageable
//    ){
//        // 入力バリデーション
//        if (minEval < 0 || minEval > 5 || maxEval < 0 || maxEval > 5 || minEval > maxEval) {
//            Map<String, String> errorResponse = new HashMap<>();
//            errorResponse.put("error", "Invalid parameters. Please ensure minEval and maxEval are between 0 and 5, and minEval is not greater than maxEval.");
//            return ResponseEntity.badRequest().body(errorResponse);
//        }
//        // 正常処理
//        Page<Ramen> result = ramenService.findByFilter(keyword, minEval, maxEval, pageable);
//        return ResponseEntity.ok(result);
//    }

    @PostMapping("/insert")
    public void insert(@RequestBody Ramen ramen){
        ramenService.insert(ramen);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestException(BadRequestException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return ResponseEntity.badRequest().body(errorResponse);
    }

    @ExceptionHandler(NotFoundException.class)
    // jsファイルにステータス渡している？
    public ResponseEntity<?> handleBadRequestException(NotFoundException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(UnprocessableEntityException.class)
    // jsファイルにステータス渡している？
    public ResponseEntity<?> handleBadRequestException(UnprocessableEntityException e) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", e.getMessage());
        return ResponseEntity.unprocessableEntity().body(errorResponse);
    }
}
