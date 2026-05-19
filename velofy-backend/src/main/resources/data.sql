-- =========================================================================
-- VELOFY - SCRIPT DE CARGA INICIAL DE SEMENTES (DATA.SQL)
-- =========================================================================

-- 1. TIPOS DE GÊNERO
DELETE FROM t_tipogenero;
insert into t_tipogenero (id, tipo, descricao, status) values (1, 'M', 'Masculino', 'A');
insert into t_tipogenero (id, tipo, descricao, status) values (2, 'F', 'Feminino', 'A');
insert into t_tipogenero (id, tipo, descricao, status) values (3, 'X', 'Não Binário', 'A');
insert into t_tipogenero (id, tipo, descricao, status) values (4, 'P', 'Prefiro não informar', 'A');
insert into t_tipogenero (id, tipo, descricao, status) values (5, 'Y', 'Outros', 'A');

-- 2. TIPOS DE CONTA
DELETE FROM t_tipoconta;
insert into t_tipoconta (id, tipo, descricao, status) values (1, 'PF', 'Pessoa física', 'A');
insert into t_tipoconta (id, tipo, descricao, status) values (2, 'PJ', 'Pessoa jurídica', 'A');

-- 3. TIPOS DE TRANSAÇÃO
DELETE FROM t_tipotransacao;
insert into t_tipotransacao (id, tipo, descricao, status) values (1, 'D', 'Débito', 'A');
insert into t_tipotransacao (id, tipo, descricao, status) values (2, 'C', 'Crédito', 'A');

-- 4. TIPOS DE CATEGORIAS
DELETE FROM t_tipocategoria;
-- Débitos (D)
insert into t_tipocategoria (id, tipo, descricao, status) values (1, 'D', 'Lazer e entretenimento', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (2, 'D', 'Contas e boletos', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (3, 'D', 'Aporte de investimentos', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (4, 'D', 'Saúde', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (5, 'D', 'Educação', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (6, 'D', 'Alimentação', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (7, 'D', 'Transporte e viagem', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (8, 'D', 'Outras despesas', 'A');
-- Créditos (C)
insert into t_tipocategoria (id, tipo, descricao, status) values (9, 'C', 'Salário', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (10, 'C', 'Pix e transferências', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (11, 'C', 'Dividendos e rendimentos', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (12, 'C', 'Vendas', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (13, 'C', 'Reembolsos', 'A');
insert into t_tipocategoria (id, tipo, descricao, status) values (14, 'C', 'Outras receitas', 'A');

-- 5. TIPOS DE INVESTIMENTO
DELETE FROM t_tipoinvestimento;
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir, status) values (1, 'A', 'Poupança', 'B', 'X', 'N', 'A');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir, status) values (2, 'B', 'Tesouro direto', 'B', 'L', 'S', 'A');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir, status) values (3, 'C', 'CDB', 'B', 'X', 'S', 'A');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir, status) values (4, 'D', 'LCI / LCA', 'B', 'M', 'N', 'A');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir, status) values (5, 'E', 'Fundos de investimento', 'M', 'M', 'S', 'A');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir, status) values (6, 'F', 'Ações / renda variável', 'A', 'L', 'N', 'A');

-- 6. TIPO DE OCORRÊNCIAS DO CADASTRO (NORMALIZADO EM UPPER CASE E SEM ACENTOS)
DELETE FROM t_tipoocorrenciacadastro;
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (1, 'C', 'ALTERACAO DE SENHA', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (2, 'C', 'ALTERACAO CADASTRAL', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (3, 'F', 'NOVA TRANSACAO', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (4, 'F', 'NOVO INVESTIMENTO', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (5, 'F', 'ATUALIZACAO DE TRANSACAO', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (6, 'F', 'ATUALIZACAO DE INVESTIMENTO', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (7, 'M', 'OCORRENCIA MANUAL', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (8, 'S', 'ERRO DE INTEGRACAO', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (9, 'X', 'CRIACAO DE CONTA', 'A');
INSERT INTO t_tipoocorrenciacadastro (id, tipo, descricao, status) VALUES (10, 'X', 'ATUALIZACAO DE CONTA', 'A');