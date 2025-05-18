package com.example.pet.Controller;

import com.example.pet.Entity.User;
import com.example.pet.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(path = "/add")
    public @ResponseBody String addNewUser(@RequestBody User user) {
        userRepository.save(user);
        return "User saved";
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: User not found!");
        }
        userRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully!");
    }

    @PutMapping(path = "/update/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Integer id, @RequestBody User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: User not found!");
        }

        User currentUser = optionalUser.get();
        currentUser.setUserId(user.getUserId());
        currentUser.setUserName(user.getUserName());
        currentUser.setUserSex(user.getUserSex());
        currentUser.setUserPassword(user.getUserPassword());
        currentUser.setUserEmail(user.getUserEmail());
        currentUser.setUserPhone(user.getUserPhone());
        currentUser.setUserAddress(user.getUserAddress());

        userRepository.save(currentUser);
        return ResponseEntity.ok("User updated successfully!");
    }

    @GetMapping(path = "/search/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Integer id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: User not found!");
        }
        return ResponseEntity.ok(optionalUser.get());
    }
}
