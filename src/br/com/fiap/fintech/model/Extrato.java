package br.com.fiap.fintech.model;

public class Extrato {
    public String mesReferencia;
    public int totalTransacoes;

    public Extrato() {}

    public Extrato(String mesReferencia, int totalTransacoes) {
        this.mesReferencia = mesReferencia;
        this.totalTransacoes = totalTransacoes;
    }

    public void importarArquivo() {
        System.out.println("Método importarArquivo executado: Lendo dados para o mês de " + mesReferencia);
    }

    public void gerarPdf() {
        System.out.println("Método gerarPdf executado: Criando arquivo de extrato com " + totalTransacoes + " registros.");
    }
}