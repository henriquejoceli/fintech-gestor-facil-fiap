package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Investimento;
import br.com.fiap.fintech.model.OcorrenciaInvestimento;
import br.com.fiap.fintech.repository.InvestimentoRepository;
import br.com.fiap.fintech.repository.OcorrenciaInvestimentoRepository;
import br.com.fiap.fintech.repository.TipoInvestimentoRepository;
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
    private TipoInvestimentoRepository tipoInvestimentoRepository;

    @Autowired
    private OcorrenciaInvestimentoRepository ocorrenciaRepository;

    @Autowired
    private OcorrenciaCadastroService logService;

    public List<Investimento> listarPorConta(Integer idConta) {
        return investimentoRepository.findByContaIdAndStatus(idConta, "A");
    }

    @Transactional
    public OcorrenciaInvestimento movimentar(OcorrenciaInvestimento ocorrencia) {
        Investimento investimento;
        boolean ehNovoInvestimento = false;

        if (ocorrencia.getInvestimento() == null || ocorrencia.getInvestimento().getId() == null || ocorrencia.getInvestimento().getId() == 0) {
            
            ehNovoInvestimento = true;
            investimento = ocorrencia.getInvestimento();
            if (investimento == null) {
                throw new RuntimeException("Dados do investimento não informados");
            }
            
            if (investimento.getTipoInvestimento() != null && investimento.getTipoInvestimento().getId() != 0) {
                Integer idTipo = investimento.getTipoInvestimento().getId();
                
                var tipoGerenciado = tipoInvestimentoRepository.findById(idTipo)
                        .orElseThrow(() -> new RuntimeException("Tipo de investimento com ID " + idTipo + " não existe no banco."));
                
                investimento.setTipoInvestimento(tipoGerenciado);
            } else {
                throw new RuntimeException("O tipo de investimento (categoria do ativo) é obrigatório.");
            }
            
            investimento.setValorAplicado(BigDecimal.ZERO);
            
            investimento = investimentoRepository.save(investimento);
        } else {
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

        investimentoRepository.save(investimento);
        
        ocorrencia.setInvestimento(investimento);
        OcorrenciaInvestimento ocorrenciaSalva = ocorrenciaRepository.save(ocorrencia);

        if (ehNovoInvestimento) {
            logService.registrarLog(
                investimento.getConta(),
                "F",
                "NOVO INVESTIMENTO",
                "Nova carteira de investimento iniciada: Ativo '" + investimento.getNomeInvestimento() + "' alocado com sucesso."
            );
        } else {
            String operacao = "E".equals(ocorrencia.getTipoMovimentacao()) ? "Aporte" : "Resgate";
            
            logService.registrarLog(
                investimento.getConta(),
                "F",
                "ATUALIZACAO DE INVESTIMENTO",
                "Movimentação de " + operacao + " no valor de R$ " + ocorrencia.getValor() + " efetuada no ativo '" + investimento.getNomeInvestimento() + "'."
            );
        }

        return ocorrenciaSalva;
    }

    public List<OcorrenciaInvestimento> buscarExtrato(Integer idInvestimento) {
        return ocorrenciaRepository.findByInvestimentoIdOrderByDataCadastroDesc(idInvestimento);
    }
}