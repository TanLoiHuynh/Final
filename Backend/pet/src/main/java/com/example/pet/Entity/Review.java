//package com.example.pet.Entity;
//
//import jakarta.persistence.*;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "reviews")
//public class Review {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "review_id")
//    private Integer reviewId;
//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//    @ManyToOne
//    @JoinColumn(name = "pet_id", nullable = false)
//    private Pets pets;
//    @Column(name = "rating")
//    private Integer rating;
//    @Column(name = "comment")
//    private String comment;
//    @Column(name = "review_date", nullable = false, updatable = false)
//    @Temporal(TemporalType.TIMESTAMP)
//    private LocalDateTime reviewTime = LocalDateTime.now();
//
//    public Integer getReviewId() {
//        return reviewId;
//    }
//
//    public void setReviewId(Integer reviewId) {
//        this.reviewId = reviewId;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Pets getPets() {
//        return pets;
//    }
//
//    public void setPets(Pets pets) {
//        this.pets = pets;
//    }
//
//    public Integer getRating() {
//        return rating;
//    }
//
//    public void setRating(Integer rating) {
//        this.rating = rating;
//    }
//
//    public String getComment() {
//        return comment;
//    }
//
//    public void setComment(String comment) {
//        this.comment = comment;
//    }
//
//    public LocalDateTime getReviewTime() {
//        return reviewTime;
//    }
//
//    public void setReviewTime(LocalDateTime reviewTime) {
//        this.reviewTime = reviewTime;
//    }
//}
