package com.example.pet.Repository;

import com.example.pet.Entity.Order;
import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Order,Integer> {
}
