package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.TipoOcorrenciaCadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TipoOcorrenciaCadastroRepository extends JpaRepository<TipoOcorrenciaCadastro, Integer> {
    Optional<TipoOcorrenciaCadastro> findByTipoAndDescricao(String tipo, String descricao);
    
    List<TipoOcorrenciaCadastro> findByStatus(String status);
}