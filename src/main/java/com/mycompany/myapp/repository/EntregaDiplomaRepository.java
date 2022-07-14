package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.EntregaDiploma;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the EntregaDiploma entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EntregaDiplomaRepository extends JpaRepository<EntregaDiploma, Long> {}
