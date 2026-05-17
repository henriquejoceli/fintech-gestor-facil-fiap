package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Cadastro;
import br.com.fiap.fintech.service.CadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.com.fiap.fintech.dto.LoginRequest;

import java.util.List;

@RestController
@RequestMapping("/api/cadastros")
@CrossOrigin(origins = "*")
public class CadastroController {

    @Autowired
    private CadastroService service;

    // Listar cadastro
    @GetMapping
    public ResponseEntity<List<Cadastro>> listar() {
        List<Cadastro> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }

    // Buscar cadastro
    @GetMapping("/{id}")
    public ResponseEntity<Cadastro> buscar(@PathVariable int id) {
        Cadastro cadastro = service.buscarPorId(id);
        return ResponseEntity.ok(cadastro);
    }

    // Criar cadastro
    @PostMapping
    public ResponseEntity<Cadastro> criar(@RequestBody Cadastro cadastro) {
        Cadastro novoCadastro = service.salvar(cadastro);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoCadastro);
    }

    // Atualizar perfil
    @PutMapping("/{id}")
    public ResponseEntity<Cadastro> atualizar(@PathVariable int id, @RequestBody Cadastro cadastro) {
        Cadastro atualizado = service.atualizar(id, cadastro);
        return ResponseEntity.ok(atualizado);
    }

    // Deletar cadstro
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable int id) {
        service.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest login) {
        try {
            Cadastro usuario = service.autenticar(login.getEmail(), login.getSenha());

            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}