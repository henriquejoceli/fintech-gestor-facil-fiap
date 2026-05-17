package br.com.fiap.fintech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "T_TIPOGENERO")
public class TipoGenero {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(length = 1, nullable = false)
    private String tipo;

    @Column(length = 50, nullable = false)
    private String descricao;

    public TipoGenero() {}

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}