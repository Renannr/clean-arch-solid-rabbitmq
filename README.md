# Client API - Clean Architecture

API RESTful para cadastro e consulta de clientes, desenvolvida em Node.js com TypeScript, seguindo os princípios da Clean Architecture e SOLID.

---

## Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express**
- **MongoDB** (armazenamento de dados)
- **Redis** (cache)
- **RabbitMQ** (mensageria)
- **Docker Compose**

---

## Arquitetura

O projeto segue a Clean Architecture, com separação em camadas:

```
src/
├── application/
│   ├── protocols/           # Interfaces de comunicação com a infraestrutura
│   └── use-cases/           # Casos de uso (regras de negócio)
├── domain/
│   └── entities/            # Entidades do domínio
├── infra/
│   ├── cache/               # Integração com Redis
│   ├── database/
│   │   └── mongodb/         # Integração com MongoDB
│   ├── messaging/           # Integração com RabbitMQ
│   └── server/              # Configuração do Express (rotas e app)
├── interfaces/
│   └── controllers/         # Controllers HTTP (entrada da aplicação)
├── shared/
│   └── entities/            # Entidades base reutilizáveis
├── utils/                   # Utilitários diversos
└── index.ts                 # Ponto de entrada da aplicação

tests/
├── e2e/                     # Testes end-to-end da API
├── repositories/            # Testes unitários/integrados dos repositórios
└── usecases/                # Testes unitários dos casos de uso
```

---

## Como rodar

### 1. Clone o repositório

```bash
git clone https://github.com/Renannr/clean-arch-solid-rabbitmq.git
cd clean-arch-solid-rabbitmq
```

### 2. Crie um `.env`

```bash
cp .env.example .env

```

### 3. Suba as dependencias com Docker Compose

```bash
docker-compose up -d
```

A API estará disponível em:

```
http://localhost:3000
```

---

## Endpoints

| Método | Rota          | Descrição                 | Body (JSON)                                                  |
| ------ | ------------- | ------------------------- | ------------------------------------------------------------ |
| GET    | /health       | Verifica status da API    | –                                                            |
| POST   | /clientes     | Cadastra um cliente       | `{ "name": "string", "email": "string", "phone": "string" }` |
| GET    | /clientes     | Lista todos os clientes   | –                                                            |
| GET    | /clientes/:id | Busca cliente por ID      | –                                                            |
| PUT    | /clientes/:id | Atualiza dados do cliente | `{ "name": "string", "email": "string", "phone": "string" }` |

---

## Scripts Disponíveis

Estes são os comandos disponíveis para rodar e testar a aplicação:

| Comando         | Descrição                                                     |
| --------------- | ------------------------------------------------------------- |
| `npm run dev`   | Inicia a aplicação em modo de desenvolvimento com ts-node-dev |
| `npm run build` | Transpila o código TypeScript para JavaScript na pasta `dist` |
| `npm start`     | Executa o projeto em produção a partir da build gerada        |
| `npm test`      | Executa os testes automatizados com Jest                      |

---

## Conceitos aplicados

- Clean Architecture
- SOLID
- Inversão de Dependência com interfaces
- Integração com serviços externos desacoplada
- Uso de cache com Redis
- Mensageria com RabbitMQ

---

## Observações

- A fila `cliente_cadastrado` recebe mensagens sempre que um novo cliente é cadastrado.

---
