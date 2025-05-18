package com.example.pet.Repository;

import com.example.pet.Entity.Pets;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PetsRepository extends CrudRepository<Pets,Integer> {
    List<Pets> findByType(boolean type);
    List<Pets> findByNameContainingIgnoreCase(String name);
}
