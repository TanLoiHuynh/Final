package com.example.pet.Repository;

import com.example.pet.Entity.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository <Category, Integer> {
}
