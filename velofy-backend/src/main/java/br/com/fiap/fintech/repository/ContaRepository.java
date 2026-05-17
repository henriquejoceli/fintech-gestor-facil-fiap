package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.Conta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContaRepository extends JpaRepository<Conta, Integer> {

    List<Conta> findByCadastroId(int idCadastro);
}