package br.com.fiap.fintech.model;

public class Dashboard {
    public double saldoMensal;
    public double totalRecebimentos;
    public double totalGastos;
    public double totalInvestido;

    public Dashboard() {}

    public Dashboard(double saldoMensal, double totalRecebimentos, double totalGastos, double totalInvestido) {
        this.saldoMensal = saldoMensal;
        this.totalRecebimentos = totalRecebimentos;
        this.totalGastos = totalGastos;
        this.totalInvestido = totalInvestido;
    }

    public void atualizarResumo() {
        System.out.println("Método atualizarResumo executado: Saldo atualizado para R$ " + saldoMensal);
    }

    public void exibirGraficos() {
        System.out.println("Método exibirGraficos executado: Renderizando visualização de gastos e investimentos.");
    }
}