package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Transacao;
import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.repository.TransacaoRepository;
import br.com.fiap.fintech.repository.ContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private OcorrenciaCadastroService logService;

    public List<Transacao> listarPorConta(int idConta) {
        return transacaoRepository.findByContaIdOrderByDataTransacaoDesc(idConta);
    }

    @Transactional
    public Transacao salvar(int idConta, Transacao transacao) {
        Conta conta = contaRepository.findById(idConta)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada."));

        transacao.setConta(conta);
        
        if (transacao.getTipoCriacao() == null) {
            transacao.setTipoCriacao("M");
        }
        transacao.setStatus("A");

        atualizarSaldoConta(conta, transacao.getTipoTransacao().getId(), transacao.getValor(), "SOMA");

        Transacao transacaoSalva = transacaoRepository.save(transacao);

        int idUsuario = conta.getCadastro().getId();
        
        logService.registrarLog(
            conta, 
            "F", 
            "Nova transação", 
            "Movimentação de R$ " + transacao.getValor() + " adicionada."
        );

        return transacaoSalva;
    }

    @Transactional
    public Transacao atualizar(int id, Transacao transacaoAtualizada) {
        Transacao transacaoExistente = transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada para atualização."));

        Conta conta = transacaoExistente.getConta();

        atualizarSaldoConta(conta, transacaoExistente.getTipoTransacao().getId(), transacaoExistente.getValor(), "SUBTRACAO");

        transacaoExistente.setDescricao(transacaoAtualizada.getDescricao());
        transacaoExistente.setValor(transacaoAtualizada.getValor());
        
        if (transacaoAtualizada.getDescricaoOriginal() != null) {
            transacaoExistente.setDescricaoOriginal(transacaoAtualizada.getDescricaoOriginal());
        }

        if (transacaoAtualizada.getTipoTransacao() != null) {
            transacaoExistente.setTipoTransacao(transacaoAtualizada.getTipoTransacao());
        }

        if (transacaoAtualizada.getTipoCategoria() != null) {
            transacaoExistente.setTipoCategoria(transacaoAtualizada.getTipoCategoria());
        } else {
            transacaoExistente.setTipoCategoria(null);
        }

        transacaoExistente.setStatus("A");

        atualizarSaldoConta(conta, transacaoExistente.getTipoTransacao().getId(), transacaoExistente.getValor(), "SOMA");

        Transacao transacaoSalva = transacaoRepository.save(transacaoExistente);

        int idUsuario = conta.getCadastro().getId();
        
        logService.registrarLog(
            conta, 
            "F", 
            "Atualização de transação", 
            "Transação alterada: '" + transacaoSalva.getDescricao() + "' atualizada para o valor de R$ " + transacaoSalva.getValor()
        );

        return transacaoSalva;
    }

    @Transactional
    public void excluir(int id) {
        Transacao t = transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada."));
        
        if ("I".equals(t.getStatus())) return;

        Conta conta = t.getConta();

        atualizarSaldoConta(conta, t.getTipoTransacao().getId(), t.getValor(), "SUBTRACAO");

        t.setStatus("I");
        transacaoRepository.save(t);

        int idUsuario = conta.getCadastro().getId();
        
        logService.registrarLog(
            conta, 
            "F", 
            "Atualização de transação", 
            "Transação estornada/excluída do sistema: '" + t.getDescricao() + "' no valor de R$ " + t.getValor()
        );

    }

    private void atualizarSaldoConta(Conta conta, int tipoTransacaoId, BigDecimal valor, String operacao) {
        BigDecimal saldoAtual = conta.getSaldoAtual() != null ? conta.getSaldoAtual() : BigDecimal.ZERO;

        if ("SOMA".equals(operacao)) {
            if (tipoTransacaoId == 2) { 
                conta.setSaldoAtual(saldoAtual.add(valor));
            } else if (tipoTransacaoId == 1) { 
                conta.setSaldoAtual(saldoAtual.subtract(valor));
            }
        } else if ("SUBTRACAO".equals(operacao)) {
            if (tipoTransacaoId == 2) { 
                conta.setSaldoAtual(saldoAtual.subtract(valor));
            } else if (tipoTransacaoId == 1) { 
                conta.setSaldoAtual(saldoAtual.add(valor));
            }
        }
        contaRepository.save(conta);
    }
}