package br.com.fiap.fintech.model;

public class Usuario {
    private String nomeCompleto;
    private String email;
    private String dataNascimento;
    private String identificacao;

    public Usuario() {}

    public Usuario(String nomeCompleto, String email, String dataNascimento, String identificacao) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.identificacao = identificacao;
    }

    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public void exibirPerfil() {
        System.out.println("Método exibirPerfil executado para: " + nomeCompleto);
    }
}