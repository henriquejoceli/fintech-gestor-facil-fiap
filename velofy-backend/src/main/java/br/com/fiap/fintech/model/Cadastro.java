package br.com.fiap.fintech.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "T_CADASTRO")
public class Cadastro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "id_genero", nullable = false)
    private TipoGenero tipoGenero;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(nullable = false, length = 255)
    private String senha;

    @Column(name = "data_cadastro", insertable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @Column(name = "data_atualizacao", insertable = false, updatable = false)
    private LocalDateTime dataAtualizacao;

    @Column(length = 1)
    private String status = "A";

    @OneToMany(mappedBy = "cadastro", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Conta> contas = new ArrayList<>();

    public Cadastro() {}

    public Cadastro(String nome, LocalDate dataNascimento, String email, String senha, TipoGenero tipoGenero) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.email = email;
        this.senha = senha;
        this.tipoGenero = tipoGenero;
        this.status = "A";
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public TipoGenero getTipoGenero() { return tipoGenero; }
    public void setTipoGenero(TipoGenero tipoGenero) { this.tipoGenero = tipoGenero; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }

    public LocalDateTime getDataCadastro() { return dataCadastro; }
    public void setDataCadastro(LocalDateTime dataCadastro) { this.dataCadastro = dataCadastro; }

    public LocalDateTime getDataAtualizacao() { return dataAtualizacao; }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) { this.dataAtualizacao = dataAtualizacao; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public List<Conta> getContas() { return contas; }
    public void setContas(List<Conta> contas) { this.contas = contas; }
}