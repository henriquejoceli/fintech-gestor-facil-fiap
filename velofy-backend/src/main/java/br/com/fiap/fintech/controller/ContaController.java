package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.service.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contas")
@CrossOrigin(origins = "*")
public class ContaController {

    @Autowired
    private ContaService service;

    // Criar conta
    @PostMapping("/usuario/{idCadastro}")
    public ResponseEntity<Conta> criar(@PathVariable int idCadastro, @RequestBody Conta conta) {
        Conta novaConta = service.salvar(idCadastro, conta);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaConta);
    }

    // Listar contas
    @GetMapping("/usuario/{idCadastro}")
    public ResponseEntity<List<Conta>> listarPorUsuario(@PathVariable int idCadastro) {
        List<Conta> contas = service.listarPorUsuario(idCadastro);
        return ResponseEntity.ok(contas);
    }

    // Buscar contas
    @GetMapping("/{id}")
    public ResponseEntity<Conta> buscar(@PathVariable int id) {
        Conta conta = service.buscarPorId(id);
        return ResponseEntity.ok(conta);
    }

    // Atualizar dados da conta
    @PutMapping("/{id}")
    public ResponseEntity<Conta> atualizar(@PathVariable int id, @RequestBody Conta conta) {
        Conta atualizada = service.atualizar(id, conta);
        return ResponseEntity.ok(atualizada);
    }

    // Remover conta
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable int id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }
}