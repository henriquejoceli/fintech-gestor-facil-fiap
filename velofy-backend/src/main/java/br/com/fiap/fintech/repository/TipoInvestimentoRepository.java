package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoInvestimento;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoInvestimentoRepository extends JpaRepository<TipoInvestimento, Integer> {
    List<TipoInvestimento> findByStatus(String status);
}