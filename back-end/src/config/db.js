const mongoose = require('mongoose');

const dbConfig = 'mongodb+srv://souwilson:dia25mes1@projetos.quefbcj.mongodb.net/bolanevedb?retryWrites=true&w=majority';

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;