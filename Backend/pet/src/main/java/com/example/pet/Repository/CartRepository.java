package com.example.pet.Repository;

import com.example.pet.Entity.Cart;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartRepository extends CrudRepository<Cart, Integer> {
    @Query("SELECT c FROM Cart c WHERE c.user.userId = :userId AND c.pet.pet_id = :petId")
    Optional<Cart> findByUserIdAndPetId(@Param("userId") Integer userId, @Param("petId") Integer petId);
}
