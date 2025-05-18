package com.example.pet.Repository;

import com.example.pet.Entity.OrderDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {
    List<OrderDetails> findByOrder_OrderId(Integer orderId);
}
