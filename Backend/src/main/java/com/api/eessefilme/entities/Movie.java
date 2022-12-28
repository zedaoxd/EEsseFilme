package com.api.eessefilme.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.*;

@Entity
@Table(name = "tb_movie")
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Movie implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Column(nullable = false, length = 100)
    private String originTitle;

    @Column(nullable = false, length = 100)
    private String nationalTitle;

    @Column(nullable = false)
    private String image;

    private Date releaseDate;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String synopsis;

    @Column(nullable = false)
    private Integer parentalRating;

    @Column(nullable = false)
    private String mainActors;
    @Column(nullable = false)
    private Double averageRating;

    @Column(nullable = false)
    private String movieTrailer;

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL)
    private List<Rating> ratings = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "tb_movie_genre",
        joinColumns = @JoinColumn(name = "movie_id"),
        inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private Set<Genre> genres = new HashSet<>();

    @PrePersist
    public void prePersist() {
        averageRating = 0d;
    }

    @PreUpdate
    public void updateAverageRating() {
        // TODO: por a formula do Roberto aqui
    }
}
