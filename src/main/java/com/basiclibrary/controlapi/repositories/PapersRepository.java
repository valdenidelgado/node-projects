package com.basiclibrary.controlapi.repositories;

import com.basiclibrary.controlapi.model.Papers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface PapersRepository extends JpaRepository<Papers, UUID> {
}
