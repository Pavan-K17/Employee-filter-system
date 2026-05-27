package com.example.employee_filter_app.specification;

import com.example.employee_filter_app.dto.EmployeeFilterRequest;
import com.example.employee_filter_app.entity.Employee;

import jakarta.persistence.criteria.Predicate;

import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

public class EmployeeSpecification {

    public static Specification<Employee> filterEmployees(
            EmployeeFilterRequest request) {

        return (root, query, criteriaBuilder) -> {

            List<Predicate> predicates = new ArrayList<>();

            // Department Filter
            if (request.getDepartment() != null &&
                    !request.getDepartment().isEmpty()) {

                predicates.add(
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("department")),
                                request.getDepartment().toLowerCase()
                        )
                );
            }

            // Status Filter
            if (request.getStatus() != null &&
                    !request.getStatus().isEmpty()) {

                predicates.add(
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("status")),
                                request.getStatus().toLowerCase()
                        )
                );
            }

            // City Filter
            if (request.getCity() != null &&
                    !request.getCity().isEmpty()) {

                predicates.add(
                        criteriaBuilder.equal(
                                criteriaBuilder.lower(root.get("city")),
                                request.getCity().toLowerCase()
                        )
                );
            }

            // Search Filter
            if (request.getSearch() != null &&
                    !request.getSearch().isEmpty()) {

                Predicate namePredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("name")),
                                "%" + request.getSearch().toLowerCase() + "%"
                        );

                Predicate cityPredicate =
                        criteriaBuilder.like(
                                criteriaBuilder.lower(root.get("city")),
                                "%" + request.getSearch().toLowerCase() + "%"
                        );

                predicates.add(
                        criteriaBuilder.or(namePredicate, cityPredicate)
                );
            }

            return criteriaBuilder.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }
}