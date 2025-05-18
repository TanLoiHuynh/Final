//package com.example.pet.Controller;
//
//import com.example.pet.Entity.Review;
//import com.example.pet.Repository.ReviewRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Optional;
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:5173")
//@RestController
//@RequestMapping(path = "/review")
//public class ReviewController {
//
//    @Autowired
//    private ReviewRepository reviewRepository;
//
//    @GetMapping("/all")
//    public Iterable<Review> getAllReviews() {
//        return reviewRepository.findAll();
//    }
//
//    @GetMapping("/pet/{petId}")
//    public List<Review> getReviewsByPet(@PathVariable Integer petId) {
//        return reviewRepository.findByPets_PetId(petId);
//    }
//
//    @PostMapping("/add")
//    public Review addReview(@RequestBody Review review) {
//        return reviewRepository.save(review);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<?> deleteReview(@PathVariable Integer id) {
//        if (!reviewRepository.existsById(id)) {
//            return ResponseEntity.badRequest().body("Review not found");
//        }
//        reviewRepository.deleteById(id);
//        return ResponseEntity.ok("Review deleted successfully");
//    }
//
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> updateReview(@PathVariable Integer id, @RequestBody Review review) {
//        Optional<Review> existing = reviewRepository.findById(id);
//        if (existing.isEmpty()) {
//            return ResponseEntity.badRequest().body("Review not found");
//        }
//        Review current = existing.get();
//        current.setRating(review.getRating());
//        current.setComment(review.getComment());
//        return ResponseEntity.ok(reviewRepository.save(current));
//    }
//}
