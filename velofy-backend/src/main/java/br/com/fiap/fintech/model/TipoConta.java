package br.com.fiap.fintech.model;

import jakarta.persistence.*;

@Entity
@Table(name = "t_tipoconta")
public class TipoConta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(length = 2, nullable = false)
    private String tipo;

    @Column(length = 50, nullable = false)
    private String descricao;

    // --- GETTERS E SETTERS ---
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
}