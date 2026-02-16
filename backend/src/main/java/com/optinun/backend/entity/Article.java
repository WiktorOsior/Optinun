package com.optinun.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "articles")
public class Article {
    @Id
    @Column(columnDefinition = "TEXT")
    public String link;
    @Column(columnDefinition = "TEXT")
    public String title;
    @Column(columnDefinition = "TEXT")
    public String description;
    public Integer cluster_id;
    @Column(columnDefinition = "TEXT")
    public String img;
    public String agency;
    public Date pubdate;
}
