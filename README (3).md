# 🛒 Projeto CRUD de Produtos com Node.js, Express, MySQL e Handlebars

Este projeto é uma aplicação web simples de cadastro de produtos, com operações completas de **CRUD** (Create, Read, Update, Delete). Ele utiliza **Node.js**, **Express**, **MySQL**, **Express-Handlebars** para renderização de views e **express-fileupload** para upload de imagens.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [express-handlebars](https://www.npmjs.com/package/express-handlebars)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [dotenv](https://www.npmjs.com/package/dotenv)

---

## 📁 Estrutura de Pastas

```
projeto/
├── app.js                  # Arquivo principal da aplicação
├── db.js                   # Conexão com o banco de dados
├── databese_mysql.js       # Classe de operações CRUD no banco
├── /views                  # Templates Handlebars (formulários e páginas)
├── /views/partials         # Partials do Handlebars
├── /imagem                 # Imagens dos produtos
├── /css                    # Arquivos CSS
├── .env                    # Variáveis de ambiente (DB_HOST, DB_USER, DB_PASS)
└── package.json
```

---

## ⚙️ Instalação e Execução

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

2. **Instale as dependências:**

```bash
npm install
```

3. **Configure o arquivo `.env`:**

Crie um arquivo `.env` na raiz com suas credenciais do MySQL:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
```

4. **Crie o banco de dados e a tabela:**

No MySQL, crie o banco `projeto` e a tabela `produtos`:

```sql
CREATE DATABASE projeto;

USE projeto;

CREATE TABLE produtos (
  codigo INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(100),
  valor DECIMAL(10,2),
  imagem VARCHAR(255)
);
```

5. **Inicie o servidor:**

```bash
node app.js
```

Acesse a aplicação em: [http://localhost:3000](http://localhost:3000)

---

## ✨ Funcionalidades

- ✅ Listagem de produtos
- ✅ Cadastro com upload de imagem
- ✅ Atualização de dados e imagem
- ✅ Exclusão com remoção da imagem do diretório
- ✅ Mensagens de sucesso/erro usando rotas dinâmicas
- ✅ Templates reutilizáveis com Handlebars

---

## 📝 Notas

- As imagens são salvas na pasta `/imagem`.
- O projeto utiliza rotas como `/okCadastro`, `/falhaAtualizar`, etc., para indicar o status das operações.

---

## 📷 Exemplo de uso

![formulário de produtos](./screenshot.png) <!-- coloque aqui uma imagem real do app funcionando -->

---

## 🤝 Contribuição

Pull requests são bem-vindos! Sinta-se à vontade para propor melhorias ou corrigir bugs.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

Desenvolvido com 💻 por [Seu Nome](https://github.com/seu-usuario)
