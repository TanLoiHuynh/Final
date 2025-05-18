package com.example.pet.Controller;

import com.example.pet.Entity.OrderStatus;
import com.example.pet.Repository.OrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "OrderStatus")
public class OrderStatusController {

    @Autowired
    private OrderStatusRepository orderStatusRepository;

    @GetMapping("all")
    public @ResponseBody Iterable<OrderStatus> getAllOrderStatus() {
        return orderStatusRepository.findAll();
    }

    @GetMapping("search/{id}")
    public ResponseEntity<?> getOrderStatusById(@PathVariable Integer id) {
        Optional<OrderStatus> optionalStatus = orderStatusRepository.findById(id);
        if (optionalStatus.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Status not found!");
        }
        return ResponseEntity.ok(optionalStatus.get());
    }
}
