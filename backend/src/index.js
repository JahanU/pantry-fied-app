import express from 'express';
import jwt from 'jsonwebtoken';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors';

import models from './models';
import { refreshTokens } from './auth';

process.on('unhandledRejection', (reason, p) => {
    // When we forget to catch a promise which errors, it'll be auto-caught here
    console.log('Unhandled Promise Rejection at:', p);
    console.log('Reason:', reason);
});

const SECRETS = { tokenSecret: 'fdafkjlaefaf9834j2f', refreshTokenSecret: 'j4r3rjnkjklfau33325f' };

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema'))); // Our GraphQL schema
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers'))); // Our GraphQL resolvers

const app = express();
app.use(cors('*'));

const graphqlPort = 8080;
const resetDatabase = false; // DANGEROUS

const authUser = async (req, res, next) => {
    const token = req.headers['x-token'];

    console.log('Client accessed API with token:', token);

    if (token) {
        try {
            const { user } = jwt.verify(token, SECRETS.tokenSecret);
            req.user = user;
            console.log(`Got token for user ${req.user.username}`);
        } catch (err) {
            const refreshToken = req.headers['x-refresh-token'];
            const newTokens = await refreshTokens(refreshToken, models, SECRETS);
            if (newTokens.token && newTokens.refreshToken) {
                res.set('Access-Control-Expose-Headers', 'x-token', 'x-refresh-token');
                res.set('x-token', newTokens.token);
                res.set('x-refresh-token', newTokens.refreshToken);
            }
            req.user = newTokens.user;
            console.log(`Created new tokens for user ${req.user.username}`);
        }
    }

    next();
};

app.use(authUser); // Nvm you working <3 ... now how to block unwanted users!!!

const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => ({ models, clientUser: req.user, SECRETS }) }); // The http server system
server.applyMiddleware({ app }); // Link it to our express app

app.listen({ port: graphqlPort }, () => console.log(`GraphQL server ready at http://localhost:${graphqlPort}${server.graphqlPath}`)); // Setup the http port to listen to

models.sequelize.sync({ force: resetDatabase }).catch(console.error);
