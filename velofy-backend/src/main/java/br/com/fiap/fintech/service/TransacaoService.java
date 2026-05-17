package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Transacao;
import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.repository.TransacaoRepository;
import br.com.fiap.fintech.repository.ContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private ContaRepository contaRepository;

    // Listar extrato
    public List<Transacao> listarPorConta(int idConta) {
        return transacaoRepository.findByContaIdOrderByDataTransacaoDesc(idConta);
    }

    // Criar Transação
    @Transactional
    public Transacao salvar(int idConta, Transacao transacao) {
        Conta conta = contaRepository.findById(idConta)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada."));

        transacao.setConta(conta);
        transacao.setTipoCriacao("M"); // Manual
        transacao.setStatus("A");      // Ativo

        return transacaoRepository.save(transacao);
    }

    // Atualizar Transação
    @Transactional
    public Transacao atualizar(int id, Transacao transacaoAtualizada) {
        Transacao transacaoExistente = transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada para atualização."));

        transacaoExistente.setDescricao(transacaoAtualizada.getDescricao());
        transacaoExistente.setValor(transacaoAtualizada.getValor());

        // Atualiza o tipo de transação
        if (transacaoAtualizada.getTipoTransacao() != null) {
            transacaoExistente.setTipoTransacao(transacaoAtualizada.getTipoTransacao());
        }

        // Atualiza a categoria
        if (transacaoAtualizada.getTipoCategoria() != null) {
            transacaoExistente.setTipoCategoria(transacaoAtualizada.getTipoCategoria());
        }

        transacaoExistente.setStatus("A");

        return transacaoRepository.save(transacaoExistente);
    }

    @Transactional
    public void excluir(int id) {
        Transacao t = transacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transação não encontrada."));
        t.setStatus("I");
        transacaoRepository.save(t);
    }
}