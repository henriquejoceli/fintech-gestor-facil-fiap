package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "T_TIPOTRANSACAO")
public class TipoTransacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 1)
    private String tipo;

    @Column(nullable = false, length = 50)
    private String descricao;

    @Column(name = "data_cadastro", insertable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao", insertable = false, updatable = false)
    private LocalDateTime dataAtualizacao;

    @Column(length = 1)
    private String status = "A";

    public TipoTransacao() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}