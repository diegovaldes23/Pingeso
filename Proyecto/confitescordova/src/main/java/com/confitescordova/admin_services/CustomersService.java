package com.confitescordova.admin_services;

import com.confitescordova.admin_entities.Customer;
import com.confitescordova.admin_repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomersService {
    @Autowired
    private CustomerRepository customerRepository;

    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer getCustomerByPhone(String phone) {
        return customerRepository.findByPhone(phone);
    }

    public void saveCustomer(Customer customer) {
        customerRepository.save(customer);
    }

    public boolean existsCustomerById(Long customerId) {
        return customerRepository.existsById(customerId);
    }

    public boolean existsCustomerByPhoneOrName(String phone, String name) {
        return customerRepository.existsCustomerByPhoneOrName(phone, name);
    }

    public Optional<Customer> getCustomerById(Long customerId) {
        return customerRepository.findById(customerId);
    }

    public Optional<Customer> getCustomerByPhoneAndName(String phone, String name) {
        return customerRepository.findByPhoneAndName(phone, name);
    }

}
