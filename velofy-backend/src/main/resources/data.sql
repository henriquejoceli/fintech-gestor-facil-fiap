-- 1. Tipos de gênero
insert into t_tipogenero (id, tipo, descricao) values (1, 'M', 'Masculino');
insert into t_tipogenero (id, tipo, descricao) values (2, 'F', 'Feminino');
insert into t_tipogenero (id, tipo, descricao) values (3, 'X', 'Não Binário');
insert into t_tipogenero (id, tipo, descricao) values (4, 'P', 'Prefiro não informar');
insert into t_tipogenero (id, tipo, descricao) values (5, 'Y', 'Outros');

-- 2. Tipos de conta
insert into t_tipoconta (id, tipo, descricao) values (1, 'PF', 'Pessoa física');
insert into t_tipoconta (id, tipo, descricao) values (2, 'PJ', 'Pessoa jurídica');

-- 3. Tipos de transação
insert into t_tipotransacao (id, tipo, descricao) values (1, 'D', 'Débito');
insert into t_tipotransacao (id, tipo, descricao) values (2, 'C', 'Crédito');

-- 4. Tipos de categorias
insert into t_tipocategoria (id, tipo, descricao) values (1, 'L', 'Lazer');
insert into t_tipocategoria (id, tipo, descricao) values (2, 'C', 'Contas fixas');
insert into t_tipocategoria (id, tipo, descricao) values (3, 'I', 'Investimentos');
insert into t_tipocategoria (id, tipo, descricao) values (4, 'S', 'Saúde');
insert into t_tipocategoria (id, tipo, descricao) values (5, 'E', 'Educação');
insert into t_tipocategoria (id, tipo, descricao) values (6, 'O', 'Outros');

-- 5. Tipos de investimento
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir) values (1, 'A', 'Poupança', 'B', 'X', 'N');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir) values (2, 'B', 'Tesouro direto', 'B', 'L', 'S');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir) values (3, 'C', 'CDB', 'B', 'X', 'S');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir) values (4, 'D', 'LCI / LCA', 'B', 'M', 'N');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir) values (5, 'E', 'Fundos de investimento', 'M', 'M', 'S');
insert into t_tipoinvestimento (id, tipo, descricao, risco, prazo, desconto_ir) values (6, 'F', 'Ações / renda variável', 'A', 'L', 'N');

-- 6. Tipo de ocorrências do cadastro
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (1, 'S', 'Alteração de senha');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (2, 'L', 'Tentativa de login');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (3, 'M', 'Manutenção cadastral');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (4, 'E', 'Erro de integração');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (5, 'O', 'Ocorrência manual');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (6, 'T', 'Cadastro de transação');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (7, 'I', 'Cadastro de investimento');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (8, 'A', 'Atualização sobre transação');
insert into t_tipoocorrenciacadastro (id, tipo, descricao) values (9, 'B', 'Atualização sobre investimento');