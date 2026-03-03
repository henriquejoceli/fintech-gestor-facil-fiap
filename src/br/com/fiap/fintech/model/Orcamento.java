package br.com.fiap.fintech.model;

public class Orcamento {
    private String categoria;
    private double limiteMensal;

    public Orcamento() {}

    public Orcamento(String categoria, double limiteMensal) {
        this.categoria = categoria;
        this.limiteMensal = limiteMensal;
    }

    public String getCategoria() { return categoria; }
    public void setCategoria(String categoria) { this.categoria = categoria; }

    public void verificarLimite() {
        System.out.println("Método verificarLimite executado para a categoria: " + categoria);
    }
}