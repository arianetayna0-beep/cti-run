package com.example.cti.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Entity
@Table(name = "consultores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Consultor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String matricula;

    @OneToMany(mappedBy = "consultor", cascade = CascadeType.ALL)
    private List<Cliente> clientes;
}