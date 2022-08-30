import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Seat from '../../Components/Seat';
import api from "../../Services/api";
import { useNavigate } from "react-router-dom";
import Stack from '@mui/material/Stack';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import CleaningServicesOutlinedIcon from '@mui/icons-material/CleaningServicesOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import "./style.css";

function Registration() {

    const [columns, setColumns] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    //const token = process.env.REACT_APP_TOKEN;
    const headers = {
        //'ApiKey': token,
    };

    function handleCreateColumn() {
        let columnName = document.getElementById("column").value;
        let row = document.getElementById("row").value;
        let chair = document.getElementById("chair").value;

        if (!columnName || !row || !chair) {
            setMessage("Os campos [Coluna, Fileiras, Cadeiras] são obrigatórios!");
            setOpen(true);
            return;
        }

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
            })

        navigate('/');
    }

    function handleClean() {
        setColumns(null);
        document.getElementById("column").value = "";
        document.getElementById("row").value = "";
        document.getElementById("chair").value = "";
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Box sx={{ width: '100%', marginTop: "20px" }}>
            <Typography variant="h4" component="div" gutterBottom>
                Cadastro Layout
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
            <Stack direction="row" spacing={0.8} style={{ justifyContent: "center", margin: "1rem 0 1rem" }}>
                <Button variant="outlined" onClick={handleCreateColumn} startIcon={<AddCircleOutlinedIcon />}>
                    Incluir
                </Button>
                <Button variant="contained" color="secondary" disabled={columns ? false : true} onClick={handleClean} startIcon={<CleaningServicesOutlinedIcon />}>
                    Limpar
                </Button>
                <Button variant="contained" color="success" disabled={columns ? false : true} onClick={handleSave} startIcon={<SaveOutlinedIcon />}>
                    Salvar
                </Button>
            </Stack>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}
                </MuiAlert>
            </Snackbar>
            {columns &&
                <Seat columns={columns} />
            }
        </Box >
    );
}

export default Registration;