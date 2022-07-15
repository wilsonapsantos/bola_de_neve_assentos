import React, { useEffect, useState } from 'react';
import Seat from "../../Components/Seat";
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

  return (
    <div className="App">
      <h2>Bola de Neve - Assentos</h2>
      {columns &&
        <Seat columns={columns} />
      }
    </div>
  );
}

export default Home;