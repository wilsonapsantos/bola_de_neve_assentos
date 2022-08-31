import React, { useEffect, useState } from 'react';
import Seat from "../../Components/Seat";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import api from "../../Services/api";

function Home() {

  const [columns, setColumns] = useState(null);

  //const token = process.env.REACT_APP_TOKEN;
  const headers = {
    //'ApiKey': token,
  };

  useEffect(() => {
    handleLayoutColumns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  async function handleLayoutColumns() {
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
    <Box className="App" sx={{ width: '100%', marginTop: "20px" }}>
      <Box style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <Typography variant="h6" component="div" gutterBottom style={{ alignSelf: "center", marginBottom: "initial" }}>
          Legenda:
        </Typography>
        <div style={{ display: "grid", justifyItems: "center", width: "100px" }}>
          <EventSeatIcon color='success' />
          Disponível
        </div>
        <div style={{ display: "grid", justifyItems: "center", width: "100px" }}>
          <EventSeatIcon color='disabled' />
          Oculpado
        </div>
      </Box>
      {columns &&
        <Seat columns={columns} changeSeat={handleChangeSeat} />
      }
    </Box>
  );
}

export default Home;