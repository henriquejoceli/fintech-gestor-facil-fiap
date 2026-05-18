package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.TipoConta;
import br.com.fiap.fintech.repository.TipoContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-conta")
@CrossOrigin(origins = "*")
public class TipoContaController {

    @Autowired
    private TipoContaRepository repository;

    @GetMapping
    public ResponseEntity<List<TipoConta>> listarAtivos() {
        return ResponseEntity.ok(repository.findByStatus("A"));
    }
}