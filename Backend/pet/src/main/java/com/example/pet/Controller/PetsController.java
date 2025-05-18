package com.example.pet.Controller;

import com.example.pet.Entity.Category;
import com.example.pet.Entity.Pets;
import com.example.pet.Repository.CategoryRepository;
import com.example.pet.Repository.PetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "/pets")
public class PetsController {

    @Autowired
    private PetsRepository petsRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Pets> getAllPets() {
        return petsRepository.findAll();
    }

    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public ResponseEntity<?> createPet(
            @RequestParam("name") String name,
            @RequestParam("type") boolean type,
            @RequestParam("gender") boolean gender,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("status") boolean status,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        try {
            Pets pet = new Pets();
            pet.setName(name);
            pet.setType(type);
            pet.setGender(gender);
            pet.setDescription(description);
            pet.setPrice(price);
            pet.setStatus(status);

            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            pet.setCategory(category);

            if (imageFile != null && !imageFile.isEmpty()) {
                String uploadDir = "image/";
                File dir = new File(uploadDir);
                if (!dir.exists() && !dir.mkdirs()) {
                    return ResponseEntity.internalServerError().body("Không thể tạo thư mục lưu ảnh.");
                }

                String fileName = imageFile.getOriginalFilename();
                Path path = Paths.get(uploadDir + fileName);
                Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                pet.setImage(fileName);
            }

            Pets savedPet = petsRepository.save(pet);
            return ResponseEntity.ok(savedPet);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi thêm thú cưng: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deletePets(@PathVariable Integer id) {
        if (!petsRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Pet not found!");
        }
        petsRepository.deleteById(id);
        return ResponseEntity.ok("Pet deleted successfully!");
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updatePets(
            @PathVariable Integer id,
            @RequestParam("name") String name,
            @RequestParam("type") boolean type,
            @RequestParam("gender") boolean gender,
            @RequestParam("description") String description,
            @RequestParam("price") BigDecimal price,
            @RequestParam("status") boolean status,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile
    ) {
        Optional<Pets> optionalPets = petsRepository.findById(id);
        if (optionalPets.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Pet not found!");
        }

        try {
            Pets currentPets = optionalPets.get();
            currentPets.setName(name);
            currentPets.setType(type);
            currentPets.setGender(gender);
            currentPets.setDescription(description);
            currentPets.setPrice(price);
            currentPets.setStatus(status);

            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            currentPets.setCategory(category);

            if (imageFile != null && !imageFile.isEmpty()) {
                String uploadDir = "image/";
                File dir = new File(uploadDir);
                if (!dir.exists() && !dir.mkdirs()) {
                    return ResponseEntity.internalServerError().body("Không thể tạo thư mục lưu ảnh.");
                }

                String fileName = imageFile.getOriginalFilename();
                Path path = Paths.get(uploadDir + fileName);
                Files.copy(imageFile.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

                currentPets.setImage(fileName);
            }

            petsRepository.save(currentPets);
            return ResponseEntity.ok("Pet updated successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Lỗi khi cập nhật thú cưng: " + e.getMessage());
        }
    }



    @GetMapping(path = "/search/{id}")
    public ResponseEntity<?> getPetsById(@PathVariable Integer id) {
        Optional<Pets> optionalPets = petsRepository.findById(id);
        if (optionalPets.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Pet not found!");
        }
        return ResponseEntity.ok(optionalPets.get());

    }
    @GetMapping("/type/{type}")
    public List<Pets> getPetsByType(@PathVariable boolean type) {
        return petsRepository.findByType(type);
    }
    @GetMapping("/search")
    public ResponseEntity<?> searchPetsByName(@RequestParam("name") String name) {
        List<Pets> pets = petsRepository.findByNameContainingIgnoreCase(name);
        return ResponseEntity.ok(pets);
    }
    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> handleUpload(@RequestParam("file") MultipartFile file) throws IOException {
        String uploadDir = "image/";
        File dir = new File(uploadDir);
        boolean created = dir.mkdirs();
        if (!dir.exists() && !created) {
            return ResponseEntity.internalServerError().body(Map.of("error", "Could not create directory"));
        }

        String fileName = file.getOriginalFilename();
        if (fileName == null || fileName.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "File name is invalid"));
        }

        Path path = Paths.get(uploadDir, fileName);
        Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);

        return ResponseEntity.ok(Map.of("fileName", fileName));
    }
}
