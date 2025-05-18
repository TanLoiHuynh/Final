package com.example.pet.Controller;

import com.example.pet.Entity.OrderDetails;
import com.example.pet.Repository.OrderDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "/orderdetails")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @GetMapping("/all")
    public @ResponseBody Iterable<OrderDetails> getAllOrderDetails() {
        return orderDetailsRepository.findAll();
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> getOrderDetailById(@PathVariable Integer id) {
        Optional<OrderDetails> optional = orderDetailsRepository.findById(id);
        if (optional.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Order detail not found!");
        }
        return ResponseEntity.ok(optional.get());
    }

    @PostMapping("/add")
    public @ResponseBody String addNewOrderDetail(@RequestBody OrderDetails orderDetails) {
        orderDetailsRepository.save(orderDetails);
        return "Saved";
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateOrderDetail(@PathVariable Integer id, @RequestBody OrderDetails orderDetails) {
        Optional<OrderDetails> optionalDetails = orderDetailsRepository.findById(id);
        if (optionalDetails.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Order detail not found!");
        }

        OrderDetails current = optionalDetails.get();
        current.setOrder(orderDetails.getOrder());
        current.setPet(orderDetails.getPet());
        current.setQuantity(orderDetails.getQuantity());
        current.setPrice(orderDetails.getPrice());

        orderDetailsRepository.save(current);
        return ResponseEntity.ok("Order detail updated successfully!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOrderDetail(@PathVariable Integer id) {
        if (!orderDetailsRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Order detail not found!");
        }
        orderDetailsRepository.deleteById(id);
        return ResponseEntity.ok("Order detail deleted successfully!");
    }
}
