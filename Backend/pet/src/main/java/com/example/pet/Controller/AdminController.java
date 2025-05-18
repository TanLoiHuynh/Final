package com.example.pet.Controller;

import com.example.pet.Entity.Admin;
import com.example.pet.Repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "/admin")
public class AdminController {
    @Autowired
    private AdminRepository adminRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Admin> getAllAdmin() {
        return adminRepository.findAll();
    }
    @PostMapping(path = "/add")
    public @ResponseBody String addNewAdmin(@RequestBody Admin admin) {
        adminRepository.save(admin);
        return "Admin saved";
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteAdmin(@PathVariable Integer id) {
        if (!adminRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Admin not found!");
        }
        adminRepository.deleteById(id);
        return ResponseEntity.ok("Admin deleted successfully!");
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateAdmin(@PathVariable Integer id, @RequestBody Admin admin) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Admin not found!");
        }

        Admin currentAdmin = optionalAdmin.get();
        currentAdmin.setAdminId(admin.getAdminId());
        currentAdmin.setAdminName(admin.getAdminName());
        currentAdmin.setAdminPassword(admin.getAdminPassword());
        currentAdmin.setAdminEmail(admin.getAdminEmail());
        currentAdmin.setAdminPhone(admin.getAdminPhone());
        currentAdmin.setAdminAddress(admin.getAdminAddress());

        adminRepository.save(currentAdmin);
        return ResponseEntity.ok("Admin updated successfully!");
    }

    @GetMapping(path = "/search/{id}")
    public ResponseEntity<?> getAdminById(@PathVariable Integer id) {
        Optional<Admin> optionalAdmin = adminRepository.findById(id);
        if (optionalAdmin.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Admin not found!");
        }
        return ResponseEntity.ok(optionalAdmin.get());
    }

}
