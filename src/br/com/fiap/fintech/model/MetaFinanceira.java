package br.com.fiap.fintech.model;

public class MetaFinanceira {
    public String objetivo;
    public double valorAlvo;
    public double valorAtual;
    public String prazo;

   public MetaFinanceira() {
    }

    public MetaFinanceira(String objetivo, double valorAlvo, double valorAtual, String prazo) {
        this.objetivo = objetivo;
        this.valorAlvo = valorAlvo;
        this.valorAtual = valorAtual;
        this.prazo = prazo;
    }

    public void acompanharProgresso() {
        double progresso = (valorAtual / valorAlvo) * 100;
        System.out.println("Método acompanharProgresso executado: Meta " + objetivo + " está em " + progresso + "%");
    }

   public void simularImprevisto(double valorGasto) {
        System.out.println("Método simularImprevisto executado: Analisando impacto de um gasto de R$ " + valorGasto);
    }
}