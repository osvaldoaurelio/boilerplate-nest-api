# Boilerplate NestJS API

> Um ponto de partida completo para o desenvolvimento de uma WebApi NestJS

Este repositório fornece um boilerplate básico para WebApi NestJS, com as principais bibliotecas e configurações iniciais prontas para uso.

## Sumário

- [Tecnologias](#tecnologias)
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Extras](#extras)
  - [Comandos Úteis](#comandos-úteis)
    - [NVM](#nvm)
    - [NestJS](#nestjs)
    - [Yarn add](#yarn-add)
    - [Prisma](#prisma)
    - [Docker](#docker)
  - [Fontes](#fontes)
  - [Oh My Zsh](#oh-my-zsh)
  - [Alias](#alias)
- [Contatos](#contatos)

## Tecnologias

Principais tecnologias utilizadas:

- **[Node.js](https://nodejs.org/)**
- **[Nest.js](https://nestjs.com/)**
- **[Prisma](https://www.prisma.io/)**
- **[Swagger](https://swagger.io/)**
- **[Docker](https://www.docker.com/)**

## Ambiente de Desenvolvimento

> Usuários windows:
>
>- Instalar o [WSL- Windows Subsystem for Linux](https://learn.microsoft.com/pt-br/windows/wsl/install)
>- Instalar o [Docker Desktop](https://docs.docker.com/.desktop/install/windows-install/).
>
>---
>
>*Importante: Após instalar uma distro no WSL e antes de qualquer instalação, atualize o sistema.*
>
>*Por exemplo, no [Ubuntu](https://ubuntu.com/desktop/wsl), use o comando: `sudo apt update && sudo apt upgrade`.*

1. Editor de código:

    - Instale o [Visual Studio Code](https://code.visualstudio.com/).
    - Extensões recomendadas:
        - [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
        - [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)
        - [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight)
        - [DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)
        - [Dracula Theme Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)
        - [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
        - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
        - [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
        - [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
        - [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
        - [Portugues (Brazil) Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-pt-BR)
        - [Postman](https://marketplace.visualstudio.com/items?itemName=postman.postman-for-vscode)
        - [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
        - [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma)
        - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

2. Instalar Git:
    - Instale o [Git](https://git-scm.com/downloads) com o comando: `sudo apt install git`.

3. Instalar Node.js:

    - Instale o Node.js com [NVM](https://github.com/nvm-sh/nvm/) para melhor gerenciamento de versões.
    - Instale também o [PNPM](https://pnpm.io/installation) para gerenciamento de pacotes.

## Instalação

Para instalar e configurar o projeto:

1. Clone o repositório:

    ```bash
    git clone https://github.com/osvaldoaurelio/boilerplate-nest-api.git
    ```

2. Navegue até a pasta do projeto:

    ```bash
    cd boilerplate-nest-api
    ```

3. Instale as dependências:

    ```bash
    yarn
    ```

4. Configure as variáveis de ambiente:
    - Duplique o arquivo `.env.example` e renomeie para `.env`.
    - Ajuste os valores das variáveis de ambiente conforme necessário.

5. Inicialize o banco de dados:

    ```bash
    docker-compose up -d
    ```

6. Execute as migrações do Prisma:

    ```bash
    yarn prisma migrate dev
    ```

7. Inicie o servidor de desenvolvimento:

    ```bash
    yarn start:dev
    ```

## Estrutura do Projeto

```plaintext
boilerplate-nest-api/   # Pasta raiz do projeto
├── prisma/                      # Pasta do Prisma (migrações, esquemas e seeds)
├── src/                         # Código-fonte principal do projeto
│   ├── common/                  # Pasta com recursos e configurações compartilhados
│   │   ├── decorators/          # Pasta com decoradores personalizados
│   │   ├── modules/             # Pasta com módulos compartilhados (Swagger, Prisma, etc.)
│   │   ├── pipes/               # Pasta com pipes personalizados
│   │   └── utils/               # Pasta com funções e utilitários compartilhados
│   ├── domain/                  # Pasta com definições de domínio e entidades
│   │   └── [...]                # Pastas para outros domínios (ex: auth, user, etc.)
│   ├── app.module.ts            # Configuração do módulo principal do NestJS
│   └── main                     # Ponto de entrada do aplicativo
├── test/                        # Pasta de arquivos e configurações de testes e2e (end to end)
├── .env.example                 # Arquivo de exemplo para variáveis de ambiente
├── README.md                    # Documentação do projeto
├── [...]                        # Outros arquivos de configuração
└── tsconfigg.json               # Configurações do TypeScript
```

## Extras

> Criações, configurações e ajustes opcionais para melhorar a experiência de desenvolvimento.

*Usuários Windows: exceto as fontes, que devem ser instaladas diretamente no Windows, todas as outras configurações devem ser feitas no WSL.*

### Comandos úteis

#### NVM

```bash
# Instalar a última versão LTS do node
nvm install --lts

# Usar a última versão LTS do node
nvm use --lts

# Mostrar a versão do node atual
nvm current
```

### NestJS

```bash
# Instalar o Nest CLI
yarn global add @nestjs/cli

# Criar um novo projeto NestJS
nest new nest-api

# Criar um novo módulo
nest g mo path/resource

# Criar um novo controller
nest g co path/resource

# Criar um novo serviço
nest g s path/resource
```

#### Yarn add

```bash
#instalando as dependências iniciais do projeto
yarn add @nestjs/config @nestjs/swagger @prisma/client class-transformer class-validator cpf-cnpj-validator cuid winston

#instalação de dependências de desenvolvimento do projeto
yarn add -D @faker-js/faker prisma
```

#### PRISMA

```bash
# Inicializar o Prisma habilitando o prismaSchemaFolder e multiSchema
yarn prisma init --preview-feature prismaSchemaFolder --preview-feature multiSchema

# Gerar os arquivos do Prisma Client
yarn prisma generate

# Criar as migrações do Prisma
yarn prisma migrate dev

# Iniciar o studio do prisma
yarn prisma studio
```

#### Docker

```bash
# Iniciar os containers do Docker
docker-compose up -d

# Ver os logs dos containers do Docker
docker-compose logs

# Parar os containers do Docker
docker-compose down

# Listar todos os containers
docker ps -a
```

---

### Fontes

Para uma melhor visualizaçãoo do código, instale a fonte [Fira Code](https://github.com/tonsky/FiraCode), que supoorta [ligaduras](https://github.com/tonsky/FiraCode/wiki/VS-Code-Instructions) e [glyphs](https://github.com/tonsky/FiraCode/wiki/Github-Glyphs).

### Oh My Zsh

Para personalizar seu terminal com [Oh My Zsh](https://ohmyz.sh/), instale o [ZSH](https://ohmyz.sh/) com:

```bash
sudo apt install zsh
```

Em seguida, instale o Oh My Zsh com:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Alias

Configure atalhos (aliases) no seu ambiente de desenvolvimento adicionando os comandos abaixo ao seu `~/.zshrc` ou `~/.bashrc`:

```bash

alias c='clear'
alias l='c && ls -AFGhl --color=auto --show-control-chars --group-directories-first && echo "\ncurrent dictory => $PWD 🫠💻"'
```

## Contatos

Para entrar em contato comigo, siga-me nas redes:

- [GitHub](https://github.com/osvaldoaurelio)
- [Linkedin](https://linkedin.com/in/osvaldo-aurelio)
- [YouTube](https://youtube.com/@osvaldoaurelio)
- [Instagram](https://instagram.com/osvaldo.aureliors)
