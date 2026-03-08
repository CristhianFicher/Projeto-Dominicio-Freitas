# Projeto para a aula de extensão 4

Próximo passo do projeto:

Definir as tabelas obrigatórias que TODOS os projetos devem ter.

Estabelecer a estrutura de autenticação (login e recuperação de senha).

Iniciar a modelagem de banco de dados de cada grupo.

Alinhar expectativas para a atividade 01 (entrega no dia 09/03).

## Tabelas obrigatórias

1 - Usuários (controle de acesso)
    id (PK)
    nome
    email (único)
    senha_hash (NUNCA texto puro!)
    token_recuperacao
    validade_token
    nivel_acesso ('admin'/'usuario')
    created_at / updated_at
    Dica: Use bcrypt ou argon2 para hashing de senhas!

    Recuperação da senha:
    Usuário clica em "esqueci a senha".
    Digita e-mail.
    Sistema gera um token ÚNICO e salva na tabela com validade (ex.: 1h).
    Envia e-mail com o link contendo o token.
    Usuário acessa o link, sistema valida o token.
    Permite criar nova senha.

2 - Pessoas (alunos/instituição)
    Dados pessoais:
    id (PK)
    nome
    data_nascimento
    data_entrada (no instituto)
    status (ativo/inativo)

    Saúde:
    usa_medicamento (boolean)
    info_medicamentos (texto)

    Contato e responsáveis:
    telefone
    nome_responsavel
    faltam informações

3 - Empresas (parceiras)
    id (PK)
    nome_fantasia e razao_social
    cnpj

4 - Avaliações (experiências 1 e 2)

5 - Fichas (acompanhamento)

6 - Encaminhamentos (trabalho)
