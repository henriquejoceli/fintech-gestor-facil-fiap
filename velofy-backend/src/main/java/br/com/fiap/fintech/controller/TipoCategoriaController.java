package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.TipoCategoria;
import br.com.fiap.fintech.repository.TipoCategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-categorias")
@CrossOrigin(origins = "*")
public class TipoCategoriaController {

    @Autowired
    private TipoCategoriaRepository repository;

    @GetMapping
    public ResponseEntity<List<TipoCategoria>> listarAtivas() {
        return ResponseEntity.ok(repository.findByStatus("A"));
    }
}