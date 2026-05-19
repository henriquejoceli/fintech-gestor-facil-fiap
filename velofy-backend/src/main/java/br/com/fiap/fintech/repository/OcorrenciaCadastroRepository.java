package br.com.fiap.fintech.repository;

import br.com.fiap.fintech.model.OcorrenciaCadastro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OcorrenciaCadastroRepository extends JpaRepository<OcorrenciaCadastro, Integer> {

    // 🎯 Busca todas as ocorrências cadastrais filtrando pela FK do usuário (Cadastro)
    List<OcorrenciaCadastro> findByCadastroId(int idUsuario);
}