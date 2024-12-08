package com.confitescordova.admin_repositories;

import com.confitescordova.admin_entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByPhone(String phone);
    Optional<Customer> findByPhoneAndName(String name, String phone);
}
