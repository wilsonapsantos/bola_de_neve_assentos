import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Menu from './Components/Layout/Menu';
import Content from './Components/Layout/Content';

function App() {

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setAuth(true);
    }
  })

  return (
    <div className="App">
      <Router>
        <Menu auth={auth} setAuth={setAuth} />
        <Content setAuth={setAuth} />
      </Router>
    </div>
  );
}

export default App;