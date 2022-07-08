import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer
} from "miragejs";
import { faker } from "@faker-js/faker";

type User = {
  name: string;
  email: string;
  created_at: string;
}; //Qual o tipo do arquivo que vou querer adicionar

export function makeServer() {
  const server = createServer({
    serializers: {
        application: ActiveModelSerializer,
    }, //enviar os dados para uma mesma requisição

    models: {
      user: Model.extend<Partial<User>>({})
    }, //Quais dados eu vou adicionar no meu banco de dados

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`;
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        }
      })
    }, //criacao de varios users

    seeds(server) {
      server.createList("user", 200); // Lista 200 usuários fakes
    },

    routes() {
      this.namespace = "api";
      this.timing = 750;

      this.get("/users", function (this: any, schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams;
        const total = schema.all("user").length;

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );

        return new Response(200, { "x-total-count": String(total) }, { users });
      });

      this.get("/users/:id");
      this.post("/users");

      this.namespace = ""; //depois de usar volta para o estado inicial
      this.passthrough();
    }
  });

  return server;
}
