package br.com.fiap.fintech.main;
import br.com.fiap.fintech.model.*;

public class Main {
    public static void main(String[] args) {
        System.out.println("=== INICIANDO TESTE DO SISTEMA GESTOR FÁCIL ===\n");

        Usuario user = new Usuario("João da Silva", "joao@email.com", "01/01/1990", "Empreendedor");
        user.exibirPerfil();

        Transacao salario = new Transacao("05/10/2025", 3000.00, "Salário Mensal", "Renda", true);
        salario.registrarTransacao();

        MetaFinanceira reserva = new MetaFinanceira("Reserva de Emergência", 10000.00, 2500.00, "12 meses");
        reserva.acompanharProgresso();

        Investimento cdb = new Investimento("CDB Pós-Fixado", 500.00, 10.5, "Banco FIAP");
        cdb.exibirPatrimonio();

        Orcamento lazer = new Orcamento("Lazer", 500.00, 650.00);
        lazer.verificarLimite();

        Extrato mesOutubro = new Extrato("Outubro/2025", 15);
        mesOutubro.importarArquivo();

        Dashboard dash = new Dashboard(730.65, 3100.00, 2369.35, 450.00);
        dash.atualizarResumo();

        System.out.println("\n=== TESTES FINALIZADOS COM SUCESSO ===");
    }
}