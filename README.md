# todolist-api
API para um To-Do List em nodejs

## Configuração de ambiente

- Crie um arquivo com o nome de `.env` na pasta raiz da aplicação.

- Adicione as seguintes variaveis para configurar o banco de dados e a porta de execução

      PORT=3000
      DB_IN_MEMORY=true
      DB_URL=localhost

OBS:
  - Caso não seja expecificado a porta de inicialização ela será iniciada na porta 3000 por padrão.
  - Caso essas configurações não sejam feitas irá ocasionar em um erro ao iniciar.
  - O banco de dados será criado em memoria, então toda vez que iniciar a aplicação ele será um novo, caso não queira que a API se conecte ao banco em memoria deixar o campo `DB_IN_MEMORY` como `false` e expecificar a url do seu banco local no campo `DB_URL`.


## Execução

Para executar a aplicação digite o seguinte comando:

    npm start

Para executar a aplicação em modo de desenvolvimento digite o seguite comando:

    npm run dev