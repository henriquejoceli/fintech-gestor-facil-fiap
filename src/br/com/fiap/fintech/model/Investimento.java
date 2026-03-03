package br.com.fiap.fintech.model;

public class Investimento {
    private String tipo;
    private double valorAplicado;

    public Investimento() {}

    public Investimento(String tipo, double valorAplicado) {
        this.tipo = tipo;
        this.valorAplicado = valorAplicado;
    }

    public double getValorAplicado() { return valorAplicado; }
    public void setValorAplicado(double valorAplicado) { this.valorAplicado = valorAplicado; }

    public void exibirPatrimonio() {
        System.out.println("Método exibirPatrimonio executado. Saldo investido: R$ " + valorAplicado);
    }
}