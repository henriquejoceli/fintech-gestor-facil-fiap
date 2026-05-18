package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.TipoGenero;
import br.com.fiap.fintech.repository.TipoGeneroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-genero")
@CrossOrigin(origins = "*")
public class TipoGeneroController {

    @Autowired
    private TipoGeneroRepository repository;

    @GetMapping
    public ResponseEntity<List<TipoGenero>> listarAtivos() {
        return ResponseEntity.ok(repository.findByStatus("A"));
    }
}