import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Seat from '../../Components/Seat';
import api from "../../Services/api";
import "./style.css";

function Registration() {

    const [columns, setColumns] = useState(null);

    //const token = process.env.REACT_APP_TOKEN;
    const headers = {
        //'ApiKey': token,
    };

    function handleCreateColumn() {
        let columnName = document.getElementById("column").value;
        let row = document.getElementById("row").value;
        let chair = document.getElementById("chair").value;

        var rows = [];
        for (var r = 0; r < row; r++) {
            var seats = [];
            for (var s = 0; s < chair; s++) {
                seats.push({ "number": s + 1, "filled": false });
            }
            rows.push({ "rowNumber": r + 1, seats });
        }

        const registration = { columnName: columnName, rows: rows };

        if (columns)
            setColumns([...columns, registration]);
        else
            setColumns([registration]);
    }

    async function handleSave() {
        await api
            .post("Columns", columns, { headers })
            .then((response) => {
                if (response.status === 200) {
                    if (response.data) {
                        setColumns(null);
                    }
                }
                else {
                    console.log("Erro na requisição");
                }
            })
    }

    return (
        <Box sx={{ width: '100%', marginTop: "20px" }}>
            <Typography variant="h3" component="div" gutterBottom>
                Cadastro
            </Typography>
            <Divider />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className='form-create'
            >
                <TextField className='content-form' id="column" type={"text"} label="Coluna" variant="outlined" />
                <TextField className='content-form' id="row" type={"number"} label="Fileiras" variant="outlined" />
                <TextField className='content-form' id="chair" type={"number"} label="Cadeiras" variant="outlined" />
            </Box>
            <Box>
                <Button className='btn-form' variant="contained" onClick={handleCreateColumn}>Adicionar</Button>
                <Button className='btn-form' variant="contained" disabled={columns ? false : true} onClick={handleSave}>Salvar</Button>
            </Box>
            {columns &&
                <Seat columns={columns} />
            }
        </Box >
    );
}

export default Registration;