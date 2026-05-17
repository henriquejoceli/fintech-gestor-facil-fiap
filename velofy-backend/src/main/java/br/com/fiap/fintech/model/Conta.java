package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "T_CONTA")
public class Conta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_cadastro", nullable = false)
    @JsonIgnoreProperties("contas")
    private Cadastro cadastro;

    @ManyToOne
    @JoinColumn(name = "id_tipoconta")
    private TipoConta tipoConta;

    @Column(name = "nome_instituicao", length = 50)
    private String nomeInstituicao = "CARTEIRA";

    @Column(name = "saldo_atual", precision = 20, scale = 2)
    private BigDecimal saldoAtual = BigDecimal.ZERO;

    @Column(name = "id_externo_api", length = 255, unique = true)
    private String idExternoApi;

    @Column(name = "data_cadastro", insertable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao", insertable = false, updatable = false)
    private LocalDateTime dataAtualizacao;

    @Column(name = "data_ultima_sincronizacao")
    private LocalDateTime dataUltimaSincronizacao;

    @Column(length = 1)
    private String status = "A"; // Padrão 'A' conforme ck_conta_status

    public Conta() {}

    public Conta(Cadastro cadastro, TipoConta tipoConta, String nomeInstituicao, BigDecimal saldoAtual, String idExternoApi) {
        this.cadastro = cadastro;
        this.tipoConta = tipoConta;
        this.nomeInstituicao = nomeInstituicao;
        this.saldoAtual = saldoAtual;
        this.idExternoApi = idExternoApi;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Cadastro getCadastro() { return cadastro; }
    public void setCadastro(Cadastro cadastro) { this.cadastro = cadastro; }

    public TipoConta getTipoConta() { return tipoConta; }
    public void setTipoConta(TipoConta tipoConta) { this.tipoConta = tipoConta; }

    public String getNomeInstituicao() { return nomeInstituicao; }
    public void setNomeInstituicao(String nomeInstituicao) { this.nomeInstituicao = nomeInstituicao; }

    public BigDecimal getSaldoAtual() { return saldoAtual; }
    public void setSaldoAtual(BigDecimal saldoAtual) { this.saldoAtual = saldoAtual; }

    public String getIdExternoApi() { return idExternoApi; }
    public void setIdExternoApi(String idExternoApi) { this.idExternoApi = idExternoApi; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }

    public LocalDateTime getDataUltimaSincronizacao() { return dataUltimaSincronizacao; }
    public void setDataUltimaSincronizacao(LocalDateTime dataUltimaSincronizacao) { this.dataUltimaSincronizacao = dataUltimaSincronizacao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public void exibirDadosConta() {
        System.out.println("Instituição: " + nomeInstituicao + " | Saldo: R$ " + saldoAtual);
        System.out.println("Status: " + status);
    }
}