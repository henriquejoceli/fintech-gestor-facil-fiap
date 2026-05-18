package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Investimento;
import br.com.fiap.fintech.model.OcorrenciaInvestimento;
import br.com.fiap.fintech.repository.InvestimentoRepository;
import br.com.fiap.fintech.repository.OcorrenciaInvestimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class InvestimentoService {

    @Autowired
    private InvestimentoRepository investimentoRepository;

    @Autowired
    private OcorrenciaInvestimentoRepository ocorrenciaRepository;

    // Lista os investimentos ativos de uma conta
    public List<Investimento> listarPorConta(Integer idConta) {
        return investimentoRepository.findByContaIdAndStatus(idConta, "A");
    }

    // Registra uma movimentação (Aporte ou Resgate) e atualiza o saldo do ativo
    @Transactional
    public OcorrenciaInvestimento movimentar(OcorrenciaInvestimento ocorrencia) {
        Investimento investimento;

        // 🎯 SE O INVESTIMENTO VIER SEM ID (OU ID ZERO), SIGNIFICA QUE É UM NOVO ATIVO!
        if (ocorrencia.getInvestimento() == null || ocorrencia.getInvestimento().getId() == null || ocorrencia.getInvestimento().getId() == 0) {
            
            investimento = ocorrencia.getInvestimento();
            if (investimento == null) {
                throw new RuntimeException("Dados do investimento não informados");
            }
            
            // Inicializa o valor zerado para o cálculo do aporte funcionar corretamente
            investimento.setValorAplicado(BigDecimal.ZERO);
            
            // Salva o investimento pai primeiro para gerar o ID no banco
            investimento = investimentoRepository.save(investimento);
        } else {
            // Se veio o ID, busca o investimento que já existe no banco
            investimento = investimentoRepository.findById(ocorrencia.getInvestimento().getId())
                    .orElseThrow(() -> new RuntimeException("Investimento não encontrado"));
        }

        BigDecimal valorMovimentado = ocorrencia.getValor();
        BigDecimal saldoAtual = investimento.getValorAplicado();

        if ("E".equals(ocorrencia.getTipoMovimentacao())) {
            investimento.setValorAplicado(saldoAtual.add(valorMovimentado));
        } else if ("S".equals(ocorrencia.getTipoMovimentacao())) {
            if (saldoAtual.compareTo(valorMovimentado) < 0) {
                throw new RuntimeException("Saldo insuficiente para resgatar deste investimento");
            }
            investimento.setValorAplicado(saldoAtual.subtract(valorMovimentado));
        }

        // Salva a alteração no saldo do investimento
        investimentoRepository.save(investimento);
        
        // Salva o log da ocorrência (extrato) vinculando o ID correto
        ocorrencia.setInvestimento(investimento);
        return ocorrenciaRepository.save(ocorrencia);
    }

    // Busca o extrato de um investimento específico
    public List<OcorrenciaInvestimento> buscarExtrato(Integer idInvestimento) {
        return ocorrenciaRepository.findByInvestimentoIdOrderByDataCadastroDesc(idInvestimento);
    }
}