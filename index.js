const express = require('express');
const envs = require('dotenv').config().parsed;
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const ENV_PORT = envs['ENV_PORT'] || 4040;
const app = express();
const events = [
    {
        _id: Math.random().toString(),
        title: 'event 1',
        description: ' description 1',
        price: 1,
        date: Date.now(),
    },
    {
        _id: Math.random().toString(),
        title: 'event 2',
        description: ' description 2',
        price: 2,
        date: Date.now(),
    },
    {
        _id: Math.random().toString(),
        title: 'event 3',
        description: ' description 3',
        price: 3,
        date: Date.now(),
    },
    {
        _id: Math.random().toString(),
        title: 'event 4',
        description: ' description 4',
        price: 4,
        date: Date.now(),
    },
];
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello world!');
});
app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery{
            events: [Event!]!
        }

        input CreateEventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootMutation {
            createEvent(createEventInput:CreateEventInput): Event
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
`),
        rootValue: {
            events: () => events,
            createEvent: ({ createEventInput: { title, description, price, date, _id } }) => {
                let event = { title, description, date, _id, price };
                events.push(event);
                return event;
            },
        },
        graphiql: true,
    })
);
app.listen(ENV_PORT, () => {
    console.log(`Listening at --> ${ENV_PORT}`);
});
