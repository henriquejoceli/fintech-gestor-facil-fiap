package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoCategoriaRepository extends JpaRepository<TipoCategoria, Integer> {
    List<TipoCategoria> findByStatus(String status);
}