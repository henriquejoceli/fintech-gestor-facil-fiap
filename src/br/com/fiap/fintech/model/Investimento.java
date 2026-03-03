package br.com.fiap.fintech.model;

public class Investimento {
    public String tipo;
    public double valorAplicado;
    public double taxaRendimento;
    public String instituicao;

    public Investimento() {
    }

    public Investimento(String tipo, double valorAplicado, double taxaRendimento, String instituicao) {
        this.tipo = tipo;
        this.valorAplicado = valorAplicado;
        this.taxaRendimento = taxaRendimento;
        this.instituicao = instituicao;
    }

    public void simularRendimento(int meses) {
        System.out.println("Método simularRendimento executado: Projetando lucro para " + meses + " meses em " + tipo);
    }

    public void exibirPatrimonio() {
        System.out.println("Método exibirPatrimonio executado: Total investido na " + instituicao + " é R$ " + valorAplicado);
    }
}