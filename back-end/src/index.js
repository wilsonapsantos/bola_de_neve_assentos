const express = require('express');
const routes = require('./routes');
const cors = require('cors');
require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//Others
const port = process.env.port || 3333;
app.listen(port, () => {
    console.log(`Server Running - Port:[${port}]`)
})