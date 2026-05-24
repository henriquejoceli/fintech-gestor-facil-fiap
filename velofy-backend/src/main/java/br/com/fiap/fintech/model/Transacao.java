package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "T_TRANSACAO")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_conta", nullable = false)
    private Conta conta;

    @ManyToOne
    @JoinColumn(name = "id_tipotransacao", nullable = false)
    private TipoTransacao tipoTransacao;

    @ManyToOne
    @JoinColumn(name = "id_tipocategoria") // Permitindo NULL no banco para conciliação automática
    private TipoCategoria tipoCategoria;

    @Column(name = "id_externo_api")
    private String idExternoApi;

    @Column(name = "tipo_criacao", length = 1, nullable = false)
    private String tipoCriacao = "M";

    @Column(nullable = false, precision = 20, scale = 2)
    private BigDecimal valor;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "descricao_original")
    private String descricaoOriginal;

    @Column(name = "data_transacao")
    private LocalDate dataTransacao = LocalDate.now();

    @Column(name = "data_cadastro", insertable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao", insertable = false, updatable = false)
    private LocalDateTime dataAtualizacao;

    @Column(length = 1)
    private String status = "A";

    public Transacao() {}

    public Transacao(Conta conta, TipoTransacao tipoTransacao, TipoCategoria tipoCategoria, BigDecimal valor, String descricao) {
        this.conta = conta;
        this.tipoTransacao = tipoTransacao;
        this.tipoCategoria = tipoCategoria;
        this.valor = valor;
        this.descricao = descricao;
        this.tipoCriacao = "M";
        this.status = "A";
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Conta getConta() { return conta; }
    public void setConta(Conta conta) { this.conta = conta; }

    public TipoTransacao getTipoTransacao() { return tipoTransacao; }
    public void setTipoTransacao(TipoTransacao tipoTransacao) { this.tipoTransacao = tipoTransacao; }

    public TipoCategoria getTipoCategoria() { return tipoCategoria; }
    public void setTipoCategoria(TipoCategoria tipoCategoria) { this.tipoCategoria = tipoCategoria; }

    public String getIdExternoApi() { return idExternoApi; }
    public void setIdExternoApi(String idExternoApi) { this.idExternoApi = idExternoApi; }

    public String getTipoCriacao() { return tipoCriacao; }
    public void setTipoCriacao(String tipoCriacao) { this.tipoCriacao = tipoCriacao; }

    public BigDecimal getValor() { return valor; }
    public void setValor(BigDecimal valor) { this.valor = valor; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getDescricaoOriginal() { return descricaoOriginal; }
    public void setDescricaoOriginal(String descricaoOriginal) { this.descricaoOriginal = descricaoOriginal; }

    public LocalDate getDataTransacao() { return dataTransacao; }
    public void setDataTransacao(LocalDate dataTransacao) { this.dataTransacao = dataTransacao; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}