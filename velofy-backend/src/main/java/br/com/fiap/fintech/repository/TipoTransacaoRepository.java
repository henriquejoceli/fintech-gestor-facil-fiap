package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoTransacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoTransacaoRepository extends JpaRepository<TipoTransacao, Integer> {
    List<TipoTransacao> findByStatus(String status);
}