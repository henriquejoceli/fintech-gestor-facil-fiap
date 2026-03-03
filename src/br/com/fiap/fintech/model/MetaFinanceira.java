package br.com.fiap.fintech.model;

public class MetaFinanceira {
    private String objetivo;
    private double valorAlvo;
    private double valorAtual;

    public MetaFinanceira() {}

    public MetaFinanceira(String objetivo, double valorAlvo, double valorAtual) {
        this.objetivo = objetivo;
        this.valorAlvo = valorAlvo;
        this.valorAtual = valorAtual;
    }

    public double getValorAlvo() { return valorAlvo; }
    public void setValorAlvo(double valorAlvo) { this.valorAlvo = valorAlvo; }

    public void acompanharProgresso() {
        System.out.println("Método acompanharProgresso executado para a meta: " + objetivo);
    }
}