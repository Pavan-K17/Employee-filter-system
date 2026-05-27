package com.example.employee_filter_app.controller;

import com.example.employee_filter_app.dto.EmployeeFilterRequest;
import com.example.employee_filter_app.entity.Employee;
import com.example.employee_filter_app.service.EmployeeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @PostMapping("/filter")
    public Page<Employee> filterEmployees(

            @RequestBody EmployeeFilterRequest request,

            @RequestParam(defaultValue = "0")
            int page,

            @RequestParam(defaultValue = "5")
            int size,

            @RequestParam(defaultValue = "id")
            String sortBy,

            @RequestParam(defaultValue = "asc")
            String sortDirection
    ) {

        return employeeService.filterEmployees(
                request,
                page,
                size,
                sortBy,
                sortDirection
        );
    }
}