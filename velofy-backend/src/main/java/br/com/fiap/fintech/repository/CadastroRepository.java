package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Cadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CadastroRepository extends JpaRepository<Cadastro, Integer> {

    Optional<Cadastro> findByEmail(String email);

    boolean existsByEmail(String email);
}