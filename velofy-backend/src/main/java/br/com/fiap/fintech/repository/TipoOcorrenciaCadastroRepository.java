package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoOcorrenciaCadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TipoOcorrenciaCadastroRepository extends JpaRepository<TipoOcorrenciaCadastro, Integer> {
    List<TipoOcorrenciaCadastro> findByStatus(String status);
}