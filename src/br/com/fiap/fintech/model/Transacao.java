package br.com.fiap.fintech.model;

public class Transacao {
    private String data;
    private double valor;
    private String descricao;

    public Transacao(String data, double valor, String descricao) {
        this.data = data;
        this.valor = valor;
        this.descricao = descricao;
    }

    public double getValor() { return valor; }
    public String getDescricao() { return descricao; }

    public void exibirConfirmacao() {
        System.out.println("Método exibirConfirmacao (Superclasse) executado: " + descricao);
    }
}