package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Transacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransacaoRepository extends JpaRepository<Transacao, Integer> {
    
    List<Transacao> findByContaIdOrderByDataTransacaoDesc(int idConta);
}