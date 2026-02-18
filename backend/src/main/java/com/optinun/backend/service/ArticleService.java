package com.optinun.backend.service;

import com.optinun.backend.entity.Article;
import com.optinun.backend.repository.ArticleRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.Console;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleService {
    private final ArticleRepo articleRepo;

    public List<Article> getAllArticles() {
        return articleRepo.findAll();
    }

    public List<Article> getUniqueArticles() {
        return articleRepo.findDistinctByClusterID();
    }

    public List<Article> getAllFromCluster(Integer clusterId) {
        List<Article> articles = articleRepo.findByClusterId(clusterId);
        if (articles != null && !articles.isEmpty()) {
            return articles;
        } else {
            log.error("No articles found for cluster ID {}", clusterId);
            return List.of();
        }
    }

    public List<Article> getOrderedByClusterId() {
        return articleRepo.findAllOrderByClusterID();
    }

    public List<Article> getLatest() {
        return articleRepo.findLatest();
    }

    public Article getArticleBylink(String link) {
        Optional<Article> article = articleRepo.findById(link);
        if (article.isPresent()) {
            return article.get();
        }
        log.error("Article with link {} not found", link);
        return null;
    }

    private final RestTemplate restTemplate = new RestTemplate();

    public List<Article> similaritySearch (String input) {
        String url = UriComponentsBuilder.fromHttpUrl("http://fastapi-service:8000/similaritysearch/")
                .queryParam("input", input)
                .encode()
                .toUriString();

        try {
            Article[] response = restTemplate.getForObject(url, Article[].class);

            return response != null ? Arrays.asList(response) : Collections.emptyList();
        } catch (Exception e) {
            System.err.println("Error FastAPI: " + e.getMessage());
            return Collections.emptyList();
        }
    }
    public Slice<Article> findDistinctArticlesSlice(Pageable pageable) {
        return articleRepo.findDistinctArticlesSlice(pageable);
    }
    public void deleteArticleBylink (String link) {
        articleRepo.deleteById(link);
    }

    public List<Article> getHottestUniqueFeed() {
        return articleRepo.findUniqueHottestArticles();
    }
}
