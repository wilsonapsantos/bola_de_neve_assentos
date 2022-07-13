import React from 'react';
import Seat from "../../Components/Seat"
import columns from '../../Data/seat';

function Home() {

  return (
    <div className="App">
      <h2>Bola de Neve - Assentos</h2>
      <Seat columns={columns} />
    </div>
  );
}

export default Home;