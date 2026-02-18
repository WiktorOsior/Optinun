package com.optinun.backend.repository;

import com.optinun.backend.entity.Article;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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

    @Query(value = """
    SELECT * FROM (
        SELECT DISTINCT ON (a.cluster_id) a.* FROM articles a 
        WHERE a.cluster_id IS NOT NULL 
        AND a.pubdate > NOW() - INTERVAL '3 day' 
        ORDER BY a.cluster_id, a.pubdate DESC
    ) subquery 
    ORDER BY pubdate DESC 
    LIMIT 36
    """, nativeQuery = true)
    public List<Article> findLatest();

    @Query(value = """
        SELECT DISTINCT ON (a.cluster_id) a.* FROM articles a 
        WHERE a.cluster_id IS NOT NULL 
        ORDER BY a.cluster_id, a.pubdate DESC
        """,
            nativeQuery = true)
    Slice<Article> findDistinctArticlesSlice(Pageable pageable);

    @Query(value = """
    SELECT DISTINCT ON (cluster_id) * FROM (
        SELECT *, 
               COUNT(*) OVER (PARTITION BY cluster_id) as total_in_cluster
        FROM articles
    ) subquery
    WHERE total_in_cluster > 3
    ORDER BY cluster_id, pubdate DESC
    """, nativeQuery = true)
    List<Article> findUniqueHottestArticles();
}
