import React, { useEffect, useState } from 'react';
import Seat from "../../Components/Seat";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import api from "../../Services/api";
import "./style.css";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function Home() {

  const [columns, setColumns] = useState(null);
  const [load, setLoad] = useState(false);

  //const token = process.env.REACT_APP_TOKEN;
  const headers = {
    //'ApiKey': token,
  };

  useEffect(() => {
    handleLayoutColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  async function handleLayoutColumns() {
    setLoad(true);
    await api
      .get("Columns", { headers })
      .then((response) => {
        if (response.status === 200) {
          if (response.data) {
            setColumns(response.data);
          }
        }
        else {
          console.log("Erro na requisição");
        }
      })
    setLoad(false);
  }

  async function handleChangeSeat(id) {
    let idString = id.toString();
    let split = idString.split('-');
    let filled;

    const newColumns = columns.map(column => {

      if (column.columnName === split[0].toString()) {
        column.rows.map(row => {
          if (row.rowNumber === parseInt(split[1])) {
            row.seats.map(seat => {
              if (seat.number === parseInt(split[2])) {
                filled = seat.filled === false ? true : false;
                seat.filled = filled;
              }
            })
          }
        })
      }
      return column;
    });
    setColumns(newColumns);

    const seatChange = { id: idString, filled: filled };

    await api
      .put("Column", seatChange, { headers })
      .then((response) => {
        if (response.status === 200) {
          return;
        }
      })
  }

  return (
    <Box className="App box-home">
      <Box className='box-legenda'>
        <Typography variant="h6" component="div" gutterBottom className='text-legenda'>
          Legenda:
        </Typography>
        <div className='seat-legenda'>
          <EventSeatIcon color='success' />
          Disponível
        </div>
        <div className='seat-legenda'>
          <EventSeatIcon color='disabled' />
          Oculpado
        </div>
      </Box>
      <Box style={{ marginBottom: "1rem" }}>
        {load ?
          <Box sx={{ display: 'flex', justifyContent: "center", margin: "1rem" }}>
            <CircularProgress style={{ color: "#121212" }} size={32} />
          </Box>
          :
          <Button variant="outlined" className='bn-button' startIcon={<AutorenewIcon />} onClick={() => handleLayoutColumns()}>
            Atualizar
          </Button>
        }
      </Box>
      {columns &&
        <Seat columns={columns} changeSeat={handleChangeSeat} />
      }
    </Box>
  );
}

export default Home;