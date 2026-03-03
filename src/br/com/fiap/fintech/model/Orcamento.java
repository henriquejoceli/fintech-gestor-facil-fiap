package br.com.fiap.fintech.model;

public class Orcamento {
    public String categoria;
    public double limiteMensal;
    public double valorGasto;

    public Orcamento() {}

    public Orcamento(String categoria, double limiteMensal, double valorGasto) {
        this.categoria = categoria;
        this.limiteMensal = limiteMensal;
        this.valorGasto = valorGasto;
    }

    public void verificarLimite() {
        if (valorGasto > limiteMensal) {
            System.out.println("Método verificarLimite executado: Alerta! Orçamento de " + categoria + " excedido.");
        } else {
            System.out.println("Método verificarLimite executado: " + categoria + " está dentro do limite.");
        }
    }
}