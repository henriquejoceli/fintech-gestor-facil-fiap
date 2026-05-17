package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.OcorrenciaInvestimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OcorrenciaInvestimentoRepository extends JpaRepository<OcorrenciaInvestimento, Integer> {
    List<OcorrenciaInvestimento> findByInvestimentoIdOrderByDataCadastroDesc(Integer idInvestimento);
}