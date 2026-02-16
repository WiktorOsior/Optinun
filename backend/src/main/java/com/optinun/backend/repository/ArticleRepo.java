package com.optinun.backend.repository;

import com.optinun.backend.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArticleRepo  extends JpaRepository<Article, String> {
    @Query(value = "SELECT DISTINCT ON (a.cluster_id) a.* FROM articles a WHERE a.cluster_id IS NOT NULL ORDER BY a.cluster_id", nativeQuery = true)
    public List<Article> findDistinctByClusterID();

    @Query(value = "SELECT a FROM Article a WHERE a.cluster_id = :clusterId")
    public List<Article> findByClusterId(Integer clusterId);

    @Query(value = "SELECT a FROM Article a ORDER BY a.cluster_id")
    public List<Article> findAllOrderByClusterID();

    @Query(value = "SELECT DISTINCT ON (a.cluster_id) a.* FROM articles a WHERE a.cluster_id IS NOT NULL AND pubdate > NOW() - INTERVAL '3 day' ORDER BY a.cluster_id", nativeQuery = true)
    public List<Article> findLatest();

    @Query(value = "SELECT a.* FROM articles a WHERE 1 - (a.embedding <=> CAST(:embedding AS vector(1024))) > 0.7 ORDER BY 1 - (a.embedding <=> CAST(:embedding AS vector(1024))) DESC LIMIT 10", nativeQuery = true)
    List<Article> findBySimilarity(float[] embedding);
}
