package com.example.pet.Controller;

import com.example.pet.Entity.Category;
import com.example.pet.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "/category")

public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;
    @GetMapping(path="/all")
    public @ResponseBody Iterable<Category> getAllCategories(){
        return categoryRepository.findAll();
    }
    // Add a new category
    @PostMapping(path="/add")
    public @ResponseBody String addNewCategory (@RequestBody Category category)     {
        categoryRepository.save(category);
        return "Saved";
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateCategory(@PathVariable Integer id, @RequestBody Category category) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Category not found!");
        }
        Category currentCategory = optionalCategory.get();
        currentCategory.setCategoryId(category.getCategoryId());
        currentCategory.setCategoryName(category.getCategoryName());
        currentCategory.setCategoryStatus(category.getCategoryStatus());
        categoryRepository.save(currentCategory);

        return ResponseEntity.ok("Category updated successfully!");
    }
    // Delete a category
    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Integer id) {
        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Category not found!");
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Category deleted successfully!");
    }

}
