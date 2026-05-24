package br.com.fiap.fintech.controller;

import br.com.fiap.fintech.model.Investimento;
import br.com.fiap.fintech.model.OcorrenciaInvestimento;
import br.com.fiap.fintech.service.InvestimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/investimentos")
@CrossOrigin(origins = "*")
public class InvestimentoController {

    @Autowired
    private InvestimentoService investimentoService;

    // Retorna os investimentos do usuário
    @GetMapping("/conta/{idConta}")
    public ResponseEntity<List<Investimento>> listarPorConta(@PathVariable Integer idConta) {
        return ResponseEntity.ok(investimentoService.listarPorConta(idConta));
    }

    // Faz um aporte ou resgate
    @PostMapping("/movimentar")
    public ResponseEntity<?> movimentar(@RequestBody OcorrenciaInvestimento ocorrencia) {
        try {
            OcorrenciaInvestimento novaOcorrencia = investimentoService.movimentar(ocorrencia);
            return ResponseEntity.ok(novaOcorrencia);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Retorna o histórico de aportes/resgates
    @GetMapping("/{idInvestimento}/extrato")
    public ResponseEntity<List<OcorrenciaInvestimento>> buscarExtrato(@PathVariable Integer idInvestimento) {
        return ResponseEntity.ok(investimentoService.buscarExtrato(idInvestimento));
    }
}