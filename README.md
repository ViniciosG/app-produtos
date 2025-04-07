# Sistema de Gerenciamento de Produtos e Categorias

Sistema desenvolvido em Angular para gerenciamento de produtos e categorias, com interface moderna e funcionalidades CRUD completas.

## Funcionalidades

### Categorias
- Listagem com paginação e filtro
- Cadastro de novas categorias
- Edição de categorias existentes
- Ativação/Inativação de categorias
- Exclusão de categorias
- Validações de campos obrigatórios

### Produtos
- Listagem com paginação e filtro
- Cadastro de novos produtos
- Edição de produtos existentes
- Ativação/Inativação de produtos
- Exclusão de produtos
- Formatação monetária (BRL) para preços
- Validações de campos obrigatórios

## Tecnologias Utilizadas

- Angular 17
- Angular Material
- TypeScript
- SCSS
- RxJS

## Recursos Técnicos

- Componentes standalone
- Lazy loading
- Formulários reativos
- Pipes personalizados
- Diretivas personalizadas
- Serviços HTTP
- Interceptors
- Tratamento de erros
- Feedback visual (snackbar)
- Modais de confirmação

## Pré-requisitos

- Node.js
- npm ou yarn
- Angular CLI

## Instalação

1. Clone o repositório
```bash
git clone [url-do-repositorio]
```

2. Instale as dependências
```bash
npm install
```

3. Inicie o servidor de desenvolvimento
```bash
ng serve
```

4. Acesse a aplicação em `http://localhost:4200`

## Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   └── services/
│   ├── features/
│   │   ├── categorias/
│   │   └── produtos/
│   └── shared/
│       ├── components/
│       ├── directives/
│       └── styles/
├── assets/
└── environments/
```

## Funcionalidades Detalhadas

### Categorias
- **Listagem**: Tabela com paginação, ordenação e filtro
- **Status**: Chip colorido indicando status ativo/inativo
- **Ações**: Botões para editar, ativar/inativar e excluir

### Produtos
- **Listagem**: Tabela com paginação, ordenação e filtro
- **Preço**: Formatação automática em BRL
- **Estoque**: Controle de quantidade
- **Status**: Chip colorido indicando status ativo/inativo
- **Ações**: Botões para editar, ativar/inativar e excluir

## Estilização

- Design moderno e responsivo
- Tema personalizado do Material
- Animações suaves
- Feedback visual para ações
- Ícones intuitivos

## Contribuição

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
