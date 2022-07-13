const Column = require('../models/ColumnData');

module.exports = {
    async create(req, res) {

        console.log(req.body);

        const options = { ordered: true };
        Column.insertMany(req.body, options).then(() => {
            return res.json({
                success: "Registros inseridos com sucesso!"
            })
        }).catch((err) => {
            return res.json({
                error: "Houve um erro ao inserir os registros!"
            })
        })
    },
    async edit(req, res) {

    },
    async delete(req, res) {

    },
    async get(req, res) {
        const columns = await Column.find({});
        return res.json(columns);
    },
}