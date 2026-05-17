package br.com.fiap.fintech.service;

import br.com.fiap.fintech.model.Cadastro;
import br.com.fiap.fintech.model.Conta;
import br.com.fiap.fintech.repository.CadastroRepository;
import br.com.fiap.fintech.repository.ContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    @Autowired
    private CadastroRepository cadastroRepository;

    public List<Conta> listarPorUsuario(int idCadastro) {
        return contaRepository.findByCadastroId(idCadastro);
    }

    @Transactional
    public Conta salvar(int idCadastro, Conta novaConta) {
        Cadastro dono = cadastroRepository.findById(idCadastro)
                .orElseThrow(() -> new RuntimeException("Não é possível criar conta: Usuário não encontrado."));

        novaConta.setCadastro(dono);

        if (novaConta.getNomeInstituicao() == null) {
            novaConta.setNomeInstituicao("CARTEIRA");
        }
        novaConta.setStatus("A"); // Ativo

        return contaRepository.save(novaConta);
    }

    public Conta buscarPorId(int id) {
        return contaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada."));
    }

    // Atualizar dados da conta
    @Transactional
    public Conta atualizar(int id, Conta contaAtualizada) {
        Conta existente = buscarPorId(id);
        existente.setNomeInstituicao(contaAtualizada.getNomeInstituicao());
        if (contaAtualizada.getTipoConta() != null) {
            existente.setTipoConta(contaAtualizada.getTipoConta());
        }
        return contaRepository.save(existente);
    }

    // Inativação da conta
    @Transactional
    public void excluir(int id) {
        Conta conta = buscarPorId(id);
        conta.setStatus("I");
        contaRepository.save(conta);
    }

    @Transactional
    public void atualizarSaldo(int idConta, BigDecimal novoSaldo) {
        Conta conta = buscarPorId(idConta);
        conta.setSaldoAtual(novoSaldo);
        contaRepository.save(conta);
    }
}