package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_investimento")
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_conta", nullable = false)
    private Conta conta;

    @ManyToOne
    @JoinColumn(name = "id_tipoinvestimento", nullable = false)
    private TipoInvestimento tipoInvestimento;

    @Column(name = "id_externo_api", unique = true)
    private String idExternoApi;

    @Column(name = "nome_investimento", length = 100, nullable = false)
    private String nomeInvestimento;

    @Column(name = "tipo_criacao", length = 1, nullable = false)
    private String tipoCriacao;

    @Column(name = "taxa_rendimento", precision = 10, scale = 4)
    private BigDecimal taxaRendimento = BigDecimal.ZERO;

    @Column(name = "valor_aplicado", precision = 20, scale = 2)
    private BigDecimal valorAplicado = BigDecimal.ZERO;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao")
    private LocalDateTime dataAtualizacao;

    @Column(name = "data_ultima_sincronizacao")
    private LocalDateTime dataUltimaSincronizacao;

    @Column(length = 1)
    private String status = "A";

    @PrePersist
    protected void onCreate() {
        dataCadastro = LocalDateTime.now();
        dataAtualizacao = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        dataAtualizacao = LocalDateTime.now();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Conta getConta() {
        return conta;
    }

    public void setConta(Conta conta) {
        this.conta = conta;
    }

    public TipoInvestimento getTipoInvestimento() {
        return tipoInvestimento;
    }

    public void setTipoInvestimento(TipoInvestimento tipoInvestimento) {
        this.tipoInvestimento = tipoInvestimento;
    }

    public String getIdExternoApi() {
        return idExternoApi;
    }

    public void setIdExternoApi(String idExternoApi) {
        this.idExternoApi = idExternoApi;
    }

    public String getNomeInvestimento() {
        return nomeInvestimento;
    }

    public void setNomeInvestimento(String nomeInvestimento) {
        this.nomeInvestimento = nomeInvestimento;
    }

    public String getTipoCriacao() {
        return tipoCriacao;
    }

    public void setTipoCriacao(String tipoCriacao) {
        this.tipoCriacao = tipoCriacao;
    }

    public BigDecimal getTaxaRendimento() {
        return taxaRendimento;
    }

    public void setTaxaRendimento(BigDecimal taxaRendimento) {
        this.taxaRendimento = taxaRendimento;
    }

    public BigDecimal getValorAplicado() {
        return valorAplicado;
    }

    public void setValorAplicado(BigDecimal valorAplicado) {
        this.valorAplicado = valorAplicado;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    public LocalDateTime getDataUltimaSincronizacao() {
        return dataUltimaSincronizacao;
    }

    public void setDataUltimaSincronizacao(LocalDateTime dataUltimaSincronizacao) {
        this.dataUltimaSincronizacao = dataUltimaSincronizacao;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}