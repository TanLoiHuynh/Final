package com.example.pet.Controller;

import com.example.pet.Entity.Cart;
import com.example.pet.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:5173","http://localhost:5174"})
@RestController
@RequestMapping(path = "/cart")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/all")
    public @ResponseBody Iterable<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @GetMapping("/search/{id}")
    public ResponseEntity<?> getCartById(@PathVariable Integer id) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Cart not found!");
        }
        return ResponseEntity.ok(optionalCart.get());
    }

    @PostMapping("/add")
    public ResponseEntity<String> addNewCart(@RequestBody Cart cart) {
        Optional<Cart> existingCartItem = cartRepository.findByUserIdAndPetId(
                cart.getUser().getUserId(),
                cart.getPet().getPet_id()
        );

        if (existingCartItem.isPresent()) {
            Cart updatedCart = existingCartItem.get();
            updatedCart.setQuantity(updatedCart.getQuantity() + cart.getQuantity());
            cartRepository.save(updatedCart);
            return ResponseEntity.ok("Sản phẩm đã được cập nhật trong giỏ hàng!");
        } else {
            cartRepository.save(cart);
            return ResponseEntity.ok("Sản phẩm đã được thêm vào giỏ hàng!");
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateCart(@PathVariable Integer id, @RequestBody Cart cart) {
        Optional<Cart> optionalCart = cartRepository.findById(id);
        if (optionalCart.isEmpty()) {
            return ResponseEntity.badRequest().body("Error: Cart not found!");
        }

        Cart currentCart = optionalCart.get();
        currentCart.setCartId(cart.getCartId());
        currentCart.setUser(cart.getUser());
        currentCart.setPet(cart.getPet());
        currentCart.setQuantity(cart.getQuantity());
        currentCart.setCartTime(cart.getCartTime());
        currentCart.setOrdered(cart.getOrdered());
        cartRepository.save(currentCart);
        return ResponseEntity.ok("Cart updated successfully!");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCart(@PathVariable Integer id) {
        if (!cartRepository.existsById(id)) {
            return ResponseEntity.badRequest().body("Error: Cart not found!");
        }
        cartRepository.deleteById(id);
        return ResponseEntity.ok("Cart deleted successfully!");
    }
}
