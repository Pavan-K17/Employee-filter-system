package com.example.employee_filter_app.service;

import com.example.employee_filter_app.dto.EmployeeFilterRequest;
import com.example.employee_filter_app.entity.Employee;
import com.example.employee_filter_app.repository.EmployeeRepository;
import com.example.employee_filter_app.specification.EmployeeSpecification;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public Page<Employee> filterEmployees(
            EmployeeFilterRequest request,
            int page,
            int size,
            String sortBy,
            String sortDirection) {

        Sort sort = sortDirection.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Specification<Employee> specification =
                EmployeeSpecification.filterEmployees(request);

        return employeeRepository.findAll(specification, pageable);
    }
}