package br.com.fiap.fintech.main;

import br.com.fiap.fintech.model.*;

public class Main {
    public static void main(String[] args) {
        Recebimento salario = new Recebimento("05/10/2025", 3500.0, "Salário Mensal", "Empresa Parceira");

        Usuario user = new Usuario();
        user.setNomeCompleto("João da Silva"); // Usando o Setter

        System.out.println("=== TESTE ATIVIDADE HERANÇA E ENCAPSULAMENTO ===\n");

        salario.exibirConfirmacao();
        salario.validarEntrada();

        user.exibirPerfil();
        System.out.println("Usuário logado: " + user.getNomeCompleto());

        System.out.println("\n=== FIM DOS TESTES ===");
    }
}