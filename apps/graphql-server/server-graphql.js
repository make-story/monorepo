/**
 * - 예제 1
 * https://hwasurr.io/api/graphql-example/
 * Express + GraphQL + json-server 활용
 * $ node server-qraphql.js
 * $ json-server --watch dummy/data.json
 *
 * - 예제 2
 * https://zinirun.github.io/2020/10/27/graphql-crud-sample/
 * Express + GraphQL 활용
 * $ node server-qraphql.js
 */
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const port = 4000;

app.use(cors());
// http://localhost:4000/graphql/test1
/*
{
  getProduct(id: "1") {
    id
    name
  }
}
*/
app.use(
  '/graphql/test1',
  graphqlHTTP({
    schema: require('./schema/test1.js'),
    rootValue: require('./resolver/test1.js'),
    graphiql: true, // support GUI
  }),
);
// http://localhost:4000/graphql
/*
{
  customer(id: "1") {
    id
    name
    email
    age
  }
}

또는

{
  customers {
    id
    name
    email
    age
  }
}
*/
app.use(
  '/graphql',
  graphqlHTTP({
    schema: require('./schema/index.js'),
    graphiql: true, // support GUI
  }),
);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
