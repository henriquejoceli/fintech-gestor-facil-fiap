package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Transacao;
import br.com.fiap.fintech.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

    @Autowired
    private TransacaoService service;

    // Consultar extrato da conta
    @GetMapping("/conta/{idConta}")
    public ResponseEntity<List<Transacao>> listarExtrato(@PathVariable int idConta) {
        return ResponseEntity.ok(service.listarPorConta(idConta));
    }

    // Criar transação
    @PostMapping("/conta/{idConta}")
    public ResponseEntity<Transacao> criar(@PathVariable int idConta, @RequestBody Transacao transacao) {
        Transacao nova = service.salvar(idConta, transacao);
        return ResponseEntity.status(HttpStatus.CREATED).body(nova);
    }

    // Atualizar transação
    @PutMapping("/{id}")
    public ResponseEntity<Transacao> atualizar(@PathVariable int id, @RequestBody Transacao transacao) {
        Transacao atualizada = service.atualizar(id, transacao);
        return ResponseEntity.ok(atualizada);
    }

    // Remover transação
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}