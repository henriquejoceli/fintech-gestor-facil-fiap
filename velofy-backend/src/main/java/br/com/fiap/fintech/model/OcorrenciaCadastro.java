package br.com.fiap.fintech.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "t_ocorrenciacadastro")
public class OcorrenciaCadastro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_conta", nullable = false)
    private Conta conta;

    @ManyToOne
    @JoinColumn(name = "id_tipoocorrenciacadastro", nullable = false)
    private TipoOcorrenciaCadastro tipoOcorrenciaCadastro;

    @Column(length = 2000, nullable = false)
    private String descricao;

    @Column(name = "data_cadastro", updatable = false)
    private LocalDateTime dataCadastro;

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

    public TipoOcorrenciaCadastro getTipoOcorrenciaCadastro() {
        return tipoOcorrenciaCadastro;
    }

    public void setTipoOcorrenciaCadastro(TipoOcorrenciaCadastro tipoOcorrenciaCadastro) {
        this.tipoOcorrenciaCadastro = tipoOcorrenciaCadastro;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}