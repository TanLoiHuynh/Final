package com.example.pet.Repository;

import com.example.pet.Entity.OrderStatus;
import org.springframework.data.repository.CrudRepository;

public interface OrderStatusRepository extends CrudRepository<OrderStatus,Integer> {
}
