# Encurtador de URLs - Desafio Técnico

Este projeto é uma aplicação web desenvolvida para resolver um **desafio técnico**, consistindo em um **encurtador de URLs** com painel de cliques, exibindo estatísticas e ícones de plataforma, com frontend moderno baseado em **Liquid Glass**.

---

## Tecnologias Utilizadas

### Backend

* **Node.js** + **Express**: Servidor e rotas da API.
* **Prisma ORM**: Comunicação com banco de dados SQLite/PostgreSQL (configurável).
* **nanoid**: Geração de slugs únicos para URLs.
* **TypeScript**: Tipagem estática e organização do código.

### Frontend

* **React + TypeScript**: Interface interativa.
* **Bootstrap**: Grid e componentes responsivos.
* **CSS (Liquid Glass)**: Efeito glassmorphism nos painéis e listas.
* **Axios**: Consumo da API.

### Banco de Dados

* **Prisma Client** + SQLite/PostgreSQL.
* Armazena:

  * URLs originais (`longUrl`)
  * Slug encurtado (`slug`)
  * Número de cliques (`clicks`)
  * Data de criação (`createdAt`)

---

## Funcionalidades

### Backend

* `POST /api/url`: Cria uma nova URL encurtada.
* `GET /api/url`: Retorna todas as URLs cadastradas, ordenadas por data de criação.
* `GET /api/url/:slug`: Redireciona para a URL original e incrementa o contador de cliques.

Validações:

* URL deve ser válida.
* Slug gerado é único (conflito retorna erro 409).

### Frontend

* Formulário para enviar URLs e gerar links encurtados.
* Lista de URLs encurtadas com:

  * Slug clicável para abrir a URL.
  * URL original truncada.
  * Quantidade de cliques.
  * Ícone da plataforma (YouTube, Google, ou genérico).
* Atualização automática da lista a cada 5 segundos.
* Estilização com **Liquid Glass**, garantindo um visual moderno e legível.

---

## Estrutura do Projeto

```
/src
  /components
    UrlForm.tsx       # Formulário para criar URLs
    UrlList.tsx       # Lista de URLs e estatísticas
  /services
    api.ts            # Configuração do Axios
  app.tsx             # Componente principal
/prisma
  schema.prisma        # Modelo de banco de dados
package.json
tsconfig.json
app.css               # Estilização com Liquid Glass
```

---

## Instalação e Execução

1. **Clonar o repositório**

```bash
git clone <REPO_URL>
cd backend
```

2. **Instalar dependências**

```bash
npm install
```

3. **Configurar o banco de dados**

* Editar `prisma/schema.prisma` para apontar para SQLite ou PostgreSQL.

```bash
npx prisma migrate dev --name init
```

4. **Executar o servidor**

```bash
npm run dev
```

5. **Executar o frontend**

```bash
npm start
```

* Abra [http://localhost:5173](http://localhost:5173) no navegador.

---

## Exemplo de Uso

* Adicione uma URL no formulário.
* Receba o **slug encurtado**.
* Clique no slug para abrir a URL.
* Veja a contagem de cliques aumentar no painel.

---

## Boas Práticas Implementadas

* Validação de URLs no backend.
* Slugs únicos com `nanoid`.
* Estrutura MVC simples e organizada.
* Estilização consistente com **Liquid Glass**.
* Atualização dinâmica da lista de URLs.
* Responsividade com **Bootstrap**.
* Tipagem completa com **TypeScript**.

---



