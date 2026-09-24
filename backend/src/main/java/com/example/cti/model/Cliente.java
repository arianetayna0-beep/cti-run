package com.example.cti.model;

import jakarta.persistence.*;

@Entity
@Table(name = "clientes")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String codigoCTI;

    private String segmento;
    
    private String nivel; // Classificação A, B ou C
    
    private Double faixaFaturamento;

    // Relacionamento: N Clientes pertencem a 1 Consultor
    @ManyToOne
    @JoinColumn(name = "consultor_id")
    private Consultor consultor;

    // Construtor vazio (obrigatório para o Spring/JPA)
    public Cliente() {}

    // Construtor com parâmetros
    public Cliente(String codigoCTI, String segmento, String nivel, Double faixaFaturamento, Consultor consultor) {
        this.codigoCTI = codigoCTI;
        this.segmento = segmento;
        this.nivel = nivel;
        this.faixaFaturamento = faixaFaturamento;
        this.consultor = consultor;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCodigoCTI() { return codigoCTI; }
    public void setCodigoCTI(String codigoCTI) { this.codigoCTI = codigoCTI; }

    public String getSegmento() { return segmento; }
    public void setSegmento(String segmento) { this.segmento = segmento; }

    public String getNivel() { return nivel; }
    public void setNivel(String nivel) { this.nivel = nivel; }

    public Double getFaixaFaturamento() { return faixaFaturamento; }
    public void setFaixaFaturamento(Double faixaFaturamento) { this.faixaFaturamento = faixaFaturamento; }

    public Consultor getConsultor() { return consultor; }
    public void setConsultor(Consultor consultor) { this.consultor = consultor; }
}