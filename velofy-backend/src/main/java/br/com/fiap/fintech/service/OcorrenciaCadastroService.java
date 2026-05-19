package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.OcorrenciaCadastro;
import br.com.fiap.fintech.model.Cadastro;
import br.com.fiap.fintech.model.TipoOcorrenciaCadastro;
import br.com.fiap.fintech.repository.OcorrenciaCadastroRepository;
import br.com.fiap.fintech.repository.CadastroRepository;
import br.com.fiap.fintech.repository.TipoOcorrenciaCadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OcorrenciaCadastroService {

    @Autowired
    private OcorrenciaCadastroRepository repository;

    @Autowired
    private CadastroRepository cadastroRepository;

    @Autowired
    private TipoOcorrenciaCadastroRepository tipoOcorrenciaRepository;

    // Busca os logs de auditoria direto pelo ID do Usuário (Cadastro)
    public List<OcorrenciaCadastro> listarPorUsuario(int idUsuario) {
        return repository.findByCadastroId(idUsuario); 
        // 💡 Nota: Certifique-se de ter o método "List<OcorrenciaCadastro> findByCadastroId(int idUsuario);" no seu OcorrenciaCadastroRepository!
    }

    // Método genérico blindado para gravar logs em qualquer lugar do sistema
    @Transactional
    public void registrarLog(int idUsuario, int idTipoOcorrencia, String descricao) {
        try {
            Cadastro usuario = cadastroRepository.findById(idUsuario)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado para log"));
                    
            TipoOcorrenciaCadastro tipo = tipoOcorrenciaRepository.findById(idTipoOcorrencia)
                    .orElseThrow(() -> new RuntimeException("Tipo de ocorrência não encontrado"));

            OcorrenciaCadastro log = new OcorrenciaCadastro();
            log.setCadastro(usuario);
            log.setTipoOcorrenciaCadastro(tipo);
            log.setDescricao(descricao);

            repository.save(log);
        } catch (Exception e) {
            // Isolado com try-catch para uma falha de log nunca travar a transação principal do app
            System.err.println("Falha de infraestrutura ao gravar log de auditoria: " + e.getMessage());
        }
    }
}