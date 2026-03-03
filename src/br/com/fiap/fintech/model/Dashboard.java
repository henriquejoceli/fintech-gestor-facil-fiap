package br.com.fiap.fintech.model;

public class Dashboard {
    private double saldoMensal;
    private double totalRecebimentos;
    private double totalGastos;

    public Dashboard() {}

    public Dashboard(double saldoMensal, double totalRecebimentos, double totalGastos) {
        this.saldoMensal = saldoMensal;
        this.totalRecebimentos = totalRecebimentos;
        this.totalGastos = totalGastos;
    }

    public double getSaldoMensal() { return saldoMensal; }

    public void atualizarResumo() {
        System.out.println("Método atualizarResumo executado. Saldo do mês: R$ " + saldoMensal);
    }
}