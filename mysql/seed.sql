INSERT IGNORE INTO perfis (nome, descricao) VALUES
('admin', 'Administrador com acesso total'),
('vendedor', 'Usuário com permissão para gerenciar veículos'),
('cliente', 'Usuário com permissão para visualizar e comprar veículos');

INSERT IGNORE INTO usuarios (email,senha,nome,whatsapp,avatar,endereco) VALUES
('admin@example.com', 'hashed_password', 'Admin User', '123456789', 'avatar.jpg', '{"CEP": "12345-678","cidade": "Cidade Exemplo","logradouro": "Rua Exemplo","complemento": "Apto 101","bairro": "Bairro Exemplo","localidade": "Cidade Exemplo","uf": "EX","ibge": "1234567","gia": "1234","ddd": "12","siafi": "1234"}'),
('vendedor@example.com', 'hashed_password', 'Vendedor User', '123456789', 'avatar.jpg', '{"CEP": "12345-678","cidade": "Cidade Exemplo","logradouro": "Rua Exemplo","complemento": "Apto 101","bairro": "Bairro Exemplo","localidade": "Cidade Exemplo","uf": "EX","ibge": "1234567","gia": "1234","ddd": "12","siafi": "1234"}'),
('cliente@example.com', 'hashed_password', 'Cliente User', '123456789', 'avatar.jpg', '{"CEP": "12345-678","cidade": "Cidade Exemplo","logradouro": "Rua Exemplo","complemento": "Apto 101","bairro": "Bairro Exemplo","localidade": "Cidade Exemplo","uf": "EX","ibge": "1234567","gia": "1234","ddd": "12","siafi": "1234"}');
