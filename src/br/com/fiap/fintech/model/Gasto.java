package br.com.fiap.fintech.model;

public class Gasto extends Transacao {
    private String categoria;

    public Gasto(String data, double valor, String descricao, String categoria) {
        super(data, valor, descricao);
        this.categoria = categoria;
    }

    public void aplicarTaxa() {
        System.out.println("Método aplicarTaxa (Subclasse) executado para a categoria: " + categoria);
    }
}