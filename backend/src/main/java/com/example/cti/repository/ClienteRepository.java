package com.example.cti.repository;

import com.example.cti.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    // Métodos de banco de dados prontos (Salvar, Buscar por ID, Listar todos, Deletar)
}
