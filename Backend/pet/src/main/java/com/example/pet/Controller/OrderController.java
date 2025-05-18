package com.example.pet.Controller;

import com.example.pet.Entity.Order;
import com.example.pet.Repository.OrderRepository;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "order")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("all")
    public @ResponseBody Iterable<Order> getAllOrder() {
        return orderRepository.findAll();
    }

    @GetMapping("search/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Integer id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Order not found!");
        }
        return ResponseEntity.ok(optionalOrder.get());
    }

    @PostMapping("add")
    public ResponseEntity<?> addNewOrder(@RequestBody Order order) {
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(new HashMap<String, Object>() {{
            put("status", "Saved");
            put("orderId", savedOrder.getOrderId());
        }});
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> updateOrder(@PathVariable Integer id, @RequestBody Order order) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Order not found!");
        }

        Order currentOrder = optionalOrder.get();
        currentOrder.setUser(order.getUser());
        currentOrder.setOrderStatus(order.getOrderstatus());
        currentOrder.setOrderTime(order.getOrderTime());
        currentOrder.setOrderTotal(order.getOrderTotal());
        orderRepository.save(currentOrder);
        return ResponseEntity.ok("Order updated successfully!");
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer id) {
        if (!orderRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Order not found!");
        }
        orderRepository.deleteById(id);
        return ResponseEntity.ok("Order deleted successfully!");
    }

}
