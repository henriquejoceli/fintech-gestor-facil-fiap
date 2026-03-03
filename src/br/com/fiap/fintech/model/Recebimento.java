package br.com.fiap.fintech.model;

public class Recebimento extends Transacao {
    private String fonte;

    public Recebimento(String data, double valor, String descricao, String fonte) {
        super(data, valor, descricao);
        this.fonte = fonte;
    }

    public void validarEntrada() {
        System.out.println("Método validarEntrada (Subclasse) executado para a fonte: " + fonte);
    }
}