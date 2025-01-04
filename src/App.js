import React from 'react';
import TopSongs from './pages/TopSongs';
import "./style.css";
import NewSongs from './pages/NewSongs';
import AllSongs from './pages/AllSongs';
import Home from './components/Home';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import RoutedPart from './pages/RoutedPart';
import Menu from './components/Menu';
import Ending from './components/Ending';
function App() {
  return (
      <BrowserRouter>
      <Menu/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/innerImage/:name' element={<RoutedPart/>}/>
        </Routes>
        <Ending/>
      </BrowserRouter>
      
  );
}

export default App;
