package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.TipoTransacao;
import br.com.fiap.fintech.repository.TipoTransacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipos-transacao")
@CrossOrigin(origins = "*")
public class TipoTransacaoController {

    @Autowired
    private TipoTransacaoRepository repository;

    @GetMapping
    public ResponseEntity<List<TipoTransacao>> listarAtivos() {
        return ResponseEntity.ok(repository.findByStatus("A"));
    }
}