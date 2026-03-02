# Projeto para aula de extensão 4

Proximo passo do projeto:

Definir as tabelas obrigaorias que TODOS os projetos devem ter

Estabelecer a estrutura de autenticação (login e recuperação de senha)

Iniciar modelagem de banco de dados de cada grupo

Alinhar expectativas para a ativadade 01 (entrega no dia 09/03 )

Tabelas Obrigatorias -

1 - Usuarios        (controle de acesso)
    id (PK)
    nome
    email (unico)
    senha_hash (NUNCA texto puro!)
    token_recuperacao
    validade_token
    nivel_acesso ('admin'/usuario')
    created_at/ updated_at
    Dica: Use bcryot ou argon2 para hashing de senhas!

    Recuperação da senha:
    Usuario clica em "esqueci a senha"
    digita e-mail
    Sistema dger aum tokin UNICO e salva na tabela com validade ( ex 1h)
    Envia email com o link contendo o token
    Usuario acessa link, sistema valida token
    Permite criar nova senha 
    
2 - Pessoas         (alunos/instituição)
    Ddaos pessoais:
    id 9PK
    nome
    data_nascimento
    data_entrada ( no instituto )
    status (ativo/inativo)

    Saúde:
    usa_mendicamento (boolean)
    info_medicamentos (texto)

    Contato e responsaveis
    telefone
    nome_responsabel
    falta coisa
3 - Empresas        (parceiras)
    id (pk)
    nome_fantasia e razao_social
    cnpj
4 - Avaliações      (experiencias 1 e 2)
5 - Fichas          (acompanhamento)
6 - Encaminhamentos (trabalho)
