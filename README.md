# Sistema de notificações

O sistema conta com um frontend construído em _Next 13_ e um Backend construído em _NestJS_, utilizando banco de dados não relacional _MongoDB_ e _RabbitMQ_ como agente de mensagens.

O objetivo é permitir que usuários enviem notificações baseada em tópicos.

# Sistema de notificações

O sistema conta com um frontend construído em _Next 13_ e um Backend construído em _NestJS_, utilizando banco de dados não relacional _MongoDB_ e _RabbitMQ_ como agente de mensagens.

O objetivo é permitir que usuários enviem notificações baseada em tópicos.

![Arch](https://i.imgur.com/xLPFURz.png)

## Execução do projeto

O backend do projeto (banco de dados, api e mensageria) pode ser rodado com um único comando, o requisito é possuir Docker instalado.

**IMPORTANTE**

O projeto vem com um arquivo `.env.example` no backend e `.env.local.example` no frontend. Basta remover o `.example` do nome dos arquivos para eles serem usados pela aplicação. Eles já vem com as variáveis de ambiente mínimas para rodar o projeto, fica a critério mudá-las.

### Backend

O seguinte comando deve ser usado dentro da pasta backend:

PORTA PADRÃO DA API: 3001

```shell
docker-compose up --build
```

### Frontend

O seguinte comando deve ser usado dentro da pasta frontend, ele irá buildar o projeto e rodá-lo.

PORTA PADRÃO: 3000

```shell
yarn start:prod
```
