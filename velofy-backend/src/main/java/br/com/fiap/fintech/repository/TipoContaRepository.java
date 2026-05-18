package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoConta;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoContaRepository extends JpaRepository<TipoConta, Integer> {
    List<TipoConta> findByStatus(String status);
}