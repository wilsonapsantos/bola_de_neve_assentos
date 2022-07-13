import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../../../Pages/Home';
import Registration from '../../../Pages/Registration';

const Content = props => (

    <main className='Content'>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Cadastro' element={<Registration />} />
        </Routes>
    </main>
)
export default Content;