import { createServer, Factory, Model } from 'miragejs'
import faker from 'faker' //biblioteca de geração de dados falsos

type User = {//tipando o formato do user
    name: string;
    email: string;
    created_at: string;
}

export function makeServer(){//simulando um servidor backend com o miragejs
    const server = createServer({
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

            this.get('/users');
            this.post('/users');

            this.namespace = '';//voltando o estado da rota de chamada pro mirage em branco para nao dar conflito nas rotas
            this.passthrough()
        }
    })

    return server;
}