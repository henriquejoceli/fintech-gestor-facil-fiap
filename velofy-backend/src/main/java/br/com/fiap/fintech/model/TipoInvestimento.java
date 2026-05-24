package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "T_TIPOINVESTIMENTO")
public class TipoInvestimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 1)
    private String tipo;

    @Column(nullable = false, length = 50)
    private String descricao;

    @Column(nullable = false, length = 1)
    private String risco;

    @Column(nullable = false, length = 1)
    private String prazo;

    @Column(name = "desconto_ir", nullable = false, length = 1)
    private String descontoIr;

    @Column(name = "data_cadastro", insertable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao", insertable = false, updatable = false)
    private LocalDateTime dataAtualizacao;

    @Column(length = 1, nullable = false)
    private String status = "A";

    public TipoInvestimento() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public String getRisco() { return risco; }
    public void setRisco(String risco) { this.risco = risco; }
    public String getPrazo() { return prazo; }
    public void setPrazo(String prazo) { this.prazo = prazo; }
    public String getDescontoIr() { return descontoIr; }
    public void setDescontoIr(String descontoIr) { this.descontoIr = descontoIr; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}