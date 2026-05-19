package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.OcorrenciaCadastro;
import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.model.TipoOcorrenciaCadastro;
import br.com.fiap.fintech.repository.OcorrenciaCadastroRepository;
import br.com.fiap.fintech.repository.ContaRepository;
import br.com.fiap.fintech.repository.TipoOcorrenciaCadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.text.Normalizer;
import java.util.List;

@Service
public class OcorrenciaCadastroService {

    @Autowired
    private OcorrenciaCadastroRepository repository;

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private TipoOcorrenciaCadastroRepository tipoOcorrenciaRepository;

    private String normalizarTexto(String texto) {
        if (texto == null) return "";
        String textoNormalizado = Normalizer.normalize(texto, Normalizer.Form.NFD);
        return textoNormalizado.replaceAll("[\\p{InCombiningDiacriticalMarks}]", "").toUpperCase();
    }

    public List<OcorrenciaCadastro> listarPorConta(int idConta) {
        return repository.findByContaId(idConta);
    }

    @Transactional
    public void registrarLog(Conta conta, String tipoLetra, String descricaoCatalogo, String mensagemDetalhada) {
        try {
            if (conta == null) return;

            String tipoLimpo = normalizarTexto(tipoLetra);
            String descricaoLimpa = normalizarTexto(descricaoCatalogo);

            TipoOcorrenciaCadastro tipo = tipoOcorrenciaRepository.findByTipoAndDescricao(tipoLimpo, descricaoLimpa)
                    .orElseThrow(() -> new RuntimeException("Log não encontrado"));

            OcorrenciaCadastro log = new OcorrenciaCadastro();
            log.setConta(conta);
            log.setTipoOcorrenciaCadastro(tipo);
            log.setDescricao(mensagemDetalhada);

            repository.save(log);
        } catch (Exception e) {
            System.err.println("Falha ao gravar log de auditoria: " + e.getMessage());
        }
    }

    @Transactional
    public void registrarLog(int idUsuario, String tipoLetra, String descricaoCatalogo, String mensagemDetalhada) {
        try {
            List<Conta> contasDoUsuario = contaRepository.findByCadastroId(idUsuario);
            
            Conta contaVinculo = null;
            if (!contasDoUsuario.isEmpty()) {
                contaVinculo = contasDoUsuario.get(0);
            }

            String tipoLimpo = normalizarTexto(tipoLetra);
            String descricaoLimpa = normalizarTexto(descricaoCatalogo);

            TipoOcorrenciaCadastro tipo = tipoOcorrenciaRepository.findByTipoAndDescricao(tipoLimpo, descricaoLimpa)
                    .orElseThrow(() -> new RuntimeException("Log não encontrado"));

            OcorrenciaCadastro log = new OcorrenciaCadastro();
            
            if (contaVinculo != null) {
                log.setConta(contaVinculo);
                log.setTipoOcorrenciaCadastro(tipo);
                log.setDescricao(mensagemDetalhada);
                repository.save(log);
            } else {
                System.out.println("Log de auditoria pulado: Usuário ainda não possui nenhuma conta bancária ativa.");
            }
        } catch (Exception e) {
            System.err.println("Falha ao gravar log de auditoria simplificado: " + e.getMessage());
        }
    }
}