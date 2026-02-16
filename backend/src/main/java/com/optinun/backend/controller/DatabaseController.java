package com.optinun.backend.controller;

import com.optinun.backend.entity.Article;
import com.optinun.backend.service.ArticleService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
public class DatabaseController {

    private final ArticleService articleService;

    @GetMapping("/getall")
    public ResponseEntity<List<Article>> getAllArticles(){
        return ResponseEntity.ok().body(articleService.getAllArticles());
    }

    @GetMapping("/getunique")
    public ResponseEntity<List<Article>> getUniqueArticles(){
        return ResponseEntity.ok().body(articleService.getUniqueArticles());
    }

    @GetMapping("/getcluster/{clusterId}")
    public ResponseEntity<List<Article>> getCluster(@PathVariable Integer clusterId){
        return ResponseEntity.ok().body(articleService.getAllFromCluster(clusterId));
    }
    @GetMapping("/getorderedbycluster")
    public ResponseEntity<List<Article>> getOrderedByCluster(){
        return ResponseEntity.ok().body(articleService.getOrderedByClusterId());
    }

    @GetMapping("/getlatest")
    public ResponseEntity<List<Article>> getLatestByDate(){
        return ResponseEntity.ok().body(articleService.getLatest());
    }

    @GetMapping("/getsimilaritysearch")
    public ResponseEntity<List<Article>> getSimilaritySearch(@RequestParam String query){
        return ResponseEntity.ok().body(articleService.similaritySearch(query));
    }
}
