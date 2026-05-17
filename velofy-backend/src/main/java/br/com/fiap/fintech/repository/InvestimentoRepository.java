package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface InvestimentoRepository extends JpaRepository<Investimento, Integer> {
    List<Investimento> findByContaIdAndStatus(Integer idConta, String status);
}