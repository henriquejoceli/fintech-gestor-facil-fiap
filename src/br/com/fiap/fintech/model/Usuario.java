package br.com.fiap.fintech.model;

public class Usuario {
    public String nome;
    public String email;
    public String dataNascimento;
    public String identificacao;

    public Usuario() {
    }

    public Usuario(String nome, String email, String dataNascimento, String identificacao) {
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.identificacao = identificacao;
    }

    public void exibirPerfil() {
        System.out.println("Método exibirPerfil executado: Nome: " + nome + " | E-mail: " + email);
    }

    public void alterarSenha() {
        System.out.println("Método alterarSenha executado: Enviando link de recuperação para " + email);
    }
}