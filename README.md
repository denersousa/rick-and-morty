# Rick and Morty Angular App

Este projeto é uma aplicação Angular que consome a API de Rick and Morty. Ele inclui funcionalidades de autenticação, navegação, pesquisa e exibição de informações sobre personagens e episódios.

## Tecnologias Utilizadas

- Angular: 17.2.0
- Node.js: 20.11.1
- Angular CLI: 12.0.0
- Node Package Manager: 10.2.4
- TypeScript: 5.3.2
- RxJS: 7.8.0
- Bootstrap: 5.3.3
- ngx-infinite-scroll: 17.0.0
- Moment.js: 2.30.1

## Pré-requisitos

Antes de rodar o projeto localmente, certifique-se de ter as seguintes ferramentas instaladas em seu ambiente de desenvolvimento:

- Node.js: [Download](https://nodejs.org/)
- Angular CLI: [Instalação](https://angular.io/cli)

## Instalação e Execução

Siga os passos abaixo para instalar e rodar o projeto:

1. Clone o repositório:
    git clone https://github.com/denersousa/rick-and-morty.git

2. Navegue até o diretório do projeto:
    cd rick-and-morty

3. Instale as dependências:
    npm install

4. Rode a aplicação:
    ng serve

Acesse `http://localhost:4200` no seu navegador para ver a aplicação em execução.


## Sobre o ngx-infinite-scroll

O ngx-infinite-scroll é uma biblioteca para Angular que permite implementar a funcionalidade de rolagem infinita em listas e grids. Com essa técnica, novos itens são carregados automaticamente conforme o usuário rola a página para baixo, melhorando a experiência do usuário ao lidar com grandes conjuntos de dados.

## Componentes Principais

### LoginComponent

Gerencia o formulário de login, validação e autenticação de usuários.

### UsuarioComponent

Gerencia o formulário de registro de novos usuários.

### ListCharacterComponent

Exibe a lista de personagens, com funcionalidade de pesquisa e scroll infinito.

### DetailEpisodeComponent

Exibe os detalhes de um episódio específico, incluindo a lista de personagens que aparecem no episódio.

### ListEpisodeComponent

Exibe a lista de episódios, com funcionalidade de pesquisa e scroll infinito.

### SidebarComponent

Gerencia a navegação da aplicação, mostrando ou ocultando o sidebar baseado na rota atual.

## Serviços

### AuthService

Gerencia a autenticação e armazenamento dos dados do usuário.

### UsuarioService

Gerencia os dados dos usuários, incluindo registro e recuperação de perfis de usuário.

### CharacterService

Gerencia a obtenção de dados de personagens da API de Rick and Morty.

### EpisodeService

Gerencia a obtenção de dados de episódios da API de Rick and Morty.

### SearchService

Gerencia o termo de pesquisa global usado na aplicação.

## Guarda de Rotas

### AuthGuard

Protege rotas que requerem autenticação.

## Informação do desenvolvedor

- Nome: Dener de Oliveira Sousa
- Email: denersousa.sp@gmail.com
