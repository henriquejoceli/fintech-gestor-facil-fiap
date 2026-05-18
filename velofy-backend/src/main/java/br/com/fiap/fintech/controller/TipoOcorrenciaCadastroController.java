package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.TipoOcorrenciaCadastro;
import br.com.fiap.fintech.repository.TipoOcorrenciaCadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-ocorrencia-cadastro")
@CrossOrigin(origins = "*")
public class TipoOcorrenciaCadastroController {

    @Autowired
    private TipoOcorrenciaCadastroRepository repository;

    @GetMapping
    public ResponseEntity<List<TipoOcorrenciaCadastro>> listarAtivos() {
        return ResponseEntity.ok(repository.findByStatus("A"));
    }
}