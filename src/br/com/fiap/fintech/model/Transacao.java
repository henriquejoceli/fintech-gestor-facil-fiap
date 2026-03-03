package br.com.fiap.fintech.model;

public class Transacao {
    public String data;
    public double valor;
    public String descricao;
    public String categoria;
    public boolean ehEntrada;

    public Transacao() {
    }

    public Transacao(String data, double valor, String descricao, String categoria, boolean ehEntrada) {
        this.data = data;
        this.valor = valor;
        this.descricao = descricao;
        this.categoria = categoria;
        this.ehEntrada = ehEntrada;
    }

    public void registrarTransacao() {
        String tipo = ehEntrada ? "Entrada" : "Saída";
        System.out.println("Método registrarTransacao executado: Gravando " + tipo + " de " + descricao);
    }

    public void exibirDetalhes() {
        System.out.println("Método exibirDetalhes executado: " + data + " | " + descricao + " | R$ " + valor);
    }
}