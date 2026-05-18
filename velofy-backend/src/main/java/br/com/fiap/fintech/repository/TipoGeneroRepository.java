package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoGenero;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoGeneroRepository extends JpaRepository<TipoGenero, Integer> {
    List<TipoGenero> findByStatus(String status);
}