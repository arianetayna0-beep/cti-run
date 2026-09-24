package com.example.cti.controller;

import com.example.cti.model.Cliente;
import com.example.cti.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    // Endpoint GET: Lista todos os clientes cadastrados no banco
    @GetMapping
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }

    // Endpoint POST: Salva um novo cliente vindo do processamento ou cadastro
    @PostMapping
    public Cliente salvarCliente(@RequestBody Cliente cliente) {
        return clienteRepository.save(cliente);
    }
}