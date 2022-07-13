import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Seat from '../../Components/Seat';

function Registration() {

    const [columns, setColumns] = useState([]);

    function handleCreateColumn() {
        let column = document.getElementById("column").value;
        let row = document.getElementById("row").value;
        let chair = document.getElementById("chair").value;

        var rows = [];
        var seatsRow = [];
        for (var i = 0; i < row; i++) {
            rows.push(i + 1);
        }

        for (var s = 0; s < chair; s++) {
            seatsRow.push(s + 1);
        }

        const registration = { column: column, row: rows, chair: seatsRow };
        setColumns([...columns, registration]);
    }

    function handleSave() {
        console.log(columns);
    }

    return (
        <Box sx={{ width: '100%', marginTop: "20px" }}>
            <Typography variant="h3" component="div" gutterBottom>
                Cadastro
            </Typography>
            <Divider />
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="column" type={"text"} label="Coluna" variant="outlined" />
                <TextField id="row" type={"number"} label="Fileiras" variant="outlined" />
                <TextField id="chair" type={"number"} label="Cadeiras" variant="outlined" />
                <Button style={{ width: "15ch" }} variant="contained" onClick={handleCreateColumn}>Adicionar</Button>
            </Box>
            <Box>
                <Button style={{ width: "15ch" }} variant="contained" onClick={handleSave}>Salvar</Button>
            </Box>
            <Seat columns={columns} />
        </Box >
    );
}

export default Registration;