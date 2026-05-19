package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Cadastro;
import br.com.fiap.fintech.repository.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class CadastroService {

    @Autowired
    private CadastroRepository repository;

    // Transformar a senha em Hash
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<Cadastro> listarTodos() {
        return repository.findAll();
    }

    public Cadastro buscarPorId(int id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado com o ID: " + id));
    }

    @Transactional
    public Cadastro salvar(Cadastro cadastro) {
        if (repository.existsByEmail(cadastro.getEmail())) {
            throw new RuntimeException("Este e-mail já está cadastrado no sistema.");
        }

        String senhaCriptografada = passwordEncoder.encode(cadastro.getSenha());
        cadastro.setSenha(senhaCriptografada);

        cadastro.setStatus("A");

        return repository.save(cadastro);
    }

    // Autenticação
    public Cadastro autenticar(String email, String senhaPura) {
        Cadastro usuario = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("E-mail ou senha inválidos"));

        if (passwordEncoder.matches(senhaPura, usuario.getSenha())) {
            return usuario;
        } else {
            throw new RuntimeException("E-mail ou senha inválidos");
        }
    }

    @Transactional
    public Cadastro atualizar(int id, Cadastro dadosAtualizados) {
        Cadastro cadastroExistente = buscarPorId(id);

        cadastroExistente.setNome(dadosAtualizados.getNome());
        cadastroExistente.setEmail(dadosAtualizados.getEmail());
        
        cadastroExistente.setNomeSocial(dadosAtualizados.getNomeSocial());
        
        if (dadosAtualizados.getFotoPerfil() != null) {
            cadastroExistente.setFotoPerfil(dadosAtualizados.getFotoPerfil());
        }

        if (dadosAtualizados.getSenha() != null && !dadosAtualizados.getSenha().isEmpty()) {
            cadastroExistente.setSenha(passwordEncoder.encode(dadosAtualizados.getSenha()));
        }

        return repository.save(cadastroExistente);
    }

    @Transactional
    public void excluir(int id) {
        Cadastro cadastro = buscarPorId(id);
        cadastro.setStatus("I");
        repository.save(cadastro);
    }

    // 🎯 NOVO MÉTODO: Validação de segurança e redefinição de senha
    @Transactional
    public void recuperarSenha(String email, LocalDate dataNascimento, String novaSenhaPura) {
        Cadastro cadastro = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Dados incorretos! Usuário não encontrado."));

        if (!cadastro.getDataNascimento().equals(dataNascimento)) {
            throw new RuntimeException("Dados incorretos! Verifique as informações fornecidas.");
        }

        cadastro.setSenha(passwordEncoder.encode(novaSenhaPura));
        repository.save(cadastro);
    }
}