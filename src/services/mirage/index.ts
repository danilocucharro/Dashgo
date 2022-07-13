import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs'
import faker from 'faker' //biblioteca de geração de dados falsos

type User = {//tipando o formato do user
    name: string;
    email: string;
    created_at: string;
}

export function makeServer(){//simulando um servidor backend com o miragejs
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },
        models: {//declarando os models necessarios para o dashgo
            user: Model.extend<Partial<User>>({})//Partial: faz com que todos os campos do user nao sejam obrigatorios
        },

        factories: {//gerar varios dados de uma vez, ao inves de criar varios schemas dentro da seeds
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase();
                },
                createdAt() {
                    return faker.date.recent(10);
                },
            })
        },

        seeds(server){
            server.createList('user', 200)//criando 200 usuarios
        }, 

        routes(){//o mirage identifica automaticamente a chamada de get e de post para a rota /users
            this.namespace = 'api';// setando o caminho que a aplicação precisa acessar para chamar o mirage
            this.timing = 750;//toda chamada ao mirage vai demorar 750 milisegundos pra acontecer

            this.get('/users', function(schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams //page é a pagina em que o usuario esta, e page_per é o maximo de dados que vai aparecer em uma listagem
                
                const total = schema.all('user').length //pegar todos os dados de um model

                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);

                const users = this.serialize(schema.all('user'))
                .users
                .slice(pageStart, pageEnd)

                return new Response(
                    200, //status code
                    { 'x-total-count': String(total) },//headers
                    { users }//registros
                )
            });

            this.get('/users/:id')
            this.post('/users');

            this.namespace = '';//voltando o estado da rota de chamada pro mirage em branco para nao dar conflito nas rotas
            this.passthrough()
        }
    })

    return server;
}