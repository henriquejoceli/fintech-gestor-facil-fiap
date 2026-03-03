package br.com.fiap.fintech.model;

public class Extrato {
    private String mesReferencia;
    private int totalTransacoes;

    public Extrato() {}

    public Extrato(String mesReferencia, int totalTransacoes) {
        this.mesReferencia = mesReferencia;
        this.totalTransacoes = totalTransacoes;
    }

    public String getMesReferencia() {
        return mesReferencia;
    }

    public void setMesReferencia(String mesReferencia) {
        this.mesReferencia = mesReferencia;
    }

    public int getTotalTransacoes() {
        return totalTransacoes;
    }

    public void setTotalTransacoes(int totalTransacoes) {
        this.totalTransacoes = totalTransacoes;
    }

    public void importarArquivo() {
        System.out.println("Método importarArquivo executado: Lendo dados para " + mesReferencia);
    }

    public void gerarPdf() {
        System.out.println("Método gerarPdf executado para o mês: " + mesReferencia);
    }
}