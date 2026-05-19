package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.OcorrenciaCadastro;
import br.com.fiap.fintech.service.OcorrenciaCadastroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ocorrencias-cadastro")
@CrossOrigin(origins = "*")
public class OcorrenciaCadastroController {

    @Autowired
    private OcorrenciaCadastroService service;

    // Endpoint que o nosso Notificacoes.jsx vai bater!
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<OcorrenciaCadastro>> listarPorUsuario(@PathVariable int idUsuario) {
        List<OcorrenciaCadastro> lista = service.listarPorUsuario(idUsuario);
        return ResponseEntity.ok(lista);
    }
}