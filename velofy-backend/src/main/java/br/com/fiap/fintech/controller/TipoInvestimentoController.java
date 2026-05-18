package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.TipoInvestimento;
import br.com.fiap.fintech.repository.TipoInvestimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-investimento")
@CrossOrigin(origins = "*")
public class TipoInvestimentoController {

    @Autowired
    private TipoInvestimentoRepository repository;

    @GetMapping
    public ResponseEntity<List<TipoInvestimento>> listarAtivos() {
        return ResponseEntity.ok(repository.findByStatus("A"));
    }
}