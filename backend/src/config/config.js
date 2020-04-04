const Sequelize = require('sequelize');

module.exports = {
    development: {
        username: 'postgres',
        password: '1248',
        database: 'pantryfied',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        define: {
            underscored: true,
        },
        logging: false,
        // query: { raw: true },
    },
    test: {
        username: 'postgres',
        password: '1248',
        database: 'pantryfied',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        define: {
            underscored: true,
        },
        logging: false,
        // query: { raw: true },
    },
    production: {
        username: 'postgres',
        password: '1248',
        database: 'pantryfied',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
        operatorsAliases: Sequelize.Op,
        define: {
            underscored: true,
        },
        logging: false,
        // query: { raw: true },
    },
};
